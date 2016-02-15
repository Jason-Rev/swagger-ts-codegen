/**
 * Created by jasondent on 13/02/2016.
 */

import * as fs from "fs";
import * as _ from "lodash";
import * as Rx from "rx";
import { codegen } from "./codegen";
import {Promise} from "es6-promise/dist/es6-promise";

export module Nelmio {

    export function fileLineByLine(filename: string) : Rx.Observable<string> {
        const source = new Rx.Subject<string>();
        const fh = fs.createReadStream(filename, 'utf8');
        let buffer = '';

        const emitLines = (lines: string[])=>{
            lines.forEach( (line) => {source.onNext(line)} );
        };

        fh.on('data', function(data) {
            buffer += data;
            // Break it up into lines
            let lines = buffer.split('\n');
            // Save the rest for later in case we do not have a whole line
            buffer = lines.pop();
            emitLines(lines);
        });
        fh.on('end', function() {
            // Break it up into lines
            let lines = buffer.split('\n');
            emitLines(lines);
            buffer = '';
            source.onCompleted();
        });

        return source;
    }


    interface Models {[index:string]:codegen.Model}

    /**
     * This function processes the models from the output of the Nelmio swagger:dump command.
     *
     * The file contains lines of JSON and plain text.
     *
     * output from Nelmio command:  php app/console api:swagger:dump > api.swagger
     * @param filename
     */
    export function processFile(filename:string) {
        return new Promise((resolve, reject)=>{
            let allModels: Models  = {};
            const regJson = /^{.*}$/;

            Nelmio.fileLineByLine(filename)
                .where(line=>regJson.test(line))
                .map(line=>JSON.parse(line))
                .map(json=>codegen.processModels(json))
                .reduce((allModels, models)=>{
                    if (allModels === undefined) {
                        return models;
                    }
                    return _.assign({}, allModels, models);
                })
                .subscribe(
                    models => resolve(models),
                    error => { reject(error); }
                );
        });
    }
}

