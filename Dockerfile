# Stage 1 - Build
FROM node:20-alpine AS build
WORKDIR /app

ENV VITE_AAD_REDIRECT_URL={ViteAadRedirectUrl}
ENV VITE_BACKEND_URL={ViteBackendUrl}

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build

# Stage 2 - the production environment
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app

EXPOSE 8080
CMD ["serve", "-s", ".", "-l", "8080"]
