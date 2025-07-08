import { Personas } from './personas';

class Paradas{
    public queue:any[] = [];
    public name: string;
    private TermOrHeader: boolean; // true = header | false = terminal
    constructor(name:string, TermOrHeader: boolean = false) {
        this.name = name;
        this.TermOrHeader = TermOrHeader;
    }
    inLinePerson(person: Personas ): void{
        this.queue.push(person)
        
    }
    outlinePerson(){
        return this.queue.pop();
    }
}
class Terminal extends Paradas{
    constructor(name:string, TermOrHeader:boolean = true){
        super(name, true);
    }
}

class Cabecera extends Paradas{
    constructor(name:string, TermOrHeader:boolean = true) {
        super(name, true)
    }
}

class Parada extends Paradas {
    constructor(name:string, TermOrHeader:boolean ) {
        super(name, TermOrHeader)
    }
}

export { Paradas ,Parada, Terminal, Cabecera }