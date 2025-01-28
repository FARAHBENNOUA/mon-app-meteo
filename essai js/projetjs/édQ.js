const phone ={
    marque : "Samsung",
    modele : "S24",
    prix : 2000
}

if ( phone.prix > 2000) {
    console.log(`Le ${phone.marque} ${phone.modele} coûte ${phone.prix}€, c'est un téléphone haut de gamme`)

} else {
    console.log(`Le prix est inférieur à 2000`)
    
}

const user = [
    {name: "John",
     âge:"34"

    }
    ,
    {name:"bernard",
        age :67
    }

]
const monPremierArray =[30,9,878,3,56]
console.log("log de mon premier Array=>" , monPremierArray)
console.log("longueur de mon array=>")
    
console.log(monPremierArray.length)

const notes =[3,16,20,1,0,3,10,17,19]
console.log("Notes avant push :", notes  )
notes.push(15)
console.log("Notes", notes)

notes.unshift(1) 
console.log("Notes apres unshift ", notes)

console.log("Premier valeur du tabeau",notes[0])
console.log("Derniere case de l'Array", notes[notes.length-1])

const monSecondArray =[30 ,"jean", 33, 1000, 200, 200, 27739990, 2988]

function lastValue0Array(array){
    return array[array.length-1]

}
console.log("test function :", lastValue0Array(monSecondArray))
monSecondArray.push("foo")

console.log("Second test :",lastValue0Array(monSecondArray) )

let str = "bonjour farah";
console.log("String", str[str.length-1])

const assofaciens = [{
    prenom: "yacine",
    promo: "DWWM5"
},
{
    prenom: "Maimouna",
    promo: "DWWM5"
}
]
console.log("Mon second assofaciens est :" + assofaciens[1].prenom)

console.log("Dernier prenom")

function calculerRemise(montant, ClientFidele) {
        let tauxremise= 0;

    if (montant > 200) {
        tauxderemise =  0.15;

    }else if (montant >100) {
        tauxderemise =0.10;

    }
    if (ClientFidele) {
        tauxderemise +=0.05;
    }

const remise = montant * tauxderemise;
const montantFinal =montant-remise;
    
return{
    montantInitial: montant,
    tauxremise: tauxremise* 100 +'%',

    montantremise: remise,
    montantFinal: montantFinal.toFixed(2)


}
}
 console.log(calculerRemise(250,true))

 const nbr = [1,2,3,4,5]
 console.log(nbr.length)

 let x = 0 ;
 console.log(x);
 console.log("------")
 x = x +1;

 console.log(x);
 console.log("----")
 //WHILE
 let count =0;
  while(count<=20){
    console.log(count)
    count++

  }
  let SuperMario ={
    score  0,
    life  100,
  }
  let nombreEnnemis = 0;
  console






