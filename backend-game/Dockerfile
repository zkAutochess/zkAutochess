FROM --platform=linux/amd64 node:20 as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build && npm prune --production

##################################################################

FROM --platform=linux/amd64 node:20-slim as backend

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json 
COPY --from=builder /usr/src/app/node_modules/. ./node_modules/
COPY --from=builder /usr/src/app/dist/. ./

CMD [ "node","main.js" ]
