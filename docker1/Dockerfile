FROM php:8.1-apache

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
    software-properties-common 
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
   

# Copier les fichiers de l'application
COPY . /var/www/
#COPY projet.htaccess /var/www/html/.htaccess

# Définir le répertoire de travail
WORKDIR /var/www/

# Définir la commande d'entrée
ENTRYPOINT ["bash", "./docker/docker.sh"]

# Exposer le port utilisé par l'application
EXPOSE 80
