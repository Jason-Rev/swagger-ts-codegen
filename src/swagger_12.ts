
export module swagger_12 {
    export interface ResourceListing {
        apiVersion: string;
        swaggerVersion: string;
        apis: ResourceObject[];
        authorizations: AuthorizationsObject;
        info: InfoObject;
    }

    export interface ApiDeclaration {
        swaggerVersion: string;
        apiVersion?: string;
        basePath: string;
        resourcePath?: string;
        apis: ApiObject[];
        models?: ModelObjects;
        produces?: string[];
        consumes?: string[];
        authorizations: AuthorizationsObject;
    }



    export interface ItemReferenceObject {
        "$ref":string;
    }

    export interface ItemTypeObject {
        type:string;
        format?:string;
    }

    export interface DataTypeField {
        type?: string;
        "$ref"?: string;
        format?: string;
        defaultValue?: string;
        "enum"?: string[];
        minimum?: string;
        maximum?: string;
        items?: ItemsObject;
        uniqueItems?: boolean;
    }

    export type ItemsObject = ItemReferenceObject | ItemTypeObject;

    export interface ResourceObject {
        path: string;
        description?: string;
    }


    export interface ScopeObject {
        scope: string;
        description?: string;
    }

    export interface InfoObject {
        title: string;
        description: string;
        termsOfServiceUrl?: string;
        contact?: string;
        license?: string;
        licenseUrl?: string;
    }

    export interface AuthorizationsObject {[index:string]:AuthorizationObject}


    export interface AuthorizationObject {
        type: string;
        passAs: string;
        keyname: string;
        scopes: ScopeObject[];
        grantTypes: GrantTypesObject;
    }

    export interface GrantTypesObject {
        implicit: ImplicitObject;
        authorization_code: AuthorizationCodeObject;
    }

    export interface ImplicitObject {
        loginEndpoint: LoginEndpointObject;
        tokenName?: string;
    }

    export interface AuthorizationCodeObject {
        tokenRequestEndpoint: TokenRequestEndpointObject;
        tokenEndpoint: TokenEndpointObject;
    }

    export interface LoginEndpointObject {
        url: string;
    }

    export interface TokenRequestEndpointObject {
        url: string;
        clientIdName?: string;
        clientSecretName?: string;
    }

    export interface TokenEndpointObject {
        url: string;
        tokenName?: string;
    }


    export interface ApiObject {
        path: string;
        description?: string;
        operations: OperationObject[];
    }

    export interface ModelObjects {[index:string]:ModelObject}

    export interface ModelObject {
        id: string;
        description?: string;
        required?: string[];
        properties: PropertiesObject;
        subTypes?: string[];
        discriminator?: string[];
    }

    export interface OperationObject {
        method: string;
        summary?: string;
        notes?: string;
        nickname: string;
        authorizations?: AuthorizationsObject;
        parameters: ParameterObject[];
        responseMessages?: ResponseMessageObject[];
        produces?: string[];
        consumes?: string[];
        deprecated?: string;
    }

    export interface ParameterObject {
        paramType: string;
        name: string;
        description?: string;
        required?: boolean;
        allowMultiple?: boolean;
    }

    export interface ResponseMessageObject {
        code: number;
        message: string;
        responseModel?: string;
    }

    export interface PropertiesObject {
        [index:string]:PropertyObject;
    }

    export interface PropertyObject extends DataTypeField {
        description?: string;
    }



}