const fs = require('fs');
const package = JSON.parse(fs.readFileSync('./package.json'));

const ejectPackage = {};

const copyAttrs = ['name', 'version', 'main', 'license'];

copyAttrs.forEach((attr) => ejectPackage[attr] = package[attr]);

ejectPackage.scripts = {
  start: 'cross-env NODE_ENV=production && node -r dotenv/config index.js',
};

fs.writeFileSync(process.argv[2], JSON.stringify(ejectPackage, null, 2));
