test:
	open ./test/index.html

lint:
	eslint public/scripts

.PHONY: lint test
