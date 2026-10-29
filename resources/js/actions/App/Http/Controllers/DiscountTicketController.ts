import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DiscountTicketController::create
* @see app/Http/Controllers/DiscountTicketController.php:38
* @route '/tickets/discounted/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tickets/discounted/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiscountTicketController::create
* @see app/Http/Controllers/DiscountTicketController.php:38
* @route '/tickets/discounted/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscountTicketController::create
* @see app/Http/Controllers/DiscountTicketController.php:38
* @route '/tickets/discounted/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscountTicketController::create
* @see app/Http/Controllers/DiscountTicketController.php:38
* @route '/tickets/discounted/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DiscountTicketController::store
* @see app/Http/Controllers/DiscountTicketController.php:43
* @route '/tickets/discounted'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets/discounted',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DiscountTicketController::store
* @see app/Http/Controllers/DiscountTicketController.php:43
* @route '/tickets/discounted'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscountTicketController::store
* @see app/Http/Controllers/DiscountTicketController.php:43
* @route '/tickets/discounted'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DiscountTicketController::index
* @see app/Http/Controllers/DiscountTicketController.php:15
* @route '/tickets/discounted'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tickets/discounted',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiscountTicketController::index
* @see app/Http/Controllers/DiscountTicketController.php:15
* @route '/tickets/discounted'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscountTicketController::index
* @see app/Http/Controllers/DiscountTicketController.php:15
* @route '/tickets/discounted'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscountTicketController::index
* @see app/Http/Controllers/DiscountTicketController.php:15
* @route '/tickets/discounted'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DiscountTicketController::update
* @see app/Http/Controllers/DiscountTicketController.php:87
* @route '/tickets/discounted/{discountTicket}'
*/
export const update = (args: { discountTicket: string | { id: string } } | [discountTicket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/tickets/discounted/{discountTicket}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DiscountTicketController::update
* @see app/Http/Controllers/DiscountTicketController.php:87
* @route '/tickets/discounted/{discountTicket}'
*/
update.url = (args: { discountTicket: string | { id: string } } | [discountTicket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discountTicket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { discountTicket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            discountTicket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        discountTicket: typeof args.discountTicket === 'object'
        ? args.discountTicket.id
        : args.discountTicket,
    }

    return update.definition.url
            .replace('{discountTicket}', parsedArgs.discountTicket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscountTicketController::update
* @see app/Http/Controllers/DiscountTicketController.php:87
* @route '/tickets/discounted/{discountTicket}'
*/
update.patch = (args: { discountTicket: string | { id: string } } | [discountTicket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DiscountTicketController::destroy
* @see app/Http/Controllers/DiscountTicketController.php:114
* @route '/tickets/discounted/{discountTicket}'
*/
export const destroy = (args: { discountTicket: string | { id: string } } | [discountTicket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tickets/discounted/{discountTicket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DiscountTicketController::destroy
* @see app/Http/Controllers/DiscountTicketController.php:114
* @route '/tickets/discounted/{discountTicket}'
*/
destroy.url = (args: { discountTicket: string | { id: string } } | [discountTicket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discountTicket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { discountTicket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            discountTicket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        discountTicket: typeof args.discountTicket === 'object'
        ? args.discountTicket.id
        : args.discountTicket,
    }

    return destroy.definition.url
            .replace('{discountTicket}', parsedArgs.discountTicket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscountTicketController::destroy
* @see app/Http/Controllers/DiscountTicketController.php:114
* @route '/tickets/discounted/{discountTicket}'
*/
destroy.delete = (args: { discountTicket: string | { id: string } } | [discountTicket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const DiscountTicketController = { create, store, index, update, destroy }

export default DiscountTicketController