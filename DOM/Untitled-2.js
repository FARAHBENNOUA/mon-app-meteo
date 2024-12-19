// ID
// querySelector permet de cibler le premier élément qu'on souhaite, ici le premier élément ayant l'id "title";
const oneId = document.querySelector('#title');
// querySelectorAll permet de cibler tous les éléments ayant l'id "title";
const allIds = document.querySelectorAll('#title');
// getElementById permet de cibler l'élément ayant pour id "title".
const titleId = document.getElementById('title');

// CLASSE
const oneClass = document.querySelector('.secondTitle');
const allClasses = document.querySelectorAll('.secondTitle');
const secondTitleClass = document.getElementsByClassName('secondTitle');
const headingTitle = document.querySelector('.title_heading_article');
const parent = document.querySelector('.parent');
const machin = document.getElementById('barfoo')
const listeCourse = document.querySelector('#liste');


// MODIFICATIONS
headingTitle.textContent = " CECI EST MON NOUVEAU TITRE DE TEST, TOUT LE MONDE VOIT ????????!!!!!"
headingTitle.style.color = 'red';
headingTitle.style.backgroundColor = 'green';

// CREATION NOUVEAU ELEMENT
// const paragraph = document.createElement('p');
// paragraph.textContent = 'TEXTE DANS DIV PARENT';
// parent.appendChild(paragraph);

// console.log(paragraph.parentElement);
// console.log(parent.children)

// AJOUT DE CLASSE
// parent.classList.add('classTest')
// parent.classList.remove('classTest')
// parent.classList.toggle('parent')
// parent.classList.contains('parent')


// SUPPRESSION D'UN ELEMENT
// parent.removeChild(nouvelElement)

// #title = id="title"
console.log("one id =>", oneId);
console.log("one class =>", oneClass);
console.log("all classes =>", allClasses);
console.log("all ids =>", allIds);
console.log("all ids =>", allIds[1]);
console.log("Title ID =>", titleId)

// Une nodeListe est un array-like renvoyée par un querySelectorAll(), on peut uniquement utiliser le forEach, si on veut utiliser autre chose, on doit d'abord
// convertir la nodeListe en array avec Array.from(le nom de la const du querySelectorAll()).
const listOfNodes = Array.from(allClasses);
const array = listOfNodes.map(l => l.textContent);

console.log("nodeListe après transformation en array =>", array)
console.log("MACHIN ::: ", machin);
allClasses.forEach(c => {
    c.addEventListener('click', () => {
        c.classList.add('test');
    });
});


const produits = ['Pommes', 'Poires', 'Carottes', 'Peches', 'Abricots', 'Fraises'];

produits.forEach((produit, index) => {
    const li = document.createElement('li');
    li.textContent = produit;
    listeCourse.appendChild(li);
})
const liste = document.querySelector('#liste')
console.log("ICI :", listeCourse);


const draggable = document.querySelector('.draggable');
const dropzone = document.querySelector('.dropzone');

draggable.addEventListener('dragstart', (event) => {
    event.target.classList.add('dragging');
});

draggable.addEventListener('dragend', (event) => {
    event.target.classList.remove('dragging');
});

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Nécessaire pour permettre le drop
});

dropzone.addEventListener('drop', (event) => {
    // event.preventDefault();
    const dragging = document.querySelector('.dragging');
    event.target.appendChild(dragging);
});


const form = document.querySelector('#monFormulaire');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    console.log("Données:", { email, password });
});

// const button = document.querySelector('.btn');

// button.addEventListener('click', () => { console.log("Button cliqué") })


// const users = document.querySelector('#users');

fetch('https://fakestoreapi.com/products?limit=30')
    .then(response => response.json())
    .then(products => {
        const listOfProducts = document.querySelector('#products');
        products.forEach(product => {
            const displayProduct = document.createElement('div');
            displayProduct.classList.add('test')
            displayProduct.innerHTML = `<h4> Product : ${product.title}</h4>
            <p> ${product.description}</p>
            <img src=${product.image} alt=${product.title}>`;
            listOfProducts.appendChild(displayProduct);
        })
    })
    .catch(error => console.log(error))


// produits.forEach((data, index) => {
//     const user = document.createElement('li');
//     user.textContent = data;
//     users.appendChild(li);
// })

// click
// dblclick
// mouseover 
// mouseout
// keyup 
// keydown 
// submit 
// change 

// async function displayAllUsers() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         const users = await response.json();
//         const listOfUsers = document.querySelector('.users');

//         users.forEach(user => {
//             const liste = document.createElement('li');
//             liste.innerHTML = ` <h2>${user.name}</h2>`;
//             listOfUsers.appendChild(liste);
//         })
//     }
//     catch (err) {
//         console.log('Erreur : ', err)
//     }
// }

// async function displayAllUsers() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         const users = await response.json();
//         const listOfUsers = document.querySelector('.users');
//         const usersAdded = users.map(user =>
//             `<h4>${user.name}</h4>`
//         ).join('');
//         listOfUsers.innerHTML = usersAdded;
//     }
//     catch (err) {
//         console.log("Erreur : ", err);
//     }
// }

// displayAllUsers();


// const fruits = ['Pomme', "Poire"];

// .join() => "Pomme,Poire"
//     .join('') => "PommePoire"
//         .join('-') => "Pomme-Poire"




const appUsers = [{
    nom: "Jules", age: 45, email: "jules@gmail.com"
},
{
    nom: "Mathilde", age: 25, email: "math@gmail.com"
},
{
    nom: "Martin", age: 20, email: "themartin@gmail.com"
},
{
    nom: "Jasmine", age: 33, email: "jassbeauty@gmail.com"
},
{
    nom: "Noé", age: 40, email: "nono@gmail.com"
},
{
    nom: "Bethy", age: 65, email: "bethymamie@gmail.com"
},
{
    nom: "Sarah", age: 41, email: "sarah.pro@gmail.com"
},
{
    nom: "Kevin", age: 43, email: "kevstillyoung@gmail.com"
},]

const button = document.getElementById('addUser');
const listAppUsers = document.querySelector('.personsList')

let index = 0;
button.addEventListener('click', function () {
    if (index < appUsers.length) {
        const userOfApp = appUsers[index];
        const card = document.createElement('div');
        const compteur = docum

        card.innerHTML = `<h2>${userOfApp.nom}</h2>`;
        listAppUsers.appendChild(card);
        // index += 1;
        index++;
    } else {
        alert("Oops ! Aucun user à ajouter");
    }
})

const colorParagraph = document.querySelector('#colorParagraph');
colorParagraph.addEventListener('click', (event) => {
    event.target.style.color = 'red';
});

const hoverText = document.querySelector('#hoverText');
hoverText.addEventListener('mouseover', (event) => {
    event.target.style.color = 'blue';
    event.target.textContent = 'Texte modifié!';
});
hoverText.addEventListener('mouseout', (event) => {
    event.target.style.color = 'black';
    event.target.textContent = 'Survole moi!';
});

const inputText = document.querySelector('#inputText');
const outputText = document.querySelector('#outputText');
inputText.addEventListener('input', (event) => {
    outputText.textContent = event.target.value;
});

const textInput = document.querySelector('#textInput');
const charCounter = document.querySelector('#charCounter');
textInput.addEventListener('keyup', (event) => {
    const count = event.target.value.length;
    charCounter.textContent = `${count}/50 caractères`;
    
    if(count >= 50) {
        charCounter.style.color = 'red';
    } else {
        charCounter.style.color = 'black';
    }
});

class Counter {
    constructor() {
        this.count = 0;
        this.display = document.querySelector('#counterDisplay');
        this.button = document.querySelector('#counterBtn');
        this.button.addEventListener('click', () => this.increment());
    }

    increment() {
        this.count++;
        this.display.textContent = this.count;
        this.display.style.color = 'blue';
    }
}
const counter = new Counter();

class Game {
    constructor() {
        this.score = 0;
        this.scoreDisplay = document.querySelector('#score');
        this.gameZone = document.querySelector('#gameZone');
        
        this.gameZone.addEventListener('mouseover', () => this.increaseScore());
        this.gameZone.addEventListener('mouseout', (event) => {
            event.target.style.backgroundColor = 'red';
        });
    }

    increaseScore() {
        this.score++;
        this.scoreDisplay.textContent = this.score;
    }
}
const game = new Game();