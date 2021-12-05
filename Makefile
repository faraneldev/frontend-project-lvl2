install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	genDiff __fixtures__/file1.json __fixtures__/file2.json