# :space_invader: Serverless Backend Template

<p>
  <!-- <a href="https://github.com/Level-Software-Development/template-backend/actions/workflows/npm-publish.yml">
    <img alt="Build Status" src="https://github.com/Level-Software-Development/template-backend/actions/workflows/npm-publish.yml/badge.svg" />
  </a> -->
  <a href="https://github.com/Level-Software-Development/template-backend#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Level-Software-Development/template-backend/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Level-Software-Development/template-backend/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Level Software Development

## :star: Installed

- @apollo/server
- sentry
- @supercharge/promise-pool
- bluebird
- body-parser
- dotenv
- express
- faker
- helmet
- graphql
- jsonwebtoken
- jwks-rsa
- luxon
- rate-limiter-flexible
- request-ip
- sequelize
- supertest
- umzug
- aws-sdk
- jest
- serverless
- ts-jest
- ts-node
- tslint
- typescript

For full list and versions please see: [package.json](https://github.com/Level-Software-Development/template-backend/blob/main/package.json)

## :arrow_forward: Usage

To get started, create a new repo in github. Then go to the directory you would like to make your repo and run:

```sh
curl 'https://raw.githubusercontent.com/Level-Software-Development/template-backend/main/generateBackend' > generateBackend
```

Then run the bash script giving your new repo URL and optionally name of the new database as parameters

```sh
bash generateBackend <YOUR_REPO_URL> <DATABASE_NAME>
```

Add in the necessary keys to .env.

Then run:

```sh
yarn run start
```

### Linking to docker

To create a docker container to host the database, run:

```sh
docker run -it --rm -v $(pwd)/mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=<YOUR_.ENV_ROOT_PASSWORD> -d -p 3306:3306 --platform linux/x86_64 mysql/mysql-server:8.0
```

## :dizzy: Deployment

## :computer: Contributing

Contributions are very welcome, as well as issues created for any updates required.

## :bookmark: License

This project is [MIT](LICENSE) licensed.
