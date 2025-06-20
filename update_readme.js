// update-readme.js
const fs = require('fs');

const filePath = 'README.md';
const now = new Date();
const dateStr = now.toLocaleDateString('fr-FR');

let content = fs.readFileSync(filePath, 'utf-8');
const newContent = content.replace(/Dernière mise à jour : .*/, `Dernière mise à jour : ${dateStr}`);

fs.writeFileSync(filePath, newContent);
