# -- Base node
FROM node:14.1.0-alpine3.10 AS base
# - creating a directory as workspace
RUN mkdir /root/workspace
WORKDIR /root/workspace
# - copy package.json
COPY package.json .


# Install yarn and install dependencies
FROM base AS dependencies
# - copy other config files
COPY .babelrc .
COPY yarn.lock .
# - install prod dependencies
RUN yarn install --production
# - copy prod dependencies
RUN cp -R node_modules prod_node_modules
# - install all dependencies
RUN yarn


# Copy code and run unit tests
FROM dependencies AS test
# - copy all
COPY . .
# - run unit tests
RUN yarn test


# build the project
FROM test AS build
RUN yarn build

# Prodution code
FROM base AS prod
# - copy prod node modules
COPY --from=dependencies /root/workspace/prod_node_modules ./node_modules
COPY --from=build /root/workspace/dist ./dist
EXPOSE 8888
ENTRYPOINT [ "yarn", "start:prod" ]
