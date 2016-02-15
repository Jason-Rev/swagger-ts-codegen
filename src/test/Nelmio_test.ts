/**
 * Created by jasondent on 15/02/2016.
 */

import chai = require('chai');
const { expect } = chai;
import * as _ from "lodash";
import * as fs from "fs";
import * as Rx from "rx";
import { Nelmio } from "../Nelmio";

const { assert } = chai;

describe('Nelmio', ()=>{

    it('verifies the file reader works as expected', (done)=>{
        const filename = __dirname + '/../../src/test/data/api_questions.json';
        const expected = fs.readFileSync(filename, 'UTF-8');

        let errors = [];
        Nelmio.fileLineByLine(filename)
            .reduce((accum, line)=>{
                return accum === undefined ? line : accum + '\n' + line;
            })
            .subscribe(
                doc => {
                    assert.equal(expected, doc, 'make sure they match.');
                },
                error => errors.push(error),
                ()=>{
                    assert.deepEqual(errors, [], 'verify 0 errors');
                    done();
                }
            );
    });

    it('verifies Nelmio output can be processed into a set of models', (done)=>{
        const filename = __dirname + '/../../src/test/data/api.swagger';

        Nelmio.processFile(filename).then((models=>{
            assert.isObject(models, 'Make sure it is a Dictionary<string>');

            // Check a few keys.
            const keys = _.keys(models);
            assert.isTrue(_.includes(keys, 'Revinate.LustroFormServiceBundle.Form.QuestionType'));
            assert.isTrue(_.includes(keys, 'Revinate.LustroFormServiceBundle.Form.QuestionOptions.QuestionOptionType'));
            assert.isTrue(_.includes(keys, 'Revinate.LustroFormServiceBundle.Document.Question'));
            assert.isTrue(_.includes(keys, 'Revinate.LustroFormServiceBundle.Form.TranslationType'));
            done();
        }));
    });

});
