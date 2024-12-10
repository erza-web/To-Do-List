const tache = document.getElementById("tache"); 
const ajout = document.getElementById("ajout"); 
const liste = document.getElementById("liste"); 
const compteur_tache = document.getElementById("compteur_tache"); 
const boutonToutSupprimer = document.getElementById("boutonToutSupprimer"); 
// Gestion des tâches 
let taches = JSON.parse(localStorage.getItem("taches")) || []; 
// Mise à jour
function mise_a_jour_de_interface() { 
    liste.innerHTML = ""; 
    let tachesFinis = 0; 
    taches.forEach((tach, index) => { 
        const element = document.createElement("li"); 
        element.className = `element ${tach.terminee ? "terminee" : ""}`; 
        element.innerHTML = ` <span>${tach.texte}</span> 
        <button class="supprimer" onclick="supprimerTache(${index}); 
        event.stopPropagation()">Supprimer</button> 
        <button class="terminer" onclick="marqueeTerminee(${index}); 
        event.stopPropagation()">Terminer</button> `; 
        liste.appendChild(element); 
        if (tach.terminee) tachesFinis++;
    }); 
        compteur_tache.innerText = `Nombre Total de tâches : ${taches.length} / Nombre de tâches Terminées : ${tachesFinis}`; 
        localStorage.setItem("taches", JSON.stringify(taches)); 
    } 
// Ajouter une tâche 
ajout.addEventListener("click", () => { 
    const texte = tache.value.trim(); 
    if (texte) { 
        taches.push({ texte, terminee: false }); 
        tache.value = ""; mise_a_jour_de_interface(); 
    } 
}); 
// Mettre l'état à terminée 
function marqueeTerminee(index) { 
    taches[index].terminee = !taches[index].terminee; 
    mise_a_jour_de_interface(); 
} 
// Supprimer une tâche 
function supprimerTache(index) { 
    taches.splice(index, 1); 
    mise_a_jour_de_interface(); 
} 
// Supprimer toutes les tâches 
boutonToutSupprimer.addEventListener("click", () => { 
    taches = []; 
    mise_a_jour_de_interface(); 
}); 
// Initialisation 
mise_a_jour_de_interface();