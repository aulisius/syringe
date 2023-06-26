class Graph {
  injectFn = null;
  realized = null;
  /** @type {Record<string, Graph>}  */
  edges = {};
  constructor(injectFn) {
    this.injectFn = injectFn;
  }
  /**
   *
   * @param {string} name
   * @param {Graph} node
   */
  link(name, node) {
    this.edges[name] = node;
  }
  /**
   *
   * @returns {any}
   */
  realize() {
    if (this.realized !== null) {
      return this.realized;
    }
    this.realized = this.injectFn(
      Object.fromEntries(
        Object.entries(this.edges).map(([name, node]) => [name, node.realize()])
      )
    );
    return this.realized;
  }
}

export class SyringeSolution {
  __registry = null;
  constructor() {
    this.__registry = new Graph("start");
  }
  fill(injections) {
    const edges = [];
    for (const injection of injections) {
      let node = new Graph(injection.injectFn);
      this.__registry.link(injection.name, node);
      for (const use of injection.uses) {
        edges.push([injection.name, use.name]);
      }
    }
    for (const [from, to] of edges) {
      this.__registry.edges[from].link(to, this.__registry.edges[to]);
    }
  }
  inject(name) {
    if (this.__registry.edges[name] === undefined) {
      return null;
    }
    return this.__registry.edges[name].realize();
  }
}

export const Syringe = new SyringeSolution();
