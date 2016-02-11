/**
 * Created by jasondent on 10/02/2016.
 */

/// <reference path="./defs.d.ts"/>

import * as fs from "fs";
import { swagger_12 } from "./swagger_12";
import * as _ from "lodash";

export module codegen {

    const swaggerTypesToTypescriptTypes = {
        integer: "number",
        number: "number",
        string: "string",
        boolean: "boolean",
        choice: "string"
    };

    const defaultType = 'string';

    export function processModels(swagger: swagger_12.ApiDeclaration) : {[index:string]:Model} {
        return _.mapValues(swagger.models, (model: swagger_12.ModelObject)=>{
            return Model.fromSwagger12ModelObject(model);
        });
    }

    export function loadSwaggerSpecSync(filename) {
        return JSON.parse(fs.readFileSync(filename, 'UTF-8'));
    }

    /**
     * make sure references can be Typescript class names
     *
     * @param ref
     * @returns {string}
     */
    export function refToType(ref:string) {
        return ref.replace(/[^a-zA-Z0-9_$]/g, '_');
    }

    export class Model {
        public name: string;
        public description: string;
        public properties: ModelProperties;

        static fromSwagger12ModelObject(swaggerModel: swagger_12.ModelObject) {
            let model = new Model();
            model.name = refToType(swaggerModel.id);
            model.description = swaggerModel.description || '';
            model.properties = _.mapValues(swaggerModel.properties, (prop: swagger_12.PropertyObject)=>{
                if (prop.type == 'array') {
                    const rawType = prop.items && (prop.items['$ref'] || prop.items['type']) || defaultType;
                    const type = refToType(rawType) + '[]';
                    return new ModelProperty(type, prop.description || '');
                }
                return new ModelProperty(
                    swaggerTypesToTypescriptTypes[prop.type] || defaultType,
                    prop.description || ''
                );
            });
            return model;
        }
    }

    export interface ModelProperties {
        [index:string]:ModelProperty;
    }

    export class ModelProperty {
        constructor(public type:string, public description:string) {
        }
    }

}
