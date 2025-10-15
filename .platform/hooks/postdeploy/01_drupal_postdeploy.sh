#!/bin/bash

# Now have to export ENV variables for drush 

# Check if vendor/bin directory exists before adding to PATH
if [ -d "/var/app/current/vendor/bin" ]; then
    export PATH="/var/app/current/vendor/bin:$PATH"
    echo "Added /var/app/current/vendor/bin to PATH"
fi

# Check if drush exists before creating symlink
if [ -f "/var/app/current/vendor/bin/drush" ]; then
    sudo ln -sf /var/app/current/vendor/bin/drush /usr/local/bin/drush
    echo "Created drush symlink"
fi

# Check if env file exists before adding to bash_profile
if [ -f "/opt/elasticbeanstalk/deployment/env" ]; then
    # Also check if the line isn't already in bash_profile to avoid duplicates
    if ! grep -q "set -o allexport && eval" ~/.bash_profile 2>/dev/null; then
        echo 'set -o allexport && eval $(sudo cat /opt/elasticbeanstalk/deployment/env) && set +o allexport' >> ~/.bash_profile
        echo "Added environment variables to bash_profile"
    else
        echo "Environment variables already in bash_profile"
    fi
fi

# Set permissions so that I can run drush cr from command line
sudo chmod 444 /var/app/current/web/sites/default/settings.php
sudo find /var/app/current/web/sites/default/files -type d -exec chmod 775 {} \;
sudo find /var/app/current/web/sites/default/files -type f -exec chmod 644 {} \;

# Make sure ec2-user has access to the webapp group's permissions
sudo usermod -a -G webapp ec2-user

# Eb when creating a new instance often it fails to have php-fpm running (probably because of my cheapness haha)
sudo systemctl restart php-fpm
