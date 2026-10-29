import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see app/Http/Controllers/SubscriptionController.php:17
* @route '/billing/subscribe'
*/
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/billing/subscribe',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see app/Http/Controllers/SubscriptionController.php:17
* @route '/billing/subscribe'
*/
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see app/Http/Controllers/SubscriptionController.php:17
* @route '/billing/subscribe'
*/
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
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

const SubscriptionController = { checkout, cancel, resume }

export default SubscriptionController