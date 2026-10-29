import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import discounted from './discounted'
import invite from './invite'
/**
* @see \App\Http\Controllers\TicketPurchaseController::purchase
* @see app/Http/Controllers/TicketPurchaseController.php:27
* @route '/tickets/{ticket}/purchase'
*/
export const purchase = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: purchase.url(args, options),
    method: 'post',
})

purchase.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/purchase',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketPurchaseController::purchase
* @see app/Http/Controllers/TicketPurchaseController.php:27
* @route '/tickets/{ticket}/purchase'
*/
purchase.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return purchase.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketPurchaseController::purchase
* @see app/Http/Controllers/TicketPurchaseController.php:27
* @route '/tickets/{ticket}/purchase'
*/
purchase.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: purchase.url(args, options),
    method: 'post',
})

const tickets = {
    discounted: Object.assign(discounted, discounted),
    invite: Object.assign(invite, invite),
    purchase: Object.assign(purchase, purchase),
}

export default tickets