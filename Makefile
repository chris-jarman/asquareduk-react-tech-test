.PHONY: usage
usage:
	@echo 'Usage: make [command]'
	@echo 'Commands:'
	@echo '  usage - Print usage instructions'
	@echo '  dev   - Start local development stack'
	@echo '  up    - Start local docker compose services'
	@echo '  down  - Stop local docker compose services'

.PHONY: dev
dev: up
	pnpm exec turbo run dev

.PHONY: up
up:
	docker compose up --detach

.PHONY: down
down:
	docker compose down
