FROM node:lts

WORKDIR /cli

COPY package*.json /cli/

RUN npm install

COPY . .

RUN npm link

ENTRYPOINT ["eci"]
