import { Personas } from './personas';
export class Paradas implements Terminal, Header{
    private queue:any[] = [];
    public name: string;

    constructor(name:string){
        this.name = name;
    }
    //inLinePerson(person: { edad: number; someProblem: boolean }): void{
    
    inLinePerson(person: Personas ): void{
        // console.log(person);
        // console.log(this.queue)
        this.queue.push(person)
    }
}

// function TestingMain():void{

//     const  parada = new Paradas("Testeo");
//     //console.log(parada);
//     parada.inLinePerson( new Personas( { edad: 79, someProblem: false } ) );
//     parada.inLinePerson( new Personas( { edad: 30, someProblem: false } ) );
//     parada.inLinePerson( new Personas( { edad: 18, someProblem: true  } ) );
//     // parada.inLinePerson( {edad: 79, someProblem: false } );
//     // parada.inLinePerson( {edad: 30, someProblem: false } );
//     // parada.inLinePerson( {edad: 18, someProblem: true } );

// }TestingMain()
