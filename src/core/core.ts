import {Graph} from './data-structure/graph.class';
import {Vertex} from './data-structure/vertex.class.ts';
import {Edge, Node} from "reactflow";

export class Core {
    private readonly udGraph: Graph;

    constructor() {
        this.udGraph = new Graph();
    }

    test() {
        console.log(this.udGraph.bfsTraversalIterative("start"));
    }

    get nodes(): Node[] {
        const nodesList = this.udGraph.vertexesNames;
        return nodesList.map(node => (<Node>{
            id: node,
            position: {x: 0, y: 100},
            data: {
                label: node,
            }
        }))
    }

    get edges(): Edge[] {
        const nodesList = this.udGraph.vertexes;
        return nodesList
          .map(node =>
            node.edges.map(edge => ({
                id: `${node.name}-${edge}`, source: node.name, target: edge
            }))).flat()
    }

    public addVertix(name: string) {
        this.udGraph.addVertex(new Vertex(name));
    }

    public addEdge(from: string, to: string) {
        this.udGraph.addEdge(from, to);
        return this.edges;
    }
}