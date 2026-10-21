FROM node:26.10.0-alpine3.24

LABEL maintainer="TBernwinkler"

# General Linux setup and updates
RUN apk update \
    && apk add --update alpine-sdk \
    && apk del alpine-sdk \
    && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
    && npm cache verify \
    && set -i -e "s/bin\/bash/bin\/sh/" /etc/passwd

RUN npm install -g @angular/cli

# source code is mounted via docker-compose build (server only, cross repository setup)

COPY builder.sh /home/node/builder.sh
RUN chmod +x /home/node/builder.sh

CMD ["/bin/sh", "/home/node/builder.sh" ]
