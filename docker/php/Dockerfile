FROM php:8.1-fpm


# Set working directory
WORKDIR /var/www

# Installer les dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    locales \
    apt-utils \
    git \
    libicu-dev \
    g++ \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    libxslt-dev \
    software-properties-common \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


# Installer les extensions PHP requises
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    gd \
    opcache \
    intl \
    zip \
    calendar \
    dom \
    mbstring \
    xsl
   
# Copy existing application directory contents
COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Expose port 9000 and start php server
EXPOSE 9000
CMD ["php-fpm"]
