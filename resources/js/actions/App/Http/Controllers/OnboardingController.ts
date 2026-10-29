import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OnboardingController::complete
* @see app/Http/Controllers/OnboardingController.php:12
* @route '/onboarding/complete'
*/
export const complete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/onboarding/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OnboardingController::complete
* @see app/Http/Controllers/OnboardingController.php:12
* @route '/onboarding/complete'
*/
complete.url = (options?: RouteQueryOptions) => {
    return complete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OnboardingController::complete
* @see app/Http/Controllers/OnboardingController.php:12
* @route '/onboarding/complete'
*/
complete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OnboardingController::skip
* @see app/Http/Controllers/OnboardingController.php:57
* @route '/onboarding/skip'
*/
export const skip = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: skip.url(options),
    method: 'post',
})

skip.definition = {
    methods: ["post"],
    url: '/onboarding/skip',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OnboardingController::skip
* @see app/Http/Controllers/OnboardingController.php:57
* @route '/onboarding/skip'
*/
skip.url = (options?: RouteQueryOptions) => {
    return skip.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OnboardingController::skip
* @see app/Http/Controllers/OnboardingController.php:57
* @route '/onboarding/skip'
*/
skip.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: skip.url(options),
    method: 'post',
})

const OnboardingController = { complete, skip }

export default OnboardingController