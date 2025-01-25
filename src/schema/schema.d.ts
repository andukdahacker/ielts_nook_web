/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/me/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get me */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                center?: {
                                    id: string;
                                    email: string;
                                    name: string;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                                user?: {
                                    id: string;
                                    email: string;
                                    /** @default null */
                                    username: string | null;
                                    /** @default null */
                                    firstName: string | null;
                                    /** @default null */
                                    lastName: string | null;
                                    centerId: string;
                                    role: "ADMIN" | "TEACHER" | "STUDENT";
                                    /** @default null */
                                    phoneNumber: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/center/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Register a center */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        email: string;
                        name: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                center: {
                                    id: string;
                                    email: string;
                                    name: string;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/center/signIn": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Sign in a center */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        idToken: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                token: string;
                                center: {
                                    id: string;
                                    email: string;
                                    name: string;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/center/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get current center */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                center: {
                                    id: string;
                                    email: string;
                                    name: string;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** @description Update a user */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        userId: string;
                        username?: string;
                        firstName?: string;
                        lastName?: string;
                        phoneNumber?: string;
                        role?: "ADMIN" | "TEACHER" | "STUDENT";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                user: {
                                    id: string;
                                    email: string;
                                    /** @default null */
                                    username: string | null;
                                    /** @default null */
                                    firstName: string | null;
                                    /** @default null */
                                    lastName: string | null;
                                    centerId: string;
                                    role: "ADMIN" | "TEACHER" | "STUDENT";
                                    /** @default null */
                                    phoneNumber: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        /** @description Create a user */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        email: string;
                        password: string;
                        role: "ADMIN" | "TEACHER" | "STUDENT";
                        username?: string;
                        firstName?: string;
                        lastName?: string;
                        phoneNumber?: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                user: {
                                    id: string;
                                    email: string;
                                    /** @default null */
                                    username: string | null;
                                    /** @default null */
                                    firstName: string | null;
                                    /** @default null */
                                    lastName: string | null;
                                    centerId: string;
                                    role: "ADMIN" | "TEACHER" | "STUDENT";
                                    /** @default null */
                                    phoneNumber: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/{userId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Delete a user */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    userId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get list of users */
        get: {
            parameters: {
                query: {
                    take: number;
                    cursor?: string;
                    searchString?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                nodes: {
                                    id: string;
                                    email: string;
                                    /** @default null */
                                    username: string | null;
                                    /** @default null */
                                    firstName: string | null;
                                    /** @default null */
                                    lastName: string | null;
                                    centerId: string;
                                    role: "ADMIN" | "TEACHER" | "STUDENT";
                                    /** @default null */
                                    phoneNumber: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                }[];
                                pageInfo: {
                                    hasNextPage: boolean;
                                    cursor?: string;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/signIn": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Sign in a user */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        email: string;
                        password: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                token: string;
                                user: {
                                    id: string;
                                    email: string;
                                    /** @default null */
                                    username: string | null;
                                    /** @default null */
                                    firstName: string | null;
                                    /** @default null */
                                    lastName: string | null;
                                    centerId: string;
                                    role: "ADMIN" | "TEACHER" | "STUDENT";
                                    /** @default null */
                                    phoneNumber: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/class/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** @description Update a class */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        classId: string;
                        name?: string;
                        description?: string;
                        addMembers?: string[];
                        removeMembers?: string[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                class: {
                                    id: string;
                                    name: string;
                                    /** @default null */
                                    description: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        /** @description Create a class */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        description?: string;
                        classMember: string[];
                        centerId: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                class: {
                                    id: string;
                                    name: string;
                                    /** @default null */
                                    description: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/class/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a class */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    classId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                class: {
                                    id: string;
                                    name: string;
                                    /** @default null */
                                    description: string | null;
                                    createdAt: unknown;
                                    updatedAt: unknown;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/class/{classId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Delete a class */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    classId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/class/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get class list */
        get: {
            parameters: {
                query: {
                    take: number;
                    cursor?: string;
                    centerId: string;
                    searchString?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                nodes: {
                                    class: {
                                        id: string;
                                        name: string;
                                        /** @default null */
                                        description: string | null;
                                        createdAt: unknown;
                                        updatedAt: unknown;
                                    };
                                    members: {
                                        id: string;
                                        email: string;
                                        /** @default null */
                                        username: string | null;
                                        /** @default null */
                                        firstName: string | null;
                                        /** @default null */
                                        lastName: string | null;
                                        centerId: string;
                                        role: "ADMIN" | "TEACHER" | "STUDENT";
                                        /** @default null */
                                        phoneNumber: string | null;
                                        createdAt: unknown;
                                        updatedAt: unknown;
                                    }[];
                                }[];
                                pageInfo: {
                                    hasNextPage: boolean;
                                    cursor?: string;
                                };
                            };
                            message: string;
                        };
                    };
                };
                /** @description Default Response */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: string;
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** Center */
        Center: {
            id: string;
            email: string;
            name: string;
            createdAt: unknown;
            updatedAt: unknown;
        };
        /** RegisterCenterInput */
        RegisterCenterInput: {
            email: string;
            name: string;
        };
        /** SignInCenterInput */
        SignInCenterInput: {
            idToken: string;
        };
        /** UserRole */
        UserRole: "ADMIN" | "TEACHER" | "STUDENT";
        /** User */
        User: {
            id: string;
            email: string;
            /** @default null */
            username: string | null;
            /** @default null */
            firstName: string | null;
            /** @default null */
            lastName: string | null;
            centerId: string;
            role: "ADMIN" | "TEACHER" | "STUDENT";
            /** @default null */
            phoneNumber: string | null;
            createdAt: unknown;
            updatedAt: unknown;
        };
        /** CreateUserInput */
        CreateUserInput: {
            email: string;
            password: string;
            role: "ADMIN" | "TEACHER" | "STUDENT";
            username?: string;
            firstName?: string;
            lastName?: string;
            phoneNumber?: string;
        };
        /** GetUserListInput */
        GetUserListInput: {
            take: number;
            cursor?: string;
            searchString?: string;
        };
        /** SignInUserInput */
        SignInUserInput: {
            email: string;
            password: string;
        };
        /** UpdateUserInput */
        UpdateUserInput: {
            userId: string;
            username?: string;
            firstName?: string;
            lastName?: string;
            phoneNumber?: string;
            role?: "ADMIN" | "TEACHER" | "STUDENT";
        };
        /** Class */
        Class: {
            id: string;
            name: string;
            /** @default null */
            description: string | null;
            createdAt: unknown;
            updatedAt: unknown;
        };
        /** GetClassListInput */
        GetClassListInput: {
            take: number;
            cursor?: string;
            centerId: string;
            searchString?: string;
        };
        /** UpdateClassInput */
        UpdateClassInput: {
            classId: string;
            name?: string;
            description?: string;
            addMembers?: string[];
            removeMembers?: string[];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
