import { Paradas } from './paradas'

type Recorrido = Paradas[];

class Bondis {
    private nroPasajeros: number = 1;
    private static MAX_PASAJEROS = 70;
    public recorrido: Recorrido = [];
    public linea: number;
    public Ida_o_Vuelta: boolean = true; // true = vuelta | false = ida (el razonamiento lo explicó un chofer de la 57.)
    private currentStation;
    private nafta:number;
    private actualizarNafta: () => number = () => {
        return this.nafta-(this.nroPasajeros * 0.1);
    };
    private readonly RecorridosPosibles: { [linea: number]: Recorrido } = {
        60: [
            new Paradas("Barracas"),
            new Paradas("Monserrat"),
            new Paradas("Pacifico"),
            new Paradas("PlazaItalia"),
            new Paradas("Barrancas"),
            new Paradas("Olivos"),
            new Paradas("Escobar")
        ],
        29: [
            new Paradas("LaBoca"),
            new Paradas("SanTelmo"),
            new Paradas("PlazaItalia"),
            new Paradas("Belgrano"),
            new Paradas("Olivos")
        ],
        130: [
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
        const l = this.getRandomKey();
        this.nafta = 100;
        this.linea = !isNaN(l) ? l : 60;
        this.recorrido = this.RecorridosPosibles[this.linea];
        this.currentStation = this.recorrido[0];
    }

    private getRandomKey():number{
        const keys = Object.keys(this.RecorridosPosibles);
        return Number(keys[Math.floor(Math.random()*keys.length)-1]);
    }
    

}

const test = () => {
    const TestBondi = new Bondis();
    console.log(TestBondi.linea);
    console.log(TestBondi.recorrido)
}
test();