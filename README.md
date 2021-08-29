# test-app

This is test app.

[adidas YARN Design System v2][yarn] is used as CSS design library, and tooling is based on [JS Build Tools][js-build-tools] packages.

## Requirements

Tools to run the generator with their recommended versions:

- NodeJS \>= 8
- NPM \>= 5
- Docker \>= 17

## Development

The are several tools already set up to work in development mode.

### Build and serve

Build in development mode with the next features: dev server, file watcher and hot module replacement.

```
npm start
```

Will start webpack dev server on port `8080` with live reload.

### Code linting

The code is checked following the [adidas coding guidelines][adidas-coding-guidelines].

```
npm run lint
```

Tooling:

- Base configuration files, source code and test files: [ESLint][eslint].
- Style files: [stylelint][stylelint].

### Testing

[Jest][jest] is the tool used to run the tests.

```
npm run test
```

The coverage is automatically created:

- LCOV file: `/test/results/TEST_TYPE/coverage/lcov.info`.
- HTML report: `/test/results/TEST_TYPE/coverage/lcov-report`.

Only unit tests are set up by default, to run other type of tests, you have to add NPM scripts and tooling/configurations.

### Clean temporary files

The temporary files such as distributables, documentation and tests results can be removed with the `clean` task.

```
npm run clean
```

## Build for production

```
npm run build
```

Will produce minified distributables in `/dist` folder.

## Documentation

The application documentation can be generated with the `doc` task using [JSDoc][jsdoc].

```
npm run doc
```

The generated documentation is located in `/docs` folder.

## Dockerize

```
npm install
npm run build
docker build -t test-app .
docker run -dit \
           --name test-app \
           -p 8080:80 \
           test-app
```

## Deploy to k8s

```
# Setup variables
NAMESPACE=some-namespace
CLUSTER_URL=some.cluster.url
TAG=`node -p 'require("./package.json").version'`

# Create docker image
npm install
npm run build
docker build -t registry.tools.adidas-group.com/1/test-app:$TAG .
docker push registry.tools.adidas-group.com/1/test-app:$TAG

# Apply k8s manifest
envsubst < deploy/all.yml > deploy.yml
kubectl apply -f deploy.yml
```

[adidas-coding-guidelines]: https://github.com/adidas/adidas-contribution-guidelines/wiki/Coding-style-guidelines
[jest]: https://jestjs.io/
[js-build-tools]: https://github.com/adidas/js-build-tools
[eslint]: https://eslint.org/
[jsdoc]: http://usejsdoc.org/
[stylelint]: https://stylelint.io/
[yarn]: http://yarn.adidas.com/
