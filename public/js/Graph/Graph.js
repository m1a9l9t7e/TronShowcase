class Node {
    edges = [];

    constructor() {}

    add_edge(edge) {}

    remove_edge(edge) {}

    get degree() {
        return this.edges.length;
    }
}

class Edge {
    u;
    v;

    constructor(u, v) {
        this.u = u;
        this.v = v;
    }
}

class Graph {
 nodes_grid = [];
 nodes_list = [];

    constructor(bool_grid) {

    }

    translate_grid_to_graph(bool_grid) {
        // add nodes
        for (let i = 0; i < bool_grid.length; i++) {
            let nodes_row = [];
            for (let j = 0; j < bool_grid[i].length; j++) {
                let node = null;
                if (bool_grid[i][j]) {
                    node = new Node();
                }
                nodes_row.push(node);
            }
            this.nodes_grid.push(nodes_row);
        }
        // add edges
        for (let i = 0; i < bool_grid.length; i++) {
            for (let j = 0; j < bool_grid[i].length; j++) {
                if (this.nodes_grid[i][j] && this.nodes_grid[i+1][j]) {
                    let edge = new Edge(this.nodes_grid[i][j], this.nodes_grid[i+1][j]);
                    this.nodes_grid[i][j].add_edge(edge);
                    this.nodes_grid[i+1][j].add_edge(edge);
                }
                if (this.nodes_grid[i][j] && this.nodes_grid[i][j+1]) {
                    let edge = new Edge(this.nodes_grid[i][j], this.nodes_grid[i+1][j]);
                    this.nodes_grid[i][j].add_edge(edge);
                    this.nodes_grid[i][j+1].add_edge(edge);
                }
            }
        }
    }
}
