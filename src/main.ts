import { Bondis } from "./bondis.ts";
import { Parada, Cabecera, Paradas, Terminal,  } from "./paradas.ts";
import { Personas } from "./personas.ts";


function main():number{
    do{
        console.log("Bondis POO");
        const bondi = new Bondis(); // bondi de una linea al azar
        
    }while(Math.random() < 0.5);
    return 0;
}main();