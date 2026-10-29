import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TicketPurchaseController::store
* @see app/Http/Controllers/TicketPurchaseController.php:27
* @route '/tickets/{ticket}/purchase'
*/
export const store = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/purchase',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketPurchaseController::store
* @see app/Http/Controllers/TicketPurchaseController.php:27
* @route '/tickets/{ticket}/purchase'
*/
store.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketPurchaseController::store
* @see app/Http/Controllers/TicketPurchaseController.php:27
* @route '/tickets/{ticket}/purchase'
*/
store.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const TicketPurchaseController = { store }

export default TicketPurchaseController