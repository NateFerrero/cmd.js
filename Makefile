.PHONY: test install test-watch build build-watch

install:
	npm install

test:
	npm test

test-watch:
	./node_modules/.bin/_mocha --check-leaks --no-exit --recursive --watch -R min

build:
	./node_modules/.bin/gulp

build-watch:
	./node_modules/.bin/gulp start

