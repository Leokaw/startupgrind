import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CompanyServiceController::create
* @see app/Http/Controllers/CompanyServiceController.php:29
* @route '/services/company/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/services/company/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CompanyServiceController::create
* @see app/Http/Controllers/CompanyServiceController.php:29
* @route '/services/company/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyServiceController::create
* @see app/Http/Controllers/CompanyServiceController.php:29
* @route '/services/company/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CompanyServiceController::create
* @see app/Http/Controllers/CompanyServiceController.php:29
* @route '/services/company/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CompanyServiceController::store
* @see app/Http/Controllers/CompanyServiceController.php:34
* @route '/services/company'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/services/company',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CompanyServiceController::store
* @see app/Http/Controllers/CompanyServiceController.php:34
* @route '/services/company'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyServiceController::store
* @see app/Http/Controllers/CompanyServiceController.php:34
* @route '/services/company'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CompanyServiceController::update
* @see app/Http/Controllers/CompanyServiceController.php:70
* @route '/services/company/{companyService}'
*/
export const update = (args: { companyService: string | { id: string } } | [companyService: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/services/company/{companyService}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CompanyServiceController::update
* @see app/Http/Controllers/CompanyServiceController.php:70
* @route '/services/company/{companyService}'
*/
update.url = (args: { companyService: string | { id: string } } | [companyService: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { companyService: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { companyService: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            companyService: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        companyService: typeof args.companyService === 'object'
        ? args.companyService.id
        : args.companyService,
    }

    return update.definition.url
            .replace('{companyService}', parsedArgs.companyService.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyServiceController::update
* @see app/Http/Controllers/CompanyServiceController.php:70
* @route '/services/company/{companyService}'
*/
update.patch = (args: { companyService: string | { id: string } } | [companyService: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CompanyServiceController::destroy
* @see app/Http/Controllers/CompanyServiceController.php:94
* @route '/services/company/{companyService}'
*/
export const destroy = (args: { companyService: string | { id: string } } | [companyService: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/services/company/{companyService}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CompanyServiceController::destroy
* @see app/Http/Controllers/CompanyServiceController.php:94
* @route '/services/company/{companyService}'
*/
destroy.url = (args: { companyService: string | { id: string } } | [companyService: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { companyService: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { companyService: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            companyService: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        companyService: typeof args.companyService === 'object'
        ? args.companyService.id
        : args.companyService,
    }

    return destroy.definition.url
            .replace('{companyService}', parsedArgs.companyService.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyServiceController::destroy
* @see app/Http/Controllers/CompanyServiceController.php:94
* @route '/services/company/{companyService}'
*/
destroy.delete = (args: { companyService: string | { id: string } } | [companyService: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const CompanyServiceController = { create, store, update, destroy }

export default CompanyServiceController