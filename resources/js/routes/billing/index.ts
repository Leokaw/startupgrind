import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import success4282bc from './success'
/**
* @see \App\Http\Controllers\SubscriptionController::subscribe
* @see app/Http/Controllers/SubscriptionController.php:17
* @route '/billing/subscribe'
*/
export const subscribe = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subscribe.url(options),
    method: 'post',
})

subscribe.definition = {
    methods: ["post"],
    url: '/billing/subscribe',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionController::subscribe
* @see app/Http/Controllers/SubscriptionController.php:17
* @route '/billing/subscribe'
*/
subscribe.url = (options?: RouteQueryOptions) => {
    return subscribe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::subscribe
* @see app/Http/Controllers/SubscriptionController.php:17
* @route '/billing/subscribe'
*/
subscribe.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subscribe.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see app/Http/Controllers/SubscriptionController.php:113
* @route '/billing/cancel'
*/
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/billing/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see app/Http/Controllers/SubscriptionController.php:113
* @route '/billing/cancel'
*/
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see app/Http/Controllers/SubscriptionController.php:113
* @route '/billing/cancel'
*/
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see app/Http/Controllers/SubscriptionController.php:129
* @route '/billing/resume'
*/
export const resume = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(options),
    method: 'post',
})

resume.definition = {
    methods: ["post"],
    url: '/billing/resume',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see app/Http/Controllers/SubscriptionController.php:129
* @route '/billing/resume'
*/
resume.url = (options?: RouteQueryOptions) => {
    return resume.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see app/Http/Controllers/SubscriptionController.php:129
* @route '/billing/resume'
*/
resume.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::success
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
export const success = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(args, options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/billing/success/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::success
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
success.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return success.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::success
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
success.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubscriptionSuccessController::success
* @see app/Http/Controllers/SubscriptionSuccessController.php:14
* @route '/billing/success/{token}'
*/
success.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(args, options),
    method: 'head',
})

const billing = {
    subscribe: Object.assign(subscribe, subscribe),
    cancel: Object.assign(cancel, cancel),
    resume: Object.assign(resume, resume),
    success: Object.assign(success, success4282bc),
}

export default billing