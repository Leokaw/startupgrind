import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MessageController::store
* @see app/Http/Controllers/MessageController.php:23
* @route '/users/{receiver}/messages'
*/
export const store = (args: { receiver: string | { id: string } } | [receiver: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/users/{receiver}/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::store
* @see app/Http/Controllers/MessageController.php:23
* @route '/users/{receiver}/messages'
*/
store.url = (args: { receiver: string | { id: string } } | [receiver: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { receiver: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { receiver: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            receiver: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        receiver: typeof args.receiver === 'object'
        ? args.receiver.id
        : args.receiver,
    }

    return store.definition.url
            .replace('{receiver}', parsedArgs.receiver.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::store
* @see app/Http/Controllers/MessageController.php:23
* @route '/users/{receiver}/messages'
*/
store.post = (args: { receiver: string | { id: string } } | [receiver: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MessageController::read
* @see app/Http/Controllers/MessageController.php:76
* @route '/messages/{message}/read'
*/
export const read = (args: { message: string | { id: string } } | [message: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: read.url(args, options),
    method: 'patch',
})

read.definition = {
    methods: ["patch"],
    url: '/messages/{message}/read',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MessageController::read
* @see app/Http/Controllers/MessageController.php:76
* @route '/messages/{message}/read'
*/
read.url = (args: { message: string | { id: string } } | [message: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { message: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            message: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        message: typeof args.message === 'object'
        ? args.message.id
        : args.message,
    }

    return read.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::read
* @see app/Http/Controllers/MessageController.php:76
* @route '/messages/{message}/read'
*/
read.patch = (args: { message: string | { id: string } } | [message: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: read.url(args, options),
    method: 'patch',
})

const messages = {
    store: Object.assign(store, store),
    read: Object.assign(read, read),
}

export default messages