const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('postbuild: dist/index.html not found!');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf8');

// All React Router SPA routes that can be directly visited or scanned via QR
const routes = [
  { path: 'live', title: 'Watch Live | Tamil Nadu Pickleball Premier League (TNPPL) Season 2' },
  { path: 'faq', title: 'FAQ | Tamil Nadu Pickleball Premier League (TNPPL) Season 2' },
  { path: 'format', title: 'Tournament Format | Tamil Nadu Pickleball Premier League (TNPPL) Season 2' },
  { path: 'media-kit', title: 'Media Kit | Tamil Nadu Pickleball Premier League (TNPPL) Season 2' },
  { path: 'privacy', title: 'Privacy Policy | Tamil Nadu Pickleball Premier League (TNPPL) Season 2' },
  { path: 'rules', title: 'Rules & Regulations | Tamil Nadu Pickleball Premier League (TNPPL) Season 2' },
  { path: 'sponsorship', title: 'Sponsorship | Tamil Nadu Pickleball Premier League (TNPPL) Season 2' },
];

routes.forEach(({ path: route, title }) => {
  const dir = path.join(distPath, route);
  fs.mkdirSync(dir, { recursive: true });

  let routeHtml = html;
  if (title) {
    routeHtml = routeHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  }
  fs.writeFileSync(path.join(dir, 'index.html'), routeHtml, 'utf8');
  console.log(`Generated static route: dist/${route}/index.html`);
});

// Ensure .htaccess is verified in dist
const htaccessSrc = path.resolve(__dirname, '..', 'public', '.htaccess');
const htaccessDest = path.join(distPath, '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, htaccessDest);
  console.log('Verified .htaccess copied to dist/.htaccess');
}
