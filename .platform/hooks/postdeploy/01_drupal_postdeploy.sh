#!/bin/bash
set -e

echo "Starting Drupal post-deploy script..."

# Set proper working directory
cd /var/app/current

# Wait a moment for filesystem to settle
sleep 2

# Export environment variables from EB deployment
if [ -f "/opt/elasticbeanstalk/deployment/env" ]; then
    set -o allexport
    source <(sudo cat /opt/elasticbeanstalk/deployment/env)
    set +o allexport
    echo "✓ Environment variables loaded"
fi

# Add vendor/bin to PATH if it exists
if [ -d "/var/app/current/vendor/bin" ]; then
    export PATH="/var/app/current/vendor/bin:$PATH"
    echo "✓ Added vendor/bin to PATH"
fi

# Create drush symlink if drush exists
if [ -f "/var/app/current/vendor/bin/drush" ]; then
    sudo ln -sf /var/app/current/vendor/bin/drush /usr/local/bin/drush
    echo "✓ Created drush symlink"
fi

# Update bash_profile for ec2-user
if [ -f "/opt/elasticbeanstalk/deployment/env" ]; then
    BASH_PROFILE="/home/ec2-user/.bash_profile"
    ENV_LINE='set -o allexport && source <(sudo cat /opt/elasticbeanstalk/deployment/env) && set +o allexport'
    
    if ! sudo grep -qF "elasticbeanstalk/deployment/env" "$BASH_PROFILE" 2>/dev/null; then
        echo "$ENV_LINE" | sudo tee -a "$BASH_PROFILE" > /dev/null
        echo "✓ Added environment variables to bash_profile"
    else
        echo "✓ Environment variables already in bash_profile"
    fi
fi

# Set Drupal file permissions - only if directory exists
echo "Setting Drupal permissions..."
FILES_DIR="/var/app/current/web/sites/default/files"

if [ -d "$FILES_DIR" ]; then
    sudo chown -R webapp:webapp "$FILES_DIR" || echo "⚠ Could not set ownership"
    sudo chmod 775 "$FILES_DIR" || echo "⚠ Could not set directory permissions"
    sudo find "$FILES_DIR" -type d -exec chmod 775 {} \; 2>/dev/null || true
    sudo find "$FILES_DIR" -type f -exec chmod 664 {} \; 2>/dev/null || true
    echo "✓ Permissions set on files directory"
else
    echo "⚠ Files directory doesn't exist yet, creating it..."
    sudo mkdir -p "$FILES_DIR"
    sudo chown -R webapp:webapp "$FILES_DIR"
    sudo chmod 775 "$FILES_DIR"
    echo "✓ Created and configured files directory"
fi

# Set settings.php permissions
if [ -f "/var/app/current/web/sites/default/settings.php" ]; then
    sudo chmod 444 /var/app/current/web/sites/default/settings.php
    echo "✓ Settings.php permissions set"
fi

# Add ec2-user to webapp group
if ! groups ec2-user 2>/dev/null | grep -q webapp; then
    sudo usermod -a -G webapp ec2-user
    echo "✓ Added ec2-user to webapp group"
else
    echo "✓ ec2-user already in webapp group"
fi

# Run Drush commands
if command -v drush &> /dev/null; then
    echo "Running Drush commands..."
    
    drush updatedb -y 2>&1 || echo "⚠ Database updates skipped"
    drush config:import -y 2>&1 || echo "⚠ Config import skipped"
    drush cache:rebuild 2>&1 || echo "⚠ Cache rebuild skipped"
    
    echo "✓ Drush commands completed"
fi

# Ensure PHP-FPM is running
if ! systemctl is-active --quiet php-fpm; then
    sudo systemctl start php-fpm
    echo "✓ PHP-FPM started"
else
    echo "✓ PHP-FPM already running"
fi

echo "✓ Post-deploy script completed successfully!"