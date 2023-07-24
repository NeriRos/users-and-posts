#!/bin/zsh

# Start docker
docker-compose up -d

# Db init
/bin/bash ./prisma/init_db.sh

# Install dependencies
npx pnpm i

# Build the project
npx pnpm run build

# Run the project
npx pnpm run start
