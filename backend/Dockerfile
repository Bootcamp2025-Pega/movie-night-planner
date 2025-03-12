# Use a lightweight Node image
FROM node:lts-alpine AS builder

# Create and set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies first (this helps with caching)
COPY package*.json ./
RUN npm install

# Copy tsconfig.json 
COPY tsconfig.json ./

# Copy the source files before building
COPY ./src ./src
COPY ./knexfile.ts ./
COPY ./startup.ts ./
COPY ./migrations/ ./dist/migrations

# Now run the TypeScript build
RUN npm run build

RUN npm prune --production

FROM node:lts-alpine

# Setup working directory for project
WORKDIR /app

# Copy published in previous stage binaries
# from the `builder` image
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set URL that App will be exposed
EXPOSE 4000
# Add debug port
EXPOSE 9229

# sets entry point command to automatically
# run application on `docker run`
# ENTRYPOINT ["node", "./dist/src/index.js"]

# For debugging, use this instead of the regular ENTRYPOINT
ENTRYPOINT ["node", "--inspect=0.0.0.0:9229", "./dist/startup.js"]
