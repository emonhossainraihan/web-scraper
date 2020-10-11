## Sequelize Part

- `npx sequelize-cli init`
- Edit `config.json` file

```
{
  "development": {
    "dialect": "sqlite",
    "storage": "development.db"
  },
  "test": {
    "dialect": "sqlite",
    "storage": "test.db"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "production.db"
  }
}
```

- Create migrations and models `npx sequelize-cli model:create --name Deal --attributes name:string,description:string,url:string,content:text`
- Create table `npx sequelize-cli db:migrate`