import { log } from 'console';
import { Paradas, Parada, Terminal, Cabecera } from './paradas'
import { Personas } from './personas';
import assert = require('assert');


type Recorrido = Paradas[];
export class Bondis {
    private Pasajeros: Personas[] = [];
    private static MAX_PASAJEROS = 70;
    public recorrido: Recorrido = [];
    public linea: number | null;
    public Ida_o_Vuelta: boolean = true; // true = vuelta | false = ida (el razonamiento lo explicó un chofer de la 57.)
    public nafta:number;
    private currentStation:Paradas;
    private actualizarNafta = (pasajeros = this.Pasajeros.length - 1 ) => {
        const n = this.nafta - (pasajeros * 0.1);
        return [n, n>0];
    };

    
    private readonly RecorridosPosibles: { [linea: string]: Recorrido } = {
        "1": [],
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
        this.Pasajeros = [];
    }

    private getRandomKey():number{
        const keys = Object.keys(this.RecorridosPosibles);
        console.log(keys);
        return Number(keys[Math.floor(Math.random()*keys.length)-1]);
    }

    private initializeRoute(route: Recorrido):Recorrido{

        if(!route) {
            console.log(`
                this->linea = ${this.linea},
                this->recorrido = ${this.recorrido}
            `);
            throw new Error("No se generó el recorrido.")
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
    public HacerRecorrido(
        gs:(s: boolean) => boolean = (s=true) => {
            const nst: number = s ? this.recorrido.indexOf(this.currentStation)-1 : this.recorrido.indexOf(this.currentStation)+1; 
            if(nst == 0 || nst == this.recorrido.length-1){
                return false
            }
            return true
        }
    ):any{
        const sentido = gs(this.Ida_o_Vuelta);
        //console.log(`Sentido--> ${sentido}`);
        if(!this.actualizarNafta()[1]) throw new Error("El bondi no llegará a la proxima parada.");
        console.log(this.recorrido.indexOf(this.currentStation));
        
        //if( this.recorrido.indexOf(this.currentStation) == 1 && sentido == true ) sentido = false;
        //if(this.recorrido.indexOf(this.currentStation) == this.recorrido.length - 1) sentido = true;
        this.delay(1);
        
        // true = vuelta | false = ida (el razonamiento lo explicó un chofer de la 57.)
        
        //throw new Error("Error en el recorrido, no se puede avanzar.")


/*        if(nextStation == 0 && sentido){
            

            if (this.actualizarNafta(this.Pasajeros.length + numberOfPeopoleInTheStation())[1]) {
                
                this.resetPeopole();
                return this.HacerRecorrido((sentido:boolean) => {
                    const nextStation = sentido ? this.recorrido.indexOf(this.currentStation)-1 : this.recorrido.indexOf(this.currentStation)+1;
                    return (this.recorrido[nextStation] instanceof Terminal || this.recorrido[nextStation] instanceof Cabecera);
                });
            }
            const How_much_peopole_I_want_to_down = () => {
                
            }
  */
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

