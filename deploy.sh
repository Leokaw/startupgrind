#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
APP_DIR="/var/www/my-app"
PHP_VERSION="8.4" # Matches your Debian 13 setup

echo "🚀 Starting deployment for $APP_DIR..."

# 1. Navigate to the application directory
cd $APP_DIR

# 2. Enable maintenance mode to prevent errors during the update
php artisan down || true

# 3. Pull the latest code (Reset is safer for CI/CD to avoid merge conflicts)

echo "Pulling latest code from Git..."
git config --global --add safe.directory $APP_DIR
git fetch --all
git reset --hard origin/main


# 4. Install Composer dependencies (production only)
echo "📦 Installing Composer dependencies..."
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# 5. Build frontend assets
echo "⚛️  Installing Node dependencies and building assets..."
npm ci
npm run build

# 6. Clear old caches and rebuild for production
echo "🧹 Clearing and rebuilding caches..."
php artisan optimize:clear
php artisan optimize

# 7. Run database migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# 8. Fix permissions for the web server user (www-data)
echo "Fixing permissions..."
sudo chown -R www-data:www-data $APP_DIR
sudo find $APP_DIR -type d -exec chmod 755 {} \;
sudo find $APP_DIR -type f -exec chmod 644 {} \;
sudo chmod -R 775 $APP_DIR/storage
sudo chmod -R 775 $APP_DIR/bootstrap/cache

# 9. Reload PHP-FPM to apply changes
echo "🔄 Reloading PHP-FPM..."
sudo systemctl reload php${PHP_VERSION}-fpm

# 10. Disable maintenance mode
php artisan up

echo "Deployment finished successfully!"