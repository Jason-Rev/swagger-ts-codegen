/**
 * Created by jasondent on 10/02/2016.
 */

/// <reference path="./defs.d.ts"/>

import * as fs from "fs";
import { swagger_12 } from "./swagger_12";
import * as _ from "lodash";
import { templates } from "./templates";
import * as mustache from "mustache";

export module codegen {

    const swaggerTypesToTypescriptTypes = {
        integer: "number",
        number: "number",
        string: "string",
        boolean: "boolean"
    };

    const defaultType = 'string';

    export function processModels(swagger: swagger_12.ApiDeclaration) : {[index:string]:Model} {
        return _.mapValues(swagger.models, (model: swagger_12.ModelObject)=>{
            return Model.fromSwagger12ModelObject(model);
        });
    }

    export function renderModels(models) : string {
        return _.map(models, (model : Model)=>(renderModel(model))).join('\n\n');
    }

    export function renderModelsFromSpec(swagger: swagger_12.ApiDeclaration) : string {
        const models = processModels(swagger);
        return renderModels(models);
    }

    export function loadSwaggerSpecSync(filename) : swagger_12.ApiDeclaration {
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

    /**
     * Render a model into an interface.
     * @param model
     * @param template
     * @returns {string}
     */
    export function renderModel(model: Model, template: string = templates.model): string {
        return mustache.render(template, model);
    }

    export class Model {
        public name: string;
        public description: string;
        public properties: ModelProperties;

        static fromSwagger12ModelObject(swaggerModel: swagger_12.ModelObject) {
            let model = new Model();
            const required = _.keyBy(swaggerModel.required, (v)=>(v)) || {};
            model.name = refToType(swaggerModel.id);
            model.description = swaggerModel.description || '';
            model.properties = _.map(swaggerModel.properties, (prop: swagger_12.PropertyObject, name:string)=>{
                if (prop.type == 'array') {
                    const rawType = prop.items && (prop.items['type'] || prop.items['$ref']) || defaultType;
                    const type = refToType(rawType) + '[]';
                    return new ModelProperty(name, type, prop.description || '', !!required[name]);
                }
                return new ModelProperty(
                    name,
                    swaggerTypesToTypescriptTypes[prop.type] || prop.type || defaultType,
                    prop.description || '',
                    !!required[name]
                );
            });
            return model;
        }
    }

    export type ModelProperties = ModelProperty[];

    export class ModelProperty {
        constructor(public name: string, public type:string, public description:string, public required: boolean) {
        }
    }

}
