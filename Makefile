# Makefile

# Start the database container
start-db:
	docker-compose up -d

# Run migrations (modify if you have specific migration commands)
run-migrations:
	docker-compose run api npm run migrate

# Build the API Docker image
build-api:
	docker-compose build api

# Run the API container (with dependencies)
start-api: start-db run-migrations build-api
	docker-compose up api

# Stop all containers
stop:
	docker-compose down

# Clean up (optional)
clean:
	docker-compose down -v

# Display help
help:
	@echo "Usage:"
	@echo "  make start-db           - Start the database container"
	@echo "  make run-migrations     - Run database migrations"
	@echo "  make build-api          - Build the REST API Docker image"
	@echo "  make start-api          - Start the API container and dependencies"
	@echo "  make stop               - Stop all containers"
	@echo "  make clean              - Clean up all containers and volumes"
