import * as Factory from "@rdf-esm/data-model";
import Dataset from "@rdfjs/dataset";
import * as RDF from "rdf-js";

interface SparqlEnpoint {
    query(s: string): Promise<any>;
}


export default class SparqlDataset implements RDF.DatasetCore {
    local = Dataset.dataset([]);
    
    constructor(public endpoint: SparqlEnpoint) {
    }

    get size() {
        return 0;
    }

    getQuery() {
        return "SELECT ?s ?p ?o ?g WHERE { GRAPH ?g { ?s ?p ?o } }"
    }

    populate() {
        const query = this.getQuery();
        this.endpoint.query(query);
    }

    add(quad: RDF.Quad): this {
        //TODO implement
        return this;
    }

    delete(quad: RDF.Quad): this {
        //TODO implement
        return this;
    }

    match(subject?: RDF.Term | null, predicate?: RDF.Term | null, 
        object?: RDF.Term | null, graph?: RDF.Term | null): this {
        //TODO implement
        return this;
    }

    has(quad: RDF.Quad): boolean {
        //TODO implement
        return false;
    }

    [Symbol.iterator](): Iterator<RDF.Quad> {
        return this.local[Symbol.iterator]();
    }
}