import assert = require("assert");
import { Bondis } from "../bondis";

const testBondiInfo = () => {
    const TestBondi = new Bondis();
    console.log(assert.strict.equal(TestBondi.nafta, 100, "El bondi se cargó sin nafta."));
    console.log(assert.strict.notEqual(TestBondi.linea, 1, "El bondi no se inició incorrectamente"));       
    console.log(assert.ok(TestBondi, "El bondi se creó correctamente"));
};testBondiInfo();

const TestRecorridoBondi = (bondi = new Bondis()) => {
    
    bondi.HacerRecorrido();
};TestRecorridoBondi();