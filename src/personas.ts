export class Personas {
    private needPriority:boolean;
    constructor(
        {edad, someProblem}: { edad: number, someProblem: boolean }
    ) {
        this.needPriority = edad > 70 || someProblem;
    }
}