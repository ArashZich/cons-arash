FROM node:20 as builder
WORKDIR /app

COPY . ./

# Install all dependencies including devDependencies
RUN npx yarn install

# Build the Next.js application
RUN npx yarn build

FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

# Install only production dependencies
RUN npx yarn install --production

# Copy necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "start"]
