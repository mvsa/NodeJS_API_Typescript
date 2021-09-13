#cria imagem com base no node com base em uma dist do linux mais enxuta (alpine)
FROM node:16-alpine

#local de onde o projeto sera publicado no container
WORKDIR /usr/src/app

#copia o package json e package-loc e cola na raiz do WorkDir
COPY package*.json ./

RUN npm install


#Copia tudo de dist para o workdir
COPY ./dist .


#porta de exposição
EXPOSE 3050

#Comando de saida
CMD ["npm", "start"]