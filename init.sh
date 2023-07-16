#!/bin/zsh

# Start docker
docker-compose up -d

# Push the prisma schema to the database
npx prisma db push

# Install dependencies
npx pnpm i

# Build the project
npx pnpm run build

# Run the project
npx pnpm run start
