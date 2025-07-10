import { json } from 'node:stream/consumers';
import { Paradas, Parada, Terminal, Cabecera } from './paradas'
import { Personas } from './personas';

type Recorrido = Paradas[];
/*
interface Header {
    name: string;
}
interface TerminalInterface {
    name:string;
}
*/
export class Bondis {
    private Pasajeros: Personas[] = [];
    private static MAX_PASAJEROS = 70;
    public recorrido: Recorrido = [];
    public linea: number;
    public Ida_o_Vuelta: boolean = true; // true = vuelta | false = ida (el razonamiento lo explicó un chofer de la 57.)
    private currentStation;
    private nafta:number;
    private actualizarNafta: () => [number, boolean] = () => {
        var n = this.nafta - (this.Pasajeros.length -1 * 0.1);
        return [n, n>0];
    };

    
    private readonly RecorridosPosibles: { [linea: number]: Recorrido } = {
        60: [
            //new Paradas("BarracasTerminal", true),
            new Paradas("Barracas"),
            new Paradas("Monserrat"),
            new Paradas("Pacifico"),
            new Paradas("PlazaItalia"),
            new Paradas("Barrancas"),
            new Paradas("Olivos"),
            new Paradas("Escobar"),
            //new Paradas("EscobarTerminal", true)
        ],
        29: [
            //new Paradas("LaBocaTerminal", true),
            new Paradas("LaBoca"),
            new Paradas("SanTelmo"),
            new Paradas("PlazaItalia"),
            new Paradas("Belgrano"),
            new Paradas("Olivos"),
            //new Paradas("OlivosTerminal", true)
        ],
        130: [
           // new Paradas("LaBocaTerminal", true),
            new Paradas("LaBoca"),
            new Paradas("PuertoMadero"),
            new Paradas("Retiro"),
            new Paradas("Recoleta"),
            new Paradas("Palermo"),
            new Paradas("Nuñez"),
            new Paradas("VicenteLopez"),
            new Paradas("Munro")
            //            new Paradas("MunroTerminal", true)
        ]
    };

    

    constructor() {
        const k = this.getRandomKey();
        this.nafta = 100;
        this.linea = !isNaN(k) ? k : 60;
        /*this.recorrido = this.initializeRoute(
            this.RecorridosPosibles[this.linea],
            { name: "Cabecera" },
            { name: "Terminal" }
        );*/
        this.recorrido = this.initializeRoute(
            this.RecorridosPosibles[this.linea]
        );
        this.currentStation = this.recorrido[0];
        this.chargeFuel();
    }
    private getRandomKey():number{
        const keys = Object.keys(this.RecorridosPosibles);
        return Number(keys[Math.floor(Math.random()*keys.length)-1]);
    }
    private initializeRoute(route: Recorrido):Recorrido{
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
    public HacerRecorrido(sentido:boolean | null = null){
        if(!this.actualizarNafta()[1]) throw new Error("El bondi no llegará a la proxima parada.");

        if(this.recorrido.indexOf(this.currentStation) == 0 && sentido == true) sentido = false;
        if(this.recorrido.indexOf(this.currentStation) == this.recorrido.length - 1) sentido = true;
 
        const nextStation = sentido ? this.recorrido.indexOf(this.currentStation)-1 : this.recorrido.indexOf(this.currentStation)+1;
        // true = vuelta | false = ida (el razonamiento lo explicó un chofer de la 57.)
        if((nextStation == 1 && sentido) || (nextStation == this.recorrido.length -1 && !sentido)){
        //   this. 
        }

        
        
        this.HacerRecorrido(sentido);
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
            const reSortStations = ( part1: Paradas[], part2: Paradas[], newElem: Parada)=> {
                return part1.concat(newElem).concat(part2);
            };
            reSortStations(this.recorrido.slice(0, index), this.recorrido.slice(index+1), newSt)

        }

    }

    public chargeFuel() {
        this.nafta = 100;         
    }
}

const test = () => {
    const TestBondi = new Bondis();
    console.log(TestBondi.linea);
    console.log(TestBondi.recorrido);
}
test();
