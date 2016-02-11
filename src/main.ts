/**
 * Created by jasondent on 11/02/2016.
 */

/// <reference path="./defs.d.ts"/>

import * as program from 'commander';
import { codegen } from './codegen';

program
    .version('0.1')
    .usage('<infile>')
    .arguments('<infile>')
    .action((infile:string)=>{
        const spec = codegen.loadSwaggerSpecSync(infile);
        console.log(codegen.renderModels(spec));
    });


program.parse(process.argv);
