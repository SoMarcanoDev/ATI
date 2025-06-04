FROM ubuntu

RUN apt-get update -y && apt-get upgrade -y && apt-get install nano
RUN apt install -y apache2
RUN apt install -y apache2-utils
RUN apt clean

COPY . /var/www/html

EXPOSE 80

CMD ["apache2ctl", "-D","FOREGROUND"]

#docker build -t apache_image .
#docker run -- apache_container -d -p 8080:80 apache_image