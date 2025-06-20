// update-readme.js
const fs = require('fs');

const filePath = 'README.md';

try {
  if (!fs.existsSync(filePath)) {
    throw new Error('README.md not found');
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR');

  let content = fs.readFileSync(filePath, 'utf-8');

  if (!content.includes('Dernière mise à jour :')) {
    // Si la ligne n'existe pas, on l'ajoute en bas du fichier
    content += `\n\n> Dernière mise à jour : ${dateStr}\n`;
  } else {
    content = content.replace(/Dernière mise à jour : .*/, `Dernière mise à jour : ${dateStr}`);
  }

  fs.writeFileSync(filePath, content);
  console.log("README.md updated successfully.");

} catch (err) {
  console.error("❌ Erreur :", err.message);
  process.exit(1); // renvoie une erreur propre
}
