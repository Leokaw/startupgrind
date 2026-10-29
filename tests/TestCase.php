<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Skip Vite manifest lookup in tests — prevents 500 errors
        // when public/build/manifest.json doesn't exist (e.g., in CI).
        $this->withoutVite();
    }
}