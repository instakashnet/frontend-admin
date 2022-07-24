FROM 160743850946.dkr.ecr.us-east-2.amazonaws.com/docker-library:node14-alpine as build

## Docker argunments for build:

ARG REACT_APP_STAGE="test"

## Docker environment variables:

ENV REACT_APP_STAGE=$REACT_APP_STAGE

RUN \
    apk update && \
    apk add build-base gcc wget git && \
    apk add --no-cache python2 py-pip && \
    pip install --upgrade pip

WORKDIR  /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build:$REACT_APP_STAGE

FROM 160743850946.dkr.ecr.us-east-2.amazonaws.com/docker-library:nginx-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY container /
RUN \
  \
# changed nginx uid / gid to 48
  \
  sed -i -e 's/^nginx:x:[0-9]\+:[0-9]\+:/nginx:x:48:48:/' /etc/passwd \
  && sed -i -e 's/^nginx:x:[0-9]\+:/nginx:x:48:/' /etc/group \
  \
# Create cache directory
  \
  && mkdir -p \
      /var/cache/nginx/proxy_temp \
      /var/cache/nginx/client_temp \
      /var/cache/nginx/fastcgi_temp \
      /var/cache/nginx/scgi_temp \
      /var/cache/nginx/uwsgi_temp \
  \
# Change ownership so that nginx can write
  && chown -R nginx:nginx /etc/nginx/nginx.conf /etc/nginx/conf.d /var/cache/nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
