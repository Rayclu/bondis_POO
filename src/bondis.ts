import { Paradas } from './paradas.ts'

type Recorrido = [];

class Bondis {
    // @ts-ignore
    private recorrido: Recorrido = [];
    //public  linea:number;
    private  readonly  RecorridosPosibles: {number: paradas[]} = {
        29: []
    };
    constructor(linea:number) {
        // const {RecorridosPosibles} = this;
        // @ts-ignore
        this.recorrido = this.RecorridosPosibles[linea];
    }
}