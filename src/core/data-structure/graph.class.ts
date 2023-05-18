import {Vertex} from './vertex.class.ts'


export class Graph {
    private vertexesList: Vertex[] = [];

    constructor() {
        this.vertexesList = [];
    }

    public get vertexesNames() {
        return this.vertexesList.map(n => n.name)
    }

    public get vertexes() {
        return this.vertexesList
    }

    /**
     * A method to add a new vertex to the graph.
     * @param newNode Name of the vertex to be added to the graph
     */
    addVertex(newNode: Vertex): boolean {
        // We will keep the implementation simple and focus on the concepts

        // If the vertex already exists, do nothing.
        if (this.vertexesList.find(e => e.name === newNode.name)) {
            return true;
        }

        this.vertexesList.push(newNode);
        return true;
    }

    /**
     * Adds an edge to the graph.
     * @param fromNode
     * @param toNode
     */
    addEdge(fromNode: string, toNode: string): boolean {
        // Add an node2 to node1 edges.
        const sourceNode = this.vertexesList.find(e => e.name == fromNode);
        if (!sourceNode) return false;

        sourceNode.edges.push(toNode)
        return true;

    }

    /**
     * Removes an edge between two vertices.
     * @param from
     * @param to
     */
    removeEdge(from: string, to: string): boolean {
        // We will keep the implementation simple and focus on the concepts
        // Do not worry about handling invalid indexes or any other error cases.
        // We will assume all vertices are valid and already exist.

        // Add an node2 to node1 edges.
        const sourceNode = this.vertexesList.find(e => e.name == from);
        if (!sourceNode) return false;

        sourceNode.edges.push(to)
        return true;
    }

    getParentVertexes(childVertex: string) {
        const parentNodeIds: string[] = []
        this.vertexesList.forEach(node => {
            if (node.edges.includes(childVertex)) parentNodeIds.push(node.name);
        })

        return parentNodeIds;
    }

    bfsTraversalIterative(startVertexName: string): string[] {
        let result: string[] = [];
        let visited: any = {};
        let queue: string[] = [];
        queue.push(startVertexName);

        while (queue.length > 0) {
            let name = queue.shift();
            let currentVertex = this.vertexesList.find(e => e.name === name);
            if (!currentVertex) continue;
            const allParents = this.getParentVertexes(currentVertex.name)
            const isParentVisitPending = allParents.some(i => !visited[i])
            if (isParentVisitPending) {

            } else if (!visited[currentVertex.name]) {
                // Mark the current vertex as visited
                visited[currentVertex.name] = true;

                // Add the current vertex to result list
                result.push(currentVertex.name);

                // Visit the neighbors of the current vertex one by on, if they are not already visited
                currentVertex.edges.forEach(neighbor => {
                    if (!visited[neighbor])
                        queue.push(neighbor);
                });

            }
        }
        return result;
    }
}