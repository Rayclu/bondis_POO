import { Paradas, Parada, Terminal, Cabecera } from './paradas'
import { Personas } from './personas';
import assert = require('assert');


type Recorrido = Paradas[];
export class Bondis {
    private Pasajeros: Personas[] = [];
    private static MAX_PASAJEROS = 70;
    public recorrido: Recorrido = [];
    public linea: number | null;
    public Ida_o_Vuelta: boolean = false; // true = vuelta | false = ida (el razonamiento lo explicó un chofer de la 57.)
    public nafta:number;
    private currentStation:Paradas;
    private actualizarNafta: (pasajeros:number) => number = ( pasajeros = this.Pasajeros.length - 1 ) => {
        const cantidadNafta = this.nafta - (pasajeros * 0.1);
        return cantidadNafta;
    };
    
    private readonly RecorridosPosibles: { [linea: string]: Recorrido } = {
        "60": [
            new Paradas("Barracas"),
            new Paradas("Monserrat"),
            new Paradas("Pacifico"),
            new Paradas("PlazaItalia"),
            new Paradas("Barrancas"),
            new Paradas("Olivos"),
            new Paradas("Escobar"),
        ],
        "29": [
            new Paradas("LaBoca"),
            new Paradas("SanTelmo"),
            new Paradas("PlazaItalia"),
            new Paradas("Belgrano"),
            new Paradas("Olivos"),
        ],
        "130": [
            new Paradas("LaBoca"),
            new Paradas("PuertoMadero"),
            new Paradas("Retiro"),
            new Paradas("Recoleta"),
            new Paradas("Palermo"),
            new Paradas("Nuñez"),
            new Paradas("VicenteLopez"),
            new Paradas("Munro")
        ]
    };
    constructor() {
        const k = this.getRandomKey();
        this.nafta = 100;
        this.linea = !isNaN(k) ? k : 1;
        this.recorrido = this.initializeRoute(
            this.RecorridosPosibles[this.linea]
        );
        this.currentStation = this.recorrido[0];
        this.chargeFuel();
    }

    async delay(ms: number) {
        await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log());
    }

    private resetPeopole() {
        this.currentStation.queue.concat(this.Pasajeros)
        this.Pasajeros = [];
    }

    private getRandomKey():number{
        const keys = Object.keys(this.RecorridosPosibles);
        console.log(keys);
        return Number(keys[Math.floor(Math.random()*keys.length)-1] ?? "60");
    }

    private initializeRoute(route: Recorrido):Recorrido{
        try{
            if(!route) {
                console.log(`
                    this->linea = ${this.linea},
                    this->recorrido = ${this.recorrido}
                `);
                throw new Error("No se generó el recorrido.")
            } 
        }catch{
            route = [];
        }
        route.push(new Cabecera());
        route.unshift(new Terminal());
    //----------------------------------------------------------------INICIAR LAS PARADAS
        route.forEach(parada => {
            if(!(parada instanceof Terminal || parada instanceof Cabecera)){
            for(let i = 0; i <= Math.floor(Math.random()*15); i++){
                    parada.inLinePerson(
                        new Personas({
                            edad: Math.floor(Math.random() * 100),
                            someProblem: Math.random() < 0.5
                        })
                    )
                }
            }
        })
        return route;
    }

    //public HacerRecorrido(sentido:boolean = true):any{
    public HacerRecorrido(): Function | null {
        console.log(this.Ida_o_Vuelta);
        if (this.nafta <= 0) {
            console.log("No more nafta.");
            return null;
        }
        const gns:() => Parada = () => {
            const idx = this.recorrido.indexOf(this.currentStation);
            const nst: number = this.Ida_o_Vuelta ? idx-1 : idx+1; 
            if(this.recorrido[nst] instanceof Cabecera){
                this.Ida_o_Vuelta = false;
            } else if(this.recorrido[nst] instanceof Terminal){
                this.Ida_o_Vuelta = true;
            } else if(idx < 0 || idx > this.recorrido.length){
                throw new Error()
            }
            return this.recorrido[nst]
        }
        //const idx = this.recorrido.indexOf(this.currentStation);
        this.currentStation = gns();
        console.log(this.currentStation)
        // Cambiar sentido si estoy en extremos
        if (this.currentStation instanceof Cabecera) {
            this.Ida_o_Vuelta = false;
        } else if (this.currentStation instanceof Terminal) {
            this.Ida_o_Vuelta = true;
        }
        const idx = this.recorrido.indexOf(this.currentStation);
        const nst: number = this.Ida_o_Vuelta ? idx - 1 : idx + 1;
        if (nst < 0 || nst >= this.recorrido.length) {
            console.log("Índice fuera de rango, fin del recorrido.");
            return null;
        }

        const consumo = this.actualizarNafta(this.Pasajeros.length);
        if (consumo <= 0) {
            console.log("El bondi no llegará a la próxima parada. Fin del recorrido.");
            return null;
        }

        console.log(`Parada actual -> ${this.currentStation.name}`);
        console.log(`Sentido -> ${this.Ida_o_Vuelta ? "Vuelta" : "Ida"}`);
        console.log("------------------");

        this.currentStation = this.recorrido[nst];
        this.nafta = consumo;

        return this.HacerRecorrido();
    }

    addStation(newSt: Parada, index: number){
        const currRoute: Paradas[] = this.recorrido;
        if ( currRoute[index] instanceof Terminal ){
            currRoute[index] = newSt;
            currRoute.push(new Terminal());


        }else if( currRoute[index] instanceof Cabecera ){
            currRoute[index] = newSt;
            currRoute.unshift(new Cabecera())

        }else{
            const reSortStations = ( part1: Paradas[], part2: Paradas[], newElem: Parada) => {
                return part1.concat(newElem).concat(part2);
            };
            reSortStations(this.recorrido.slice(0, index), this.recorrido.slice(index+1), newSt)

        }
    }

    public chargeFuel() {
        this.nafta = 100;
    }
}

