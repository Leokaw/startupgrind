import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CommunityController::index
* @see app/Http/Controllers/CommunityController.php:12
* @route '/community'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/community',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityController::index
* @see app/Http/Controllers/CommunityController.php:12
* @route '/community'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityController::index
* @see app/Http/Controllers/CommunityController.php:12
* @route '/community'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CommunityController::index
* @see app/Http/Controllers/CommunityController.php:12
* @route '/community'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const CommunityController = { index }

export default CommunityController