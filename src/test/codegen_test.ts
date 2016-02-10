/**
 * Created by jasondent on 10/02/2016.
 */

import chai = require('chai');
import { codegen } from "../codegen";
const { expect } = chai;


describe('Codegen', ()=>{

    const spec = codegen.loadSwaggerSpecSync(__dirname + '/../../src/test/data/api_questions.json') as ApiDeclaration;

    it('verifies spec is not empty',()=>{
        expect(spec).to.not.be.empty;
    });

    it('verifies spec has swagger version 1.2',()=>{
        expect(spec.swaggerVersion).to.be.equal('1.2');
    });

});
