// @ts-ignore
import { personas } from './src/personas.ts';
export class Paradas {
    // @ts-ignore
    private queue:any[] = [];

    inLinePerson(person: { edad: number; someProblem: boolean }): void{
        console.log(person);
        console.log(this.queue)
        this.queue.push(person)
    }
}

function main():void{
    // @ts-ignore
    const  parada = new Paradas();
    console.log(parada);
    // @ts-ignore
    parada.inLinePerson( {edad: 79, someProblem: false } );
    parada.inLinePerson( {edad: 30, someProblem: false } );
    parada.inLinePerson( {edad: 18, someProblem: true } );

}main()
