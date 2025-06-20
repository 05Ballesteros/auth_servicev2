# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Etapa final
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/*.json .                                  
EXPOSE 4101
<<<<<<< HEAD
CMD ["node", "dist/main"]
=======
CMD ["node", "dist/main"]
 
 
>>>>>>> 5cb7486f3983929e4e9d028d724f77ccb757668b
