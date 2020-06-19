FROM mhart/alpine-node:10.15.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install
RUN yarn run build
CMD yarn run serve