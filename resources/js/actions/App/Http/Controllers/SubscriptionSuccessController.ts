import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SubscriptionSuccessController::show
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
export const show = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/billing/success/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::show
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
show.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    if (Array.isArray(args)) {
        args = {
            token: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        token: args.token,
    }

    return show.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::show
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
show.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::show
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
show.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::status
* @see app/Http/Controllers/SubscriptionSuccessController.php:36
* @route '/billing/success/{token}/status'
*/
export const status = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/billing/success/{token}/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::status
* @see app/Http/Controllers/SubscriptionSuccessController.php:36
* @route '/billing/success/{token}/status'
*/
status.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    if (Array.isArray(args)) {
        args = {
            token: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        token: args.token,
    }

    return status.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::status
* @see app/Http/Controllers/SubscriptionSuccessController.php:36
* @route '/billing/success/{token}/status'
*/
status.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::status
* @see app/Http/Controllers/SubscriptionSuccessController.php:36
* @route '/billing/success/{token}/status'
*/
status.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::complete
* @see app/Http/Controllers/SubscriptionSuccessController.php:46
* @route '/billing/success/{token}/complete'
*/
export const complete = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/billing/success/{token}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::complete
* @see app/Http/Controllers/SubscriptionSuccessController.php:46
* @route '/billing/success/{token}/complete'
*/
complete.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    if (Array.isArray(args)) {
        args = {
            token: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        token: args.token,
    }

    return complete.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::complete
* @see app/Http/Controllers/SubscriptionSuccessController.php:46
* @route '/billing/success/{token}/complete'
*/
complete.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

const SubscriptionSuccessController = { show, status, complete }

export default SubscriptionSuccessController