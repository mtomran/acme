FROM nginx:1.15.0

# removing default config file
RUN rm -f /etc/nginx/conf.d/*

# adding custom config file
COPY ./config /etc/nginx/conf.d