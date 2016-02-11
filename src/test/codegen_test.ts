/**
 * Created by jasondent on 10/02/2016.
 */

import chai = require('chai');
import { codegen } from "../codegen";
const { expect } = chai;
import { swagger_12 } from "../swagger_12";
import * as _ from "lodash";

type ApiDeclaration = swagger_12.ApiDeclaration;

describe('Codegen', ()=>{

    const spec = codegen.loadSwaggerSpecSync(__dirname + '/../../src/test/data/api_questions.json') as ApiDeclaration;

    it('verifies spec is not empty',()=>{
        expect(spec).to.not.be.empty;
    });

    it('verifies spec has swagger version 1.2',()=>{
        expect(spec.swaggerVersion).to.be.equal('1.2');
    });

    it('verifies spec models', ()=>{
        const models = codegen.processModels(spec);
        expect(models).to.not.be.empty;
        _.forEach(models, (model: codegen.Model)=>{
            expect(model.name).to.not.be.empty;
        });
        const modelQuestionType = models['Revinate.LustroFormServiceBundle.Form.QuestionType'];
        expect(modelQuestionType.properties['account'].type).to.be.equal('string');
        expect(modelQuestionType.properties['name_translations'].type).to.be.equal('Revinate_LustroFormServiceBundle_Form_TranslationType[]')
    });
});
