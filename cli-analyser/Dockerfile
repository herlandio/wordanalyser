FROM oven/bun:latest

WORKDIR /app

COPY ./cli-analyser/package.json bun.lockb* ./

RUN bun install

COPY ./cli-analyser .

EXPOSE 3001

CMD ["bun", "run", "start"]
