import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfilePhotoController::store
* @see app/Http/Controllers/ProfilePhotoController.php:11
* @route '/profile/photo'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/profile/photo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfilePhotoController::store
* @see app/Http/Controllers/ProfilePhotoController.php:11
* @route '/profile/photo'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfilePhotoController::store
* @see app/Http/Controllers/ProfilePhotoController.php:11
* @route '/profile/photo'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfilePhotoController::destroy
* @see app/Http/Controllers/ProfilePhotoController.php:36
* @route '/profile/photo'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/profile/photo',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProfilePhotoController::destroy
* @see app/Http/Controllers/ProfilePhotoController.php:36
* @route '/profile/photo'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfilePhotoController::destroy
* @see app/Http/Controllers/ProfilePhotoController.php:36
* @route '/profile/photo'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const photo = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default photo