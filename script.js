const unites = { 
    // Définition des unités pour toutes les grandeurs
    masse: ["mg", "cg", "dg", "g", "dag", "hg", "kg"],
    longueur: ["mm", "cm", "dm", "m", "dam", "hm", "km"],
    surface: ["mm²", "cm²", "dm²", "m²", "dam²", "a", "hm²", "ha", "km²"],
    volume: ["ml", "cl", "dl", "l", "dal", "hl", "kl", "mm³", "cm³", "dm³", "m³", "dam³", "hm³", "km³"],
    temps: ["ms", "cs", "ds", "s", "min", "h", "j"],
    temperature: ["°C", "m°C", "k°C", "K"],
    pression: ["mbar", "cbar", "dbar", "bar", "dabar", "hbar", "kbar", "hPa", "Pa", "kPa"],
    tension: ["mV", "cV", "dV", "V", "daV", "hV", "kV"],
    intensite: ["mA", "cA", "dA", "A", "daA", "hA", "kA"],
    resistance: ["mohm", "cohm", "dohm", "ohm", "daohm", "hohm", "kohm"],
    puissance: ["mW", "cW", "dW", "W", "daW", "hW", "kW"],
    energie: ["mJ", "cJ", "dJ", "J", "daJ", "hJ", "kJ"],
    force: ["mN", "cN", "dN", "N", "daN", "hN", "kN"],
    charge: ["mC", "cC", "dC", "C", "daC", "hC", "kC"],
    euro: ["cts", "€", "k€"]
};

const facteursConversion = { 
    // Définition des facteurs de conversion pour toutes les grandeurs
    "mg": 0.001, "cg": 0.01, "dg": 0.1, "g": 1, "dag": 10, "hg": 100, "kg": 1000,
    "mm": 0.001, "cm": 0.01, "dm": 0.1, "m": 1, "dam": 10, "hm": 100, "km": 1000,
    "mm²": 0.000001, "cm²": 0.0001, "dm²": 0.01, "m²": 1, "dam²": 100, "a": 100, "hm²": 10000, "ha": 10000, "km²": 1000000,
    "ml": 0.001, "cl": 0.01, "dl": 0.1, "l": 1, "dal": 10, "hl": 100, "kl": 1000,
    "mm³": 0.000001, "cm³": 0.001, "dm³": 1, "m³": 1000, "dam³": 1000000, "hm³": 1000000000, "km³": 1000000000000,
    "ms": 0.001, "cs": 0.01, "ds": 0.1, "s": 1, "min": 60, "h": 3600, "j": 86400,
    "°C": 1, "m°C": 1, "k°C": 1, "K": 1,
    "mbar": 0.001, "cbar": 0.01, "dbar": 0.1, "bar": 1, "dabar": 10, "hbar": 100, "kbar": 1000, "hPa": 1, "Pa": 0.00001, "kPa": 0.001,
    "mV": 0.001, "cV": 0.01, "dV": 0.1, "V": 1, "daV": 10, "hV": 100, "kV": 1000,
    "mA": 0.001, "cA": 0.01, "dA": 0.1, "A": 1, "daA": 10, "hA": 100, "kA": 1000,
    "mohm": 0.001, "cohm": 0.01, "dohm": 0.1, "ohm": 1, "daohm": 10, "hohm": 100, "kohm": 1000,
    "mW": 0.001, "cW": 0.01, "dW": 0.1, "W": 1, "daW": 10, "hW": 100, "kW": 1000,
    "mJ": 0.001, "cJ": 0.01, "dJ": 0.1, "J": 1, "daJ": 10, "hJ": 100, "kJ": 1000,
    "mN": 0.001, "cN": 0.01, "dN": 0.1, "N": 1, "daN": 10, "hN": 100, "kN": 1000,
    "mC": 0.001, "cC": 0.01, "dC": 0.1, "C": 1, "daC": 10, "hC": 100, "kC": 1000,
    "cts": 0.01, "€": 1, "k€": 1000
};

function convertir(valeur, uniteDepart, uniteArrivee) {
    if (facteursConversion[uniteDepart] !== undefined && facteursConversion[uniteArrivee] !== undefined) {
        return (valeur * facteursConversion[uniteDepart] / facteursConversion[uniteArrivee]).toFixed(3);
    }
    return null;
}

function genererExercice() {
    const exerciceContainer = document.getElementById("exercice");
    exerciceContainer.innerHTML = "";
    
    const nombreConversions = parseInt(document.getElementById("nombreConversions").value);
    const niveau = document.getElementById("difficulte").value;
    const grandeursSelectionnees = Array.from(document.querySelectorAll(".grandeur:checked")).map(cb => cb.value);
    
    if (grandeursSelectionnees.length === 0) {
        alert("Veuillez sélectionner au moins une grandeur.");
        return;
    }
    
    for (let i = 0; i < nombreConversions; i++) {
        const grandeur = grandeursSelectionnees[Math.floor(Math.random() * grandeursSelectionnees.length)];
        const uniteDepart = unites[grandeur][Math.floor(Math.random() * unites[grandeur].length)];
        let uniteArrivee;
        do {
            uniteArrivee = unites[grandeur][Math.floor(Math.random() * unites[grandeur].length)];
        } while (uniteDepart === uniteArrivee);
        
        const valeur = niveau === "debutant" ? Math.floor(Math.random() * 10) + 1 :
                       niveau === "apprenti" ? Math.floor(Math.random() * 100) + 1 :
                       niveau === "confirmé" ? (Math.random() * 1000).toFixed(2) :
                       (Math.random() * 10000).toFixed(3);
        
        const question = document.createElement("div");
        question.classList.add("question");
        question.dataset.valeur = valeur;
        question.dataset.uniteDepart = uniteDepart;
        question.dataset.uniteArrivee = uniteArrivee;
        question.innerHTML = `${valeur} ${uniteDepart} = <input type='text' class='reponse'> ${uniteArrivee}`;
        exerciceContainer.appendChild(question);
    }
    
    document.getElementById("actions").style.display = "block";
}

document.getElementById("genererExercice").addEventListener("click", genererExercice);

document.getElementById("corrigerExercice").addEventListener("click", function() {
    let questions = document.querySelectorAll(".question");
    questions.forEach(question => {
        let valeur = parseFloat(question.dataset.valeur);
        let uniteDepart = question.dataset.uniteDepart;
        let uniteArrivee = question.dataset.uniteArrivee;
        let input = question.querySelector("input");
        let reponseUtilisateur = parseFloat(input.value.replace(",", "."));
        let reponseCorrecte = parseFloat(convertir(valeur, uniteDepart, uniteArrivee));
        
        if (!isNaN(reponseCorrecte) && !isNaN(reponseUtilisateur) && reponseUtilisateur.toFixed(3) === reponseCorrecte.toFixed(3)) {
            input.style.backgroundColor = "lightgreen";
        } else {
            input.style.backgroundColor = "lightcoral";
        }
    });
});

// Fonction d'impression
document.getElementById("imprimerExercice").addEventListener("click", function() {
    window.print();
});

// Fonction de génération PDF avec jsPDF
document.getElementById("genererPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let questions = document.querySelectorAll(".question");
    let y = 10;
    
    questions.forEach((question, index) => {
        doc.text(`${index + 1}. ${question.dataset.valeur} ${question.dataset.uniteDepart} = ${question.querySelector("input").value} ${question.dataset.uniteArrivee}`, 10, y);
        y += 10;
    });
    
    doc.save("exercice.pdf");
});
