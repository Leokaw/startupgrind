import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InviteTicketController::create
* @see app/Http/Controllers/InviteTicketController.php:39
* @route '/tickets/invite/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tickets/invite/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InviteTicketController::create
* @see app/Http/Controllers/InviteTicketController.php:39
* @route '/tickets/invite/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InviteTicketController::create
* @see app/Http/Controllers/InviteTicketController.php:39
* @route '/tickets/invite/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InviteTicketController::create
* @see app/Http/Controllers/InviteTicketController.php:39
* @route '/tickets/invite/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InviteTicketController::store
* @see app/Http/Controllers/InviteTicketController.php:50
* @route '/tickets/invite'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets/invite',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InviteTicketController::store
* @see app/Http/Controllers/InviteTicketController.php:50
* @route '/tickets/invite'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InviteTicketController::store
* @see app/Http/Controllers/InviteTicketController.php:50
* @route '/tickets/invite'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const InviteTicketController = { create, store }

export default InviteTicketController