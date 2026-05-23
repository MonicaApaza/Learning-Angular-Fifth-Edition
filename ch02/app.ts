const title = "hello ts";
let isActive2 = true;
console.log(isActive2);
const categoriesDos = ["hola", "como", "estas"];
console.log(categoriesDos);
const adicional = ["el", "dia", 'de','hoy']
const newAr = [...categoriesDos,...adicional]
console.log(newAr); 

type Categories = 'Computing' | 'multimedia';
const categorie: Categories = "multimedia";

function getProduct():string{
    return "Computing";
}