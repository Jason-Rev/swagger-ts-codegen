/**
 * Created by jasondent on 11/02/2016.
 */

/// <reference path="./defs.d.ts"/>

import * as program from 'commander';
import { codegen } from './codegen';
import { Nelmio } from './Nelmio';

program
    .version('0.1');

program
    .command('models <infile>')
    .description('Parse a single spec from a json file.')
    .action((infile:string)=>{
        const spec = codegen.loadSwaggerSpecSync(infile);
        console.log(codegen.renderModelsFromSpec(spec));
    });

program
    .command('nelmio <infile>')
    .description('Parse the output of the nelmio command: php app/console api:swagger:dump ')
    .action((infile:string)=>{
        Nelmio.processFile(infile).then((models=>{
            console.log(codegen.renderModels(models));
        }));
    });


program.parse(process.argv);
