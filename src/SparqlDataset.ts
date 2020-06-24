import * as Factory from "@rdfjs/data-model";
import * as RDF from "rdf-js";
import DatasetCore from "@rdfjs/dataset/DatasetCore";
import { rdfjs } from './rdfjsTag'

interface SparqlEnpoint {
    query(s: string): Promise<any>;
}


export default class SparqlDataset implements RDF.DatasetCore {
    local:RDF.DatasetCore = new DatasetCore<RDF.Quad>([]);
    
    constructor(public endpoint: SparqlEnpoint) {
    }

    get size() {
        return this.local.size;
    }

    getQuery() {
        return "SELECT ?s ?p ?o ?g WHERE { GRAPH ?g { ?s ?p ?o } }"
    }

    populate() {
        const query = this.getQuery();
        return this.endpoint.query(query).then((results) => 
        {
            for (const r of results) {
                const s: RDF.Quad_Subject = r['?s' as any];
                const p = r['?p' as any];
                const o = r['?o' as any];
                const g = r['?g' as any];
                const quad = Factory.quad(s,p,o,g);
                this.local.add(quad); 
            }
            return results;

        });
    }

    add(quad: RDF.Quad): this {
        this.local.add(quad);
        this.endpoint.query(rdfjs`INSERT { GRAPH ${quad.graph} { ${quad.subject} ${quad.predicate} ${quad.object} }} `.toString());
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