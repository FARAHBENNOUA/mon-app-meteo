// ID
const oneId = document.querySelector('#title');
const allIds = document.querySelectorAll('#title');
const titleId = document.getElementById('title');

// CLASSE
const oneClass = document.querySelector('.secondTitle');
const allClasses = document.querySelectorAll('.secondTitle');
const secondTitleClass = document.getElementsByClassName('secondTitle');
const headingTitle = document.querySelector('.title_heading_article');
const machin = document.getElementById('barfoo');
const listeCourse = document.querySelector('#liste');

// Tableau de produits comme dans l'exemple
const produits = ['Pommes', 'Poires', 'Carottes', 'Peches', 'Abricots', 'Fraises'];

// Exercice 1 : Changer la couleur au clic
oneId.addEventListener('click', () => {
    oneId.style.color = 'red';
});

// Exercice 2 : Changement au survol
allClasses.forEach(c => {
    c.addEventListener('mouseover', () => {
        c.style.color = 'blue';
        c.textContent = 'Texte modifié!';
    });
    c.addEventListener('mouseout', () => {
        c.style.color = 'black';
        c.textContent = 'Survolez-moi';
    });
});

// Exercice 3 : Texte en temps réel
produits.forEach((produit) => {
    const li = document.createElement('li');
    li.textContent = produit;
    listeCourse.appendChild(li);
});

machin.addEventListener('input', () => {
    listeCourse.textContent = machin.value;
});

// Exercice 4 : Compteur de caractères
const textInput = document.querySelector('#textInput');
const charCounter = document.querySelector('#charCounter');
const charList = document.querySelector('#charList');

textInput.addEventListener('keyup', () => {
    const count = textInput.value.length;
    charCounter.textContent = `${count}/50 caractères`;
    
    // Transformation en array comme dans l'exemple
    const listOfChars = Array.from(textInput.value);
    charList.textContent = listOfChars.join(', ');
});

// Exercice 5 : Class Counter
class Counter {
    constructor() {
        this.count = 0;
        this.display = document.querySelector('#counterDisplay');
        this.button = document.querySelector('#counterBtn');
        this.button.addEventListener('click', () => {
            this.count++;
            this.display.textContent = this.count;
        });
    }
}
const counter = new Counter();

// Exercice 6 : Zone de jeu
const draggable = document.querySelector('.draggable');
const dropzone = document.querySelector('.dropzone');
let score = document.querySelector('#score');
let count = 0;

draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
});

draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
});

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    count++;
    score.textContent = count;
    const dragging = document.querySelector('.dragging');
    e.target.appendChild(dragging);
});

// Transformation NodeList en array comme dans l'exemple
const listOfNodes = Array.from(allClasses);
const array = listOfNodes.map(l => l.textContent);

console.log("nodeListe après transformation en array =>", array);
console.log("MACHIN ::: ", machin);