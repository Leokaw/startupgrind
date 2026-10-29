<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Rules\BusinessEmailDomain;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $isCompany = ($input['user_type'] ?? null) === 'company';

        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users',
                // Companies must register with a business email —
                // personal domains like gmail/yahoo are rejected.
                Rule::when($isCompany, [new BusinessEmailDomain]),
            ],
            'password' => ['required', 'string', 'confirmed', Password::default()],
            'user_type' => ['required', 'string', 'in:company,user,freelancer'],
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'user_type' => $input['user_type'],
        ]);
    }
}