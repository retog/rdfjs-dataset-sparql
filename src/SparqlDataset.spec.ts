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

const sparqlEngineInstance = new SparqlEngine(store);


const sparqlDataset = new SparqlDataset({
    query: (q) => sparqlEngineInstance.query(q, undefined, undefined)
});

beforeAll(() => {
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
    return store.put(quads, undefined, undefined).then(() => {
        return sparqlDataset.populate();
    });
},60000);





test('size of dataset', () => {
    expect(sparqlDataset.size).toBe(20)
})

test('insert statement is being sent', () => {
    let query = "";
    const monitoredInstance = new SparqlDataset({
        query: (q) => {
            query = q;
            return Promise.resolve();
        }
    });
    monitoredInstance.add(quad(
        namedNode("http://ex.com/s"),
        namedNode("http://ex.com/p"),
        namedNode("http://ex.com/o")))
    expect(query).toMatch(/INSERT/);
})

test('should return true given internal link', () => {
    expect(sparqlDataset != null).toBe(true)
})
