#!/bin/bash
set -e  # Exit on error

echo "Starting Drupal post-deploy script..."

# Set proper working directory
cd /var/app/current

# Export environment variables from EB deployment
if [ -f "/opt/elasticbeanstalk/deployment/env" ]; then
    set -o allexport
    source <(sudo cat /opt/elasticbeanstalk/deployment/env)
    set +o allexport
    echo "✓ Environment variables loaded"
else
    echo "⚠ Warning: /opt/elasticbeanstalk/deployment/env not found"
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
else
    echo "⚠ Warning: drush not found in vendor/bin"
fi

# Update bash_profile for ec2-user only if not already present
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

# Set Drupal file permissions
echo "Setting Drupal permissions..."
sudo chown -R webapp:webapp /var/app/current/web/sites/default/files
sudo chmod 444 /var/app/current/web/sites/default/settings.php
sudo find /var/app/current/web/sites/default/files -type d -exec chmod 775 {} \;
sudo find /var/app/current/web/sites/default/files -type f -exec chmod 664 {} \;
echo "✓ Permissions set"

# Add ec2-user to webapp group
if ! groups ec2-user | grep -q webapp; then
    sudo usermod -a -G webapp ec2-user
    echo "✓ Added ec2-user to webapp group"
else
    echo "✓ ec2-user already in webapp group"
fi

# Run Drush commands
echo "Running Drush commands..."

# Database updates
# if command -v drush &> /dev/null; then
#     echo "Running database updates..."
#     drush updatedb -y || echo "⚠ Warning: Database updates failed or not needed"
    
#     echo "Importing configuration..."
#     drush config:import -y || echo "⚠ Warning: Config import failed or not needed"
    
#     echo "Clearing cache..."
#     drush cache:rebuild || echo "⚠ Warning: Cache rebuild failed"
    
#     echo "✓ Drush commands completed"
# else
#     echo "⚠ Warning: drush command not available"
# fi

# Ensure PHP-FPM is running (restart only if not running)
if ! systemctl is-active --quiet php-fpm; then
    echo "PHP-FPM not running, starting it..."
    sudo systemctl start php-fpm
    echo "✓ PHP-FPM started"
else
    echo "✓ PHP-FPM already running"
fi

echo "✓ Post-deploy script completed successfully!"