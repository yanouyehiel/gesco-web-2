export function dateParser(date) {
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    return newDate;
}

export function dateParserTime(date) {
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    return newDate;
}

export function longueurTexte(word) {
    // eslint-disable-next-line no-new-wrappers
    let sentence = new String(word)
    if (sentence.length > 15) {
        return sentence.substring(0, 16) + '...'
    } else {
        return sentence
    }
}

export function getTimeElapsed(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const timeElapsed = now - date;
  
    const millisecondsPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
  
    //const milliseconds = Math.floor(timeElapsed % millisecondsPerSecond);
    //const seconds = Math.floor((timeElapsed / millisecondsPerSecond) % secondsPerMinute);
    const minutes = Math.floor((timeElapsed / (millisecondsPerSecond * secondsPerMinute)) % minutesPerHour);
    const hours = Math.floor((timeElapsed / (millisecondsPerSecond * secondsPerMinute * minutesPerHour)) % hoursPerDay);
    const days = Math.floor(timeElapsed / (millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay));
  
    return `${days}jour ${hours}h ${minutes}min`
}

export function isMonthInCarbonDate(carbonDate, month) {
    const monthsInEnglish = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Convertir le mois en index (0-11)
    const monthIndex = monthsInEnglish.indexOf(month);
  
    // Récupérer le mois de la date Carbon
    const carbonMonth = carbonDate.month();
  
    // Comparer les mois
    return carbonMonth === monthIndex;
}

export function isTrimestre(sequence) {
    const sequences = ["Séquence 2", "Séquence 4", "Séquence 5", "Séquence 6"]
    return sequences.includes(sequence.intitule)
}

export function arrondirMoyenne(moyenne) {
    let valueArrondie = Math.round(moyenne * 100) / 100
    return valueArrondie
}

export function getRang(tableau, objetCible) {
    const indexObjetCible = tableau.findIndex(obj => obj.student_id === objetCible.student_id);
    return indexObjetCible + 1;
}