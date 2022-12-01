FROM amd64/node:16-alpine

RUN apk add --no-cache \
    nss \
    ca-certificates

# nodej
RUN mkdir -p /home/app/ && chown -R node:node /home/app

WORKDIR /home/app

COPY --chown=node:node . .

RUN npm install

USER node
