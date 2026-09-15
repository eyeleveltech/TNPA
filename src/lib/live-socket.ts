/**
 * Live socket accelerator.
 *
 * Rizzfitt run a Socket.IO server alongside the REST feed — almost certainly
 * what drives their own TV overlay. We do NOT have their event names or their
 * room/subscribe protocol, and guessing at payload shapes would be fragile.
 *
 * So this client deliberately ignores payloads entirely. It treats ANY event
 * on the socket as a single bit of information: "something changed, go and
 * re-read the REST feed now". That gives near-instant updates without needing
 * the contract, and it cannot show wrong data, because the REST feed is still
 * the only thing the UI ever renders.
 *
 * The safety property that makes this worth shipping days before a tournament:
 * if the socket never connects, never emits, or emits something unexpected,
 * behaviour is identical to polling alone. It only ever accelerates.
 *
 * Implemented directly on the Engine.IO v4 wire protocol rather than pulling in
 * socket.io-client: the handshake is about twenty lines, and it avoids adding a
 * dependency to a project that is mid-tournament.
 *
 * Engine.IO packet prefixes:  0 open · 1 close · 2 ping · 3 pong · 4 message
 * Socket.IO (after a 4):      0 connect · 1 disconnect · 2 event
 */

const SOCKET_PATH = "/rizzapi/socket.io/?EIO=4&transport=websocket";

/** Backoff between reconnect attempts, in ms. Caps out rather than growing. */
const RECONNECT_STEPS_MS = [1_000, 2_000, 5_000, 10_000, 20_000];

export interface LiveSocketHandlers {
  /** Fired for every event the server sends. Payload deliberately unused. */
  onActivity: (eventName: string) => void;
  /** Connection state, for the caller to adjust its polling cadence. */
  onConnectionChange?: (connected: boolean) => void;
}

/** Derive the websocket origin from the REST base URL. */
function socketUrl(apiBase: string): string {
  return apiBase.replace(/^http/i, "ws").replace(/\/+$/, "") + SOCKET_PATH;
}

/**
 * Connect, and keep reconnecting, until the returned function is called.
 * Never throws — a socket that cannot connect simply leaves polling to do the
 * work on its own.
 */
export function connectLiveSocket(
  apiBase: string,
  slug: string,
  courtIds: readonly number[],
  handlers: LiveSocketHandlers,
): () => void {
  if (typeof WebSocket === "undefined") return () => {};

  let socket: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let attempt = 0;
  let closed = false;

  const setConnected = (value: boolean) => {
    handlers.onConnectionChange?.(value);
  };

  const scheduleReconnect = () => {
    if (closed || reconnectTimer !== null) return;
    const delay = RECONNECT_STEPS_MS[Math.min(attempt, RECONNECT_STEPS_MS.length - 1)];
    attempt += 1;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      open();
    }, delay);
  };

  function open() {
    if (closed) return;

    let ws: WebSocket;
    try {
      ws = new WebSocket(socketUrl(apiBase));
    } catch {
      scheduleReconnect();
      return;
    }
    socket = ws;

    ws.onmessage = (event) => {
      const data = typeof event.data === "string" ? event.data : "";
      if (data.length === 0) return;

      // Engine.IO open → join the default Socket.IO namespace.
      if (data[0] === "0") {
        ws.send("40");
        return;
      }

      // Server heartbeat. Missing these gets us disconnected.
      if (data === "2") {
        ws.send("3");
        return;
      }

      // Namespace connected.
      if (data.startsWith("40")) {
        attempt = 0;
        setConnected(true);

        /* Speculative subscribe. Rizzfitt have not told us how to join a court,
           and Socket.IO silently ignores event names it does not handle, so
           these are harmless no-ops if wrong. Replace this block with the real
           protocol the moment they send it — see docs/live-scoreboard-api. */
        for (const courtId of courtIds) {
          const payload = { slug, courtId };
          ws.send("42" + JSON.stringify(["join", payload]));
          ws.send("42" + JSON.stringify(["subscribe", payload]));
        }
        return;
      }

      // An actual event. The name is logged for whoever wires up the real
      // contract later; the payload is intentionally never parsed or trusted.
      if (data.startsWith("42")) {
        let name = "unknown";
        try {
          const parsed: unknown = JSON.parse(data.slice(2));
          if (Array.isArray(parsed) && typeof parsed[0] === "string") name = parsed[0];
        } catch {
          /* Unparseable frame still means "something happened" — that is all
             we take from it. */
        }
        handlers.onActivity(name);
        return;
      }

      // Server asked us to go away. Respect it rather than hammering.
      if (data.startsWith("41") || data[0] === "1") {
        try {
          ws.close();
        } catch {
          /* already closing */
        }
      }
    };

    ws.onerror = () => {
      /* onclose always follows; reconnect is handled there. */
    };

    ws.onclose = () => {
      setConnected(false);
      if (socket === ws) socket = null;
      scheduleReconnect();
    };
  }

  open();

  return () => {
    closed = true;
    if (reconnectTimer !== null) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    setConnected(false);
    try {
      socket?.close();
    } catch {
      /* nothing useful to do on teardown */
    }
    socket = null;
  };
}
