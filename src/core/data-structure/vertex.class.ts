export class Vertex {
    private _name: string;
    private _edges: string[];

    constructor(nodeId: string) {
        this._name = nodeId;
        this._edges = [];
    }


    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }


    public get edges(): string[] {
        return this._edges;
    }
    public set edges(v: string[]) {
        this._edges = v;
    }
}
