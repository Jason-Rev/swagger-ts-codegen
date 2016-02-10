// see: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/1.2.md

/*
 The Swagger representation of the API is comprised of two file types:

 The Resource Listing - This is the root document that contains general API information and lists the resources.
    Each resource has its own URL that defines the API operations on it.

 The API Declaration - This document describes a resource, including its API calls and models.
    There is one file per resource.

 */

interface ResourceListing {
    apiVersion: string;
    swaggerVersion: string;
    apis: ResourceObject[];
    authorizations: AuthorizationsObject;
    info: InfoObject;
}

interface ApiDeclaration {
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



interface ItemReferenceObject {
    "$ref":string;
}

interface ItemTypeObject {
    type:string;
    format?:string;
}

interface DataTypeField {
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

declare type ItemsObject = ItemReferenceObject | ItemTypeObject;

interface ResourceObject {
    path: string;
    description?: string;
}


interface ScopeObject {
    scope: string;
    description?: string;
}

interface InfoObject {
    title: string;
    description: string;
    termsOfServiceUrl?: string;
    contact?: string;
    license?: string;
    licenseUrl?: string;
}

interface AuthorizationsObject {[index:string]:AuthorizationObject}


interface AuthorizationObject {
    type: string;
    passAs: string;
    keyname: string;
    scopes: ScopeObject[];
    grantTypes: GrantTypesObject;
}

interface GrantTypesObject {
    implicit: ImplicitObject;
    authorization_code: AuthorizationCodeObject;
}

interface ImplicitObject {
    loginEndpoint: LoginEndpointObject;
    tokenName?: string;
}

interface AuthorizationCodeObject {
    tokenRequestEndpoint: TokenRequestEndpointObject;
    tokenEndpoint: TokenEndpointObject;
}

interface LoginEndpointObject {
    url: string;
}

interface TokenRequestEndpointObject {
    url: string;
    clientIdName?: string;
    clientSecretName?: string;
}

interface TokenEndpointObject {
    url: string;
    tokenName?: string;
}


interface ApiObject {
    path: string;
    description?: string;
    operations: OperationObject[];
}

interface ModelObjects {[index:string]:ModelObject}

interface ModelObject {
    id: string;
    description?: string;
    required?: string[];
    properties: PropertiesObject;
    subTypes?: string[];
    discriminator?: string[];
}

interface OperationObject {
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

interface ParameterObject {
    paramType: string;
    name: string;
    description?: string;
    required?: boolean;
    allowMultiple?: boolean;
}

interface ResponseMessageObject {
    code: number;
    message: string;
    responseModel?: string;
}

interface PropertiesObject {
    [index:string]:PropertyObject;
}

interface PropertyObject extends DataTypeField {
    description?: string;
}

