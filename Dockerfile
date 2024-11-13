
FROM node:20

WORKDIR /app

RUN npm install -g pnpm

#RUN pnpm config set global-bin-dir /pnpm-global/bin

#ENV PATH=/pnpm-global/bin:$PATH

COPY package.json pnpm-lock.yaml .env ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
