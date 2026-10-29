import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\InviteAcceptanceController::show
* @see app/Http/Controllers/InviteAcceptanceController.php:17
* @route '/invite/{code}'
*/
export const show = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/invite/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InviteAcceptanceController::show
* @see app/Http/Controllers/InviteAcceptanceController.php:17
* @route '/invite/{code}'
*/
show.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    if (Array.isArray(args)) {
        args = {
            code: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        code: args.code,
    }

    return show.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InviteAcceptanceController::show
* @see app/Http/Controllers/InviteAcceptanceController.php:17
* @route '/invite/{code}'
*/
show.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InviteAcceptanceController::show
* @see app/Http/Controllers/InviteAcceptanceController.php:17
* @route '/invite/{code}'
*/
show.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InviteAcceptanceController::store
* @see app/Http/Controllers/InviteAcceptanceController.php:35
* @route '/invite/{code}'
*/
export const store = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/invite/{code}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InviteAcceptanceController::store
* @see app/Http/Controllers/InviteAcceptanceController.php:35
* @route '/invite/{code}'
*/
store.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    if (Array.isArray(args)) {
        args = {
            code: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        code: args.code,
    }

    return store.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InviteAcceptanceController::store
* @see app/Http/Controllers/InviteAcceptanceController.php:35
* @route '/invite/{code}'
*/
store.post = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const accept = {
    show: Object.assign(show, show),
    store: Object.assign(store, store),
}

export default accept