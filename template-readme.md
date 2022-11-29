# :space_invader: example_name

> Level Software Development

## :arrow_forward: Usage

Add the neccesary keys to the .env file. Then run:

```sh
yarn run start
```

### Linking to docker

To create a docker container to host the database, run:

```sh
docker run -it --rm -v $(pwd)/mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=<YOUR_.ENV_ROOT_PASSWORD> -d -p 3306:3306 --platform linux/x86_64 mysql/mysql-server:8.0
```

## :dizzy: Deployment
