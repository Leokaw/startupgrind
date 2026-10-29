<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\BusinessEmailDomain;                    // ← added
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register', [
            'passwordRules' => Rules\Password::defaults()->toPasswordRulesString(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => array_filter([                    // ← wrapped in array_filter
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:' . User::class,
                // Only enforce a professional email when registering as a company.
                $request->input('user_type') === 'company'
                    ? new BusinessEmailDomain
                    : null,
            ]),                                          // ← end array_filter
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_type' => ['required', 'string', 'in:company,user,freelancer'],
        ]);

        // ... everything below stays exactly as it was ...
        if (
            $request->input('account_type') === 'community' &&
            ! in_array($request->input('role'), ['user', 'freelancer'], true)
        ) {
            throw ValidationException::withMessages([
                'role' => 'Please pick whether you are a normal user or a freelancer.',
            ]);
        }

        if (
            $request->input('account_type') === 'company' &&
            $request->filled('role')
        ) {
            throw ValidationException::withMessages([
                'role' => 'Companies cannot have an individual role.',
            ]);
        }

        if (empty($validated['user_type'])) {
            throw ValidationException::withMessages([
                'user_type' => 'Registration could not determine the account type. Please try again.',
            ]);
        }

        Log::info('Register diagnostic', [
            'validated_user_type' => $validated['user_type'] ?? null,
            'fillable' => (new User)->getFillable(),
            'guarded' => (new User)->getGuarded(),
            'user_model_file' => (new \ReflectionClass(User::class))->getFileName(),
        ]);

        $user = new User;
        $user->forceFill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'user_type' => $validated['user_type'],
        ]);
        $user->save();

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('events');
    }
}
