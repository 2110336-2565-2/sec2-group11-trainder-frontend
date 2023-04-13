FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN yarn install 
RUN yarn build
RUN yarn cache clean
EXPOSE 3000
CMD yarn start
