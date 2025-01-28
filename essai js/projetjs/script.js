function checkPassword(characters) {
    // Toutes les constantes au début
    const MIN_LENGTH = 8;
    const ERROR_LENGTH = "Erreur: le mot de passe doit faire au moins 8 caractères";
    const VALID_PASSWORD = "Mot de passe valide !";
    const ERROR_PREFIX = "Il manque : ";
    const ERRORS = {
        UPPER: "une majuscule",
        LOWER: "une minuscule",
        NUMBER: "un chiffre",
        SPECIAL: "un caractère spécial"
    };

    // Les manques dans le mot de passe
    const missingElements = [];

    // Vérification de la longueur d'abord
    if (characters.length < MIN_LENGTH) {
        return ERROR_LENGTH;
    } else {
        // Status pour chaque type de caractère
        const status = {
            hasUpper: false,
            hasLower: false,
            hasNumber: false,
            hasSpecial: false
        };

        // Vérification de chaque caractère
        for (const char of characters) {
            if (char >= 'A' && char <= 'Z') {
                status.hasUpper = true;
            } else if (char >= 'a' && char <= 'z') {
                status.hasLower = true;
            } else if (char >= '0' && char <= '9') {
                status.hasNumber = true;
            } else {
                status.hasSpecial = true;
            }
        }

        // Vérification de tous les critères d'un coup
        if (!status.hasUpper) {
            missingElements.push(ERRORS.UPPER);
        }
        if (!status.hasLower) {
            missingElements.push(ERRORS.LOWER);
        }
        if (!status.hasNumber) {
            missingElements.push(ERRORS.NUMBER);
        }
        if (!status.hasSpecial) {
            missingElements.push(ERRORS.SPECIAL);
        }

        // Retour du résultat final
        if (missingElements.length > 0) {
            return ERROR_PREFIX + missingElements.join(", ");
        } else {
            return VALID_PASSWORD;
        }
    }
}

// Tests complets
const testPasswords = [
    "abc",          // Trop court
    "abcdefgh",     // Que des minuscules
    "ABCDEFGH",     // Que des majuscules
    "abcd1234",     // Pas de majuscule ni spécial
    "ABCD1234",     // Pas de minuscule ni spécial
    "Abcdefgh",     // Pas de chiffre ni spécial
    "abcd123!",     // Pas de majuscule
    "Abcd123!",     // Valide
];

console.log("=== Tests des mots de passe ===");
testPasswords.forEach(password => {
    const result = checkPassword(password);
    console.log(`"${password}" : ${result}`);
});


//CALLBACK
// fonction callback
function gateau (recette){
    console.log ( "preparation frd ingredients");
    console.log("debut de la préparation");
    recette()
}
function recette (){
    console.log("on fait le gateau ici!")

}
console.log(gateau(recette))
function productFiltered(productsfilter)

const sum = products.reducs(function(accumulateur.product){
    if 'isNan'
})