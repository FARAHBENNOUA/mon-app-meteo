// Exercice 1

const ages = [12, 15, 23, 25, 18, 8, 30, 16, 22, 17, 29, 19, 20];

//1 Utilisez la méthode adaptées pour trouver les majeurs (+ de 18 ans)
const majeurs = ages.filter (ages => ages >17);
console.log ("les majeurs sont:", majeurs);

// 2. Calculer l'âge moyen
let somme = 0;
let nombreAges = 0;
for (let i = 0; i < ages.length; i++) {
    if (ages[i] >= 8 && ages[i] <= 30) {
        somme += ages[i];
        nombreAges++;
    }
}let moyenneAge = somme / nombreAges;
console.log("La moyenne des âges  sont:", moyenneAge);
console.log("La somme des âges est:", somme);


// Exercice 2

const word = ["Angular", "Typescript", "Python", "Go", "Rust", "Php", "Java", "C#", "C++", "ReactJS", "MySQL"];


// 1. Trouver les mots de plus de 4 lettres
const motsLongs = word.filter(mot => mot.length > 4);
console.log("Mots de plus de 4 lettres:", motsLongs);

// 2. Compter le nombre total de lettres
const totalLettres = word.reduce((acc, mot) => acc + mot.length, 0);
console.log("Nombre total de lettres:", totalLettres);

// 3. Afficher chaque mot
word.forEach(mot => console.log(mot));

// 4. Afficher les mots commençant par la lettre P
const motsP = word.filter(mot => mot.startsWith('P'));
console.log("Mots commençant par P:", motsP);

// Exercice 3
const articles = [
    { name: "Pull", price: 35, stock: 90 },
    { name: "Chaussettes", price: 5, stock: 950 },
    { name: "Bonnet", price: 25, stock: 100 },
    { name: "Sweat", price: 45, stock: 50 },
    { name: "Jean", price: 95, stock: 20 },
    { name: "Jogging", price: 48.5, stock: 230 },
    { name: "T-shirt", price: 15, stock: 150 },
    { name: "Cardigan", price: 75, stock: 9 },
    { name: "Veste", price: 235, stock: 800 }
];

// Pour l'exercice 3, affichons quelques informations utiles sur les articles :

// 1. Articles dont le stock est faible (< 50)
const stockFaible = articles.filter(article => article.stock < 50);
console.log("Articles en stock faible:", stockFaible);

// 2. Articles les plus chers (prix > 50€)
const articlesCher = articles.filter(article => article.price > 30);
console.log("Articles chers:", articlesCher);

// 3. Valeur totale du stock
const valeurTotale = articles.reduce((acc, article) => 
    acc + (article.price * article.stock), 0);
console.log("Valeur totale du stock:", valeurTotale.toFixed(2), "€");

// 4. Prix moyen des articles
const prixMoyen = articles.reduce((acc, article) => 
    acc + article.price, 0) / articles.length;
console.log("Prix moyen des articles:", prixMoyen.toFixed(2), "€");


// Exercice 4
const weather = [
    { day: "Lundi", temperature: 20, rain: true },
    { day: "Mardi", temperature: 25, rain: true },
    { day: "Mercredi", temperature: 35, rain: false },
    { day: "Jeudi", temperature: 30, rain: true },
    { day: "Vendredi", temperature: 20, rain: false },
    { day: "Samedi", temperature: 30, rain: false },
    { day: "Dimanche", temperature: 10, rain: true }
];





// /5 Afficher le type de jours (semaine ou weekend)

for (let i = 0; i < weather.length; i++) {
    if (weather[i].day === "Samedi" || weather[i].day === "Dimanche") {
        console.log(weather[i].day + ": weekend");
    } else {
        console.log(weather[i].day + ": semaine");
    }
    
}


// Exercice 5

const marks = [
    { name: "Alice", notes: [12, 17, 9, 14, 19, 6, 10, 11] },
    { name: "Alain", notes: [2, 17, 19, 4, 19, 16, 0, 1] },
    { name: "Oussama", notes: [1, 17, 19, 14, 19, 16, 1, 11] },
    { name: "Sabrina", notes: [11, 7, 9, 4, 19, 16, 0, 1] },
    { name: "Nawelle", notes: [3, 1, 9, 4, 13, 6, 10, 15] },
    { name: "Julien", notes: [1, 7, 9, 4, 13, 9, 16, 20, 17] },
    { name: "Brice", notes: [18, 19, 14, 13, 9, 16, 20, 17] }
];

// 1. Calculer la moyenne de chaque élève
for (let i = 0; i < marks.length; i++) {
    let somme = 0;
    for (let j = 0; j < marks[i].notes.length; j++) {
        somme += marks[i].notes[j];
    }
    let moyenne = somme / marks[i].notes.length;
    console.log(`Moyenne de ${marks[i].name}: ${moyenne.toFixed(2)}`);
}

// 2. Trouver les élèves ayant au moins une note > 15

for (let i = 0; i < marks.length; i++) {
    if (marks[i].notes.some(note => note > 15)) {
        console.log(marks[i].name);
    }
}


// 3. Afficher les noms des élèves
console.log("\nListe des élèves:");
for (let i = 0; i < marks.length; i++) {
    console.log(marks[i].name);
}

// 4. Trouver les élèves qui ont la moyenne (≥ 10)
console.log("\nÉlèves ayant la moyenne (≥ 10):");
for (let i = 0; i < marks.length; i++) {
    let somme = 0;
    for (let j = 0; j < marks[i].notes.length; j++) {
        somme += marks[i].notes[j];
    }
    
    let moyenne = somme / marks[i].notes.length;
    if (moyenne >= 10) {
        console.log(`${marks[i].name}: ${moyenne.toFixed(2)}`);
    }
}
// Exercice 6 
const movies = [
    { name: "Lord Of The Ring", duration: 178, categories: ["Fantasy", "Adventure"] },
    { name: "The Shawshank Redemption", duration: 142, categories: ["Drama"] },
    { name: "The Dark Knight", duration: 152, categories: ["Action", "Crime", "Drama"] },
    { name: "Inception", duration: 148, categories: ["Action", "Sci-Fi", "Thriller"] },
    { name: "Forrest Gump", duration: 142, categories: ["Drama", "Romance"] },
    { name: "The Lord of the Rings: The Fellowship of the Ring", duration: 178, categories: ["Fantasy", "Adventure"] },
    { name: "Interstellar", duration: 169, categories: ["Adventure", "Drama", "Sci-Fi"] },
    { name: "The Matrix", duration: 136, categories: ["Action", "Sci-Fi"] },
    { name: "Pulp Fiction", duration: 154, categories: ["Crime", "Drama"] },
    { name: "The Lion King", duration: 88, categories: ["Animation", "Adventure", "Drama"] },
    { name: "Gladiator", duration: 155, categories: ["Action", "Drama", "Adventure"] }
];



// Films de plus de 2h (120 minutes)
console.log("\Films de plus de 2h:");
for (let i = 0; i < movies.length; i++) {
    if (movies[i].duration > 120) {
        console.log(movies[i].name + " (" + movies[i].duration + " min)");
    }
}

// Films de drama
console.log("Films de drama:");
for (let i = 0; i < movies.length; i++) {
    if (movies[i].categories.includes("Drama")) {
        console.log(movies[i].name);
    }
}

// Exercice 7
// Choisir un mot de plus de 4 lettres et compter les voyelles dans ce mot.
// Choisir un mot et compter ses voyelles
let mot = "Javascript";
let voyelles = 0;
for (let i = 0; i < mot.length; i++) {
    if ("aeiouAEIOU".includes(mot[i])) {
        voyelles++;
    }
}
console.log("Nombre de voyelles dans", mot, ":", voyelles);

// Exercice 8
// Table de multiplication de 6
console.log("Table de multiplication de 6:");
for (let i = 1; i <= 10; i++) {
    console.log(`6 x ${i} = ${6 * i}`);
}

// Exercice 9
// Compte à rebours de 30 à 0
const foods = [
    { name: "tomatoes", family: "fruits" },
    { name: "potatoes", family: "vegetables" },
    { name: "carrots", family: "vegetables" },
    { name: "apple", family: "fruits" },
    { name: "strawberries", family: "fruits" },
    { name: "bananas", family: "fruits" }
];
const foodFamilly = foods.map(food => `${food.name} appartient à la famille ${food.family}`);

console.log ("Food familly", foodFamilly);
const students = [
    { id: 1, name: "Alice", marks: [15, 17, 13], age: 20, city: "Paris" },
    { id: 2, name: "Bob", marks: [12, 14, 16], age: 22, city: "Lyon" },
    { id: 3, name: "Charlie", marks: [18, 16, 19], age: 19, city: "Paris" },
    { id: 4, name: "David", marks: [10, 13, 15], age: 21, city: "Lyon" },
    { id: 4, name: "Lucie", marks: [14, 11, 5], age: 31, city: "Paris" },
];


//Pour les étudiants de Paris et leur moyenne :

const parisStudents = students
  .filter(student => student.city === "Paris")
  .map(student => {
    const average = student.marks.reduce((acc, mark) => acc + mark, 0) / student.marks.length;
    return { ...student, average: Math.round(average * 10) / 10 };
  })

console.log("Étudiants de Paris avec leurs moyennes:", parisStudents);


//Pour ajouter une note aux étudiants ayant plus de 15 de moyenne :

const studentsWithNewMark = students.map(student => {
  const average = student.marks.reduce((acc, mark) => acc + mark, 0) / student.marks.length;
  
  if (average >=15) {
    return {
      ...student,
      marks: [...student.marks, 20] // Bonus de 20 pour les bons élèves
    };
  }
  return student;
});

console.log("Étudiants avec nouvelles notes si moyenne > 15:", studentsWithNewMark);


// Pour catégoriser les étudiants :

const categorizedStudents = students.map(student => {
  const average = student.marks.reduce((acc, mark) => acc + mark, 0) / student.marks.length;
  
  let category, comment;
  
  if (average >= 16) {
    category = "Excellent";
    comment = "Félicitations";
  } else if (average >= 13) {
    category = "Bien";
    comment = "Travail correct";
  } else if (average >= 10) {
    category = "Assez bien";
    comment = "Peut mieux faire";
  } else {
    category = "Insuffisant";
    comment = "Vous devez travailler d'avantage";
  }
  
  return {
    ...student,
    average: Math.round(average * 10) / 10,
    category,
    comment
  };
});

console.log("Étudiants catégorisés:", categorizedStudents);
//Pour les fruits uniquement avec template literal :

const fruitsList = foods
  .filter(food => food.family === "fruits")
  .map(fruit => `${fruit.name} est un fruit`);

console.log("Liste des fruits:", fruitsList);
// Résultat: ["tomatoes est un fruit", "apple est un fruit", "strawberries est un fruit", "bananas est un fruit"]
