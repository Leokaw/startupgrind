import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CompanyEmployeeController::destroy
* @see app/Http/Controllers/CompanyEmployeeController.php:17
* @route '/company/employees/{employee}'
*/
export const destroy = (args: { employee: string | { id: string } } | [employee: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/company/employees/{employee}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CompanyEmployeeController::destroy
* @see app/Http/Controllers/CompanyEmployeeController.php:17
* @route '/company/employees/{employee}'
*/
destroy.url = (args: { employee: string | { id: string } } | [employee: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { employee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            employee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        employee: typeof args.employee === 'object'
        ? args.employee.id
        : args.employee,
    }

    return destroy.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyEmployeeController::destroy
* @see app/Http/Controllers/CompanyEmployeeController.php:17
* @route '/company/employees/{employee}'
*/
destroy.delete = (args: { employee: string | { id: string } } | [employee: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const employees = {
    destroy: Object.assign(destroy, destroy),
}

export default employees