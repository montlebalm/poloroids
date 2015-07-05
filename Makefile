build:
	npm install

test:
	open ./test/index.html

lint:
	./node_modules/eslint/bin/eslint.js public/scripts

.PHONY: lint test
