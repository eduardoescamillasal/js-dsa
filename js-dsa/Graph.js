class Graph {
  constructor() {
    this.adjancenyList = [];
  }

  addVertex(vertex) {
    if (!this.adjancenyList[vertex]) {
      this.adjancenyList[vertex] = [];
      return true;
    }
    return false;
  }

  addEdge(v1, v2) {
    if (this.adjancenyList[v1] && this.adjancenyList[v2]) {
      this.adjancenyList[v1].push(v2);
      this.adjancenyList[v2].push(v1);
      return true;
    }
    return false;
  }

  removeEdge(v1, v2) {
    if (this.adjancenyList[v1] && this.adjancenyList[v2]) {
      this.adjancenyList[v1] = this.adjancenyList[v1].filter((v) => v !== v2);
      this.adjancenyList[v2] = this.adjancenyList[v2].filter((v) => v !== v1);
      return true;
    }
    return false;
  }

  removeVertex(vertex) {
    if (!this.adjancenyList[vertex]) return undefined;
    while (this.adjancenyList[vertex].length) {
      let temp = this.adjancenyList[vertex].pop();
      this.removeEdge(vertex, temp);
    }
    delete this.adjancenyList[vertex];
    return this;
  }
}
