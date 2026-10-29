import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import company from './company'
/**
* @see \App\Http\Controllers\ServicePurchaseController::purchase
* @see app/Http/Controllers/ServicePurchaseController.php:27
* @route '/services/{service}/purchase'
*/
export const purchase = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: purchase.url(args, options),
    method: 'post',
})

purchase.definition = {
    methods: ["post"],
    url: '/services/{service}/purchase',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServicePurchaseController::purchase
* @see app/Http/Controllers/ServicePurchaseController.php:27
* @route '/services/{service}/purchase'
*/
purchase.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return purchase.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicePurchaseController::purchase
* @see app/Http/Controllers/ServicePurchaseController.php:27
* @route '/services/{service}/purchase'
*/
purchase.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: purchase.url(args, options),
    method: 'post',
})

const services = {
    company: Object.assign(company, company),
    purchase: Object.assign(purchase, purchase),
}

export default services