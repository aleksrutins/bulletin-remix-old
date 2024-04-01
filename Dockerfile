FROM node:alpine
ARG DIRECTUS_URL
ENV DIRECTUS_URL=${DIRECTUS_URL}
ENV PORT=3000
COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build
EXPOSE ${PORT}
RUN chown -R node /app
USER node
ENV NODE_ENV=production
CMD ["npm", "start"]
