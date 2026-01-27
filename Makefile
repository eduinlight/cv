include .env
export

cv:
	bun run src/index.ts

lint:
	bunx biome check .

lint-fix:
	bunx biome check --write .

format:
	bunx biome format --write .
