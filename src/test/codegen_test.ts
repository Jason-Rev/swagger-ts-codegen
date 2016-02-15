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

    const spec = codegen.loadSwaggerSpecSync(__dirname + '/../../src/test/data/api_questions.json');

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
        const account = _.head(_.filter(modelQuestionType.properties, (prop: codegen.ModelProperty)=>(prop.name == 'account')));
        expect(account.type).to.be.equal('string');

        const name_translations = _.head(_.filter(modelQuestionType.properties, (prop: codegen.ModelProperty)=>(prop.name == 'name_translations')));
        expect(name_translations.type).to.be.equal('Revinate_LustroFormServiceBundle_Form_TranslationType[]')
    });


    it('verify can render models', ()=>{
        const models = codegen.processModels(spec);
        _.forEach(models, (model: codegen.Model)=>{
            const text = codegen.renderModel(model);
            expect(text).to.contain(model.name);
            // console.log(text);
        });
    });
});
