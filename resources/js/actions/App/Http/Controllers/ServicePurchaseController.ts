import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServicePurchaseController::store
* @see app/Http/Controllers/ServicePurchaseController.php:27
* @route '/services/{service}/purchase'
*/
export const store = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/services/{service}/purchase',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServicePurchaseController::store
* @see app/Http/Controllers/ServicePurchaseController.php:27
* @route '/services/{service}/purchase'
*/
store.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { service: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
    }

    return store.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicePurchaseController::store
* @see app/Http/Controllers/ServicePurchaseController.php:27
* @route '/services/{service}/purchase'
*/
store.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const ServicePurchaseController = { store }

export default ServicePurchaseController