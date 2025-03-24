const unites = {
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
    "mg": 0.001, "cg": 0.01, "dg": 0.1, "g": 1, "dag": 10, "hg": 100, "kg": 1000,
    "mm": 0.001, "cm": 0.01, "dm": 0.1, "m": 1, "dam": 10, "hm": 100, "km": 1000,
    "mm²": 0.000001, "cm²": 0.0001, "dm²": 0.01, "m²": 1, "dam²": 100, "a": 100, "hm²": 10000, "ha": 10000, "km²": 1000000,
    "ml": 0.001, "cl": 0.01, "dl": 0.1, "l": 1, "dal": 10, "hl": 100, "kl": 1000,
    "mm³": 0.000001, "cm³": 0.001, "dm³": 1, "m³": 1000, "dam³": 1000000, "hm³": 1000000000, "km³": 1000000000000
};

function convertir(valeur, uniteDepart, uniteArrivee) {
    if (facteursConversion[uniteDepart] && facteursConversion[uniteArrivee]) {
        return (valeur * facteursConversion[uniteDepart] / facteursConversion[uniteArrivee]).toFixed(3);
    }
    return null;
}

document.getElementById("genererExercice").addEventListener("click", function() {
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
        question.innerHTML = `${valeur} ${uniteDepart} = <input type='text' class='reponse'> ${uniteArrivee}`;
        exerciceContainer.appendChild(question);
    }
    
    document.getElementById("actions").style.display = "block";
});

// Fonction de correction
document.getElementById("corrigerExercice").addEventListener("click", function() {
    document.querySelectorAll(".question").forEach(question => {
        const texteQuestion = question.innerText.split(" ");
        const valeur = parseFloat(texteQuestion[0]);
        const uniteDepart = texteQuestion[1];
        const uniteArrivee = texteQuestion[texteQuestion.length - 1];
        const input = question.querySelector(".reponse");
        const reponse = parseFloat(input.value);
        const bonneReponse = convertir(valeur, uniteDepart, uniteArrivee);
        
        if (reponse === parseFloat(bonneReponse)) {
            input.style.backgroundColor = "lightgreen";
        } else {
            input.style.backgroundColor = "red";
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
    
    doc.text("Exercice de conversion d'unités", 10, 10);
    
    let y = 20;
    document.querySelectorAll(".question").forEach(question => {
        doc.text(question.innerText, 10, y);
        y += 10;
    });
    
    doc.save("exercice_conversions.pdf");
});

// Minuteur
let timer;
document.getElementById("activerMinuteur").addEventListener("click", function() {
    const minutes = parseInt(document.getElementById("minuteurMinutes").value) || 0;
    const secondes = parseInt(document.getElementById("minuteurSecondes").value) || 0;
    let totalTime = minutes * 60 + secondes;
    
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timer);
            alert("Temps écoulé !");
        } else {
            totalTime--;
            document.getElementById("compteurTemps").innerText = `${Math.floor(totalTime / 60)}:${totalTime % 60}`;
        }
    }, 1000);
});
