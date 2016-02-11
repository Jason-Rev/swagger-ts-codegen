/**
 * Created by jasondent on 11/02/2016.
 */

export module templates {
    export const model = `
/**
 * {{name}}
 * {{description}}
 */
export interface {{name}} {
    {{#properties}}
        {{#description}}
        /**
         * {{{description}}}
         */
         {{/description}}
        {{name}}{{^required}}?{{/required}}: {{type}};
    {{/properties}}
}
`;


}