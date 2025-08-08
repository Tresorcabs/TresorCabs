// update-readme.js
const fs = require('fs');
const path = require('path');

const filePath = 'README.md';

// Tableau de citations motivantes pour développeurs
const quotes = [
    "Le code est comme l'humour. Quand tu dois l'expliquer, c'est mauvais. – Cory House",
    "Tout d'abord, résolvez le problème. Ensuite, écrivez le code. – John Johnson",
    "Le code n'est jamais parfait, mais il peut toujours être amélioré. – Anonymous",
    "Un bon code est son propre meilleur documentation. – Steve McConnell",
    "La simplicité est l'âme de l'efficacité. – Austin Freeman",
    "Mesurer la productivité de la programmation par les lignes de code, c'est comme mesurer les progrès de la construction d'avions par le poids. – Bill Gates",
    "Programming is not about typing, it's about thinking. – Rich Hickey",
    "Clean code always looks like it was written by someone who cares. – Robert C. Martin",
    "Code is read much more often than it is written. – Guido van Rossum",
    "Experience is the name everyone gives to their mistakes. – Oscar Wilde"
];

// Faits amusants sur le développement
const funFacts = [
    "Le premier bug informatique était un vrai insecte coincé dans un ordinateur ! 🐛",
    "Le terme 'debugging' vient de Grace Hopper qui a trouvé un papillon de nuit dans un ordinateur en 1947 🦋",
    "Il y a plus de 700 langages de programmation dans le monde ! 🌍",
    "Le premier programme 'Hello World' date de 1972 👋",
    "90% du code mondial a été écrit ces 2 dernières années 📈",
    "Un développeur passe en moyenne 22% de son temps à déboguer 🔧",
    "Python tire son nom des Monty Python, pas du serpent ! 🐍",
    "Le Wi-Fi n'est pas l'abréviation de 'Wireless Fidelity' 📶"
];

// Emojis pour les activités de coding
const codingEmojis = ['💻', '⚡', '🚀', '🔥', '✨', '🎯', '🛠️', '🌟', '💡', '🎨', '🔬', '⚙️'];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const time = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    return { date, time };
}

function getRandomCoffeeCount() {
    return Math.floor(Math.random() * 8) + 1; // Entre 1 et 8 tasses
}

function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

try {
    if (!fs.existsSync(filePath)) {
        throw new Error('❌ README.md not found');
    }

    console.log('🔄 Mise à jour du README en cours...');
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const { date, time } = getCurrentDateTime();
    
    // 1. Mise à jour de la date
    if (content.includes('Dernière mise à jour automatique :')) {
        content = content.replace(
            /Dernière mise à jour automatique : .*/,
            `Dernière mise à jour automatique : ${date} à ${time}`
        );
    }

    // 2. Mise à jour de la citation du jour
    const randomQuote = getRandomItem(quotes);
    if (content.includes('### 💡 Citation du Jour')) {
        const quoteRegex = /(### 💡 Citation du Jour\n> )([^"]+– [^"]+)(?=\n)/;
        content = content.replace(quoteRegex, `$1${randomQuote}`);
    }

    // 3. Mise à jour du nombre de cafés
    const coffeeCount = getRandomCoffeeCount();
    if (content.includes('☕ Café bu aujourd\'hui :')) {
        content = content.replace(
            /☕ Café bu aujourd'hui : `[^`]+`/,
            `☕ Café bu aujourd'hui : \`${coffeeCount} tasses\``
        );
    }

    // 4. Mise à jour du fait aléatoire
    const randomFact = getRandomItem(funFacts);
    if (content.includes('### 🎲 Fait Aléatoire')) {
        // Cherche et remplace le premier élément de la liste des faits
        const factRegex = /(🍕 Nombre de pizzas consommées pendant le coding : ∞\n- ☕ Café bu aujourd'hui : `[^`]+`\n- 🎵 Actuellement en train d'écouter : )([^\n]+)/;
        const activities = ['Lo-fi Hip Hop', 'Synthwave', 'Jazz', 'Electronic', 'Classical', 'Ambient'];
        const randomActivity = getRandomItem(activities);
        
        content = content.replace(factRegex, `$1${randomActivity}`);
    }

    // 5. Ajouter un petit easter egg basé sur le jour de l'année
    const dayOfYear = getDayOfYear();
    const randomEmoji = getRandomItem(codingEmojis);
    
    if (content.includes('*N\'hésitez pas à me contacter')) {
        content = content.replace(
            /(\*N'hésitez pas à me contacter pour des collaborations ou juste pour discuter tech ! )🚀(\*)/,
            `$1${randomEmoji}$2`
        );
    }

    // 6. Mise à jour du numéro du jour de l'année (subtil)
    if (content.includes('Commits cette année')) {
        content = content.replace(
            /Commits cette année : `[^`]+`/,
            `Commits cette année : \`Jour ${dayOfYear}/365\``
        );
    }

    // 7. Écriture du fichier mis à jour
    fs.writeFileSync(filePath, content, 'utf-8');
    
    console.log(`✅ README.md mis à jour avec succès !`);
    console.log(`📅 Date : ${date}`);
    console.log(`⏰ Heure : ${time}`);
    console.log(`💡 Citation : ${randomQuote.substring(0, 50)}...`);
    console.log(`☕ Cafés : ${coffeeCount}`);
    console.log(`📊 Jour de l'année : ${dayOfYear}`);
    console.log(`🎯 Prêt pour le commit automatique !`);

} catch (error) {
    console.error('❌ Erreur lors de la mise à jour :', error.message);
    console.error(error.stack);
    process.exit(1);
}
