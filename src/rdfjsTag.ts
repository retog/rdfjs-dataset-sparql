import * as Factory from "@rdfjs/data-model";
import * as RDF from "rdf-js";
import DatasetCore from "@rdfjs/dataset/DatasetCore";


function renderValue(value: any) {
    if (value.termType) {
        if (value.termType === 'NamedNode') {
            return `<${value.value}>`
        }
        if (value.termType === 'Literal') {
            return `"${value.value}"`
        }
        if (value.termType === 'BlankNode') {
            return `_:${value.value}`
        }
        return value.termType 
    }
    return value
}

export function rdfjs(strings: TemplateStringsArray, ...values: any[]) {
    let result = ''
    for (let i = 0; i < strings.length; i++) { 
        result += strings[i]
        if (i < values.length) {
            result += renderValue(values[i])
        }
    }
    return result
}