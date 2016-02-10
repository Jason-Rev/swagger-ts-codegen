/**
 * Created by jasondent on 10/02/2016.
 */

/// <reference path="./defs.d.ts"/>

import * as fs from "fs";

export module codegen {

    const SwaggerTypesToTypescriptTypes = {
        integer: "number",
        number: "number",
        string: "string",
        boolean: "boolean",
        choice: "string"
    };


    export function processModels(swagger) {

    }

    export function loadSwaggerSpecSync(filename) {
        return JSON.parse(fs.readFileSync(filename, 'UTF-8'));
    }
}
