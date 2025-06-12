FROM ubuntu

RUN apt-get update && apt-get upgrade -y && apt-get install -y apache2 python3
RUN apt install apache2 apache2-utils ssl-cert libapache2-mod-wsgi-py3 -y

RUN mkdir -p /var/www/html/ATI
COPY . /var/www/html/ATI

COPY dockerfile-conf/mod-wsgi.conf /etc/apache2/conf-available/
RUN a2enconf mod-wsgi 

RUN apt-get install -y python3-pip
RUN apt-get install -y python3.12-venv
RUN mkdir -p /home/apps/web_cache_pty
RUN python3 -m venv web_cache_pty_env
RUN . web_cache_pty_env/bin/activate
RUN pip install beaker-py --break-system-packages

CMD ["apache2ctl", "-D","FOREGROUND"]

#docker build -t apache_image .
#docker run --name apache_container -d -p 8080:80 apache_image