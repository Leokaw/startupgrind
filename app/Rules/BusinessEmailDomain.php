<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;

class BusinessEmailDomain implements ValidationRule
{
    private const BLOCKED_DOMAINS = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'live.com',
        'icloud.com',
        'aol.com',
        'protonmail.com',
        'mail.com',
        'gmx.com',
        'yandex.com',
    ];

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $domain = Str::lower(Str::after($value, '@'));

        if (in_array($domain, self::BLOCKED_DOMAINS, true)) {
            $fail('Please use your business email address, not a personal/free provider.');
        }
    }
}