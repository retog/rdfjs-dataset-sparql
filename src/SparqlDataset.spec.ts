import { RdfStore } from 'quadstore'
import SparqlEngine from 'quadstore-sparql'
import SparqlDataset from './SparqlDataset'
import memdown from 'memdown'
import {
    quad,
    namedNode,
    literal,
    defaultGraph
} from '@rdfjs/data-model'

const db = memdown();
const store = new RdfStore(db);

beforeAll(async () => {
    const quads = [];
    for (let i = 0; i < 20; i++) {
        quads.push(
            quad(
                namedNode("http://ex.com/s" + i),
                namedNode("http://ex.com/p" + i),
                namedNode("http://ex.com/o" + i)/*,
        namedNode("http://ex.com/g")*/
            )
        );
    }
    await store.put(quads, undefined, undefined);
    console.log("Put succeded.");
});

const sparqlEngineInstance = new SparqlEngine(store);

const sparqlDataset = new SparqlDataset(sparqlEngineInstance);

test('should return false given external link', () => {
    expect(sparqlDataset == null).toBe(false)
})

test('should return true given internal link', () => {
    expect(sparqlDataset != null).toBe(true)
})
