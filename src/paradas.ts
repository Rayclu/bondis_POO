// @ts-ignore
import { personas } from './src/personas.ts';
class Paradas {
    // @ts-ignore
    private queue: Array<personas>;

    inLinePerson(person: { 79: undefined; false: any }){
        this.queue.push(person)
    }
}

function main():void{
    // @ts-ignore
    const  parada = new Paradas();
    console.log(parada);
    // @ts-ignore
    parada.inLinePerson( { false, 79} )
}main()
