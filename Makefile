IMAGE_NAME=frontendlocal
PORT=3000
.PHONY: build run stop clean

build:
	docker build --no-cache -t $(IMAGE_NAME) .

run:
	docker run --rm -p $(PORT):$(PORT) $(IMAGE_NAME)

stop:
	docker stop $(shell docker ps -aq)

clean:
	docker rm $(shell docker ps -aq)
	docker rmi $(shell docker images -q)
