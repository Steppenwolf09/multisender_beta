FROM node:alpine AS development
ARG NODE_ENV=.development.env
ENV NODE_ENV=${NODE_ENV}
  WORKDIR /usr/src/app
ADD package.json /usr/src/app
ADD yarn.lock /usr/src/app
RUN apk upgrade --no-cache && apk add --no-cache bash git
RUN apk add --no-cache make gcc g++ python2 python3 alpine-sdk && yarn
ADD . /usr/src/app/
CMD ["yarn", "start:dev"]