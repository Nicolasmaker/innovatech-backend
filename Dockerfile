# ETAPA 1: Construcción (Build)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ETAPA 2: Producción (Producción más ligera y segura)
FROM node:18-alpine
WORKDIR /app
# Copiamos solo lo necesario desde la etapa builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./

# Creamos un usuario no root para cumplir con la rúbrica (Seguridad)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000
CMD ["npm", "start"]
