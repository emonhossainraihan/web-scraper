# Backend

add Babel *(@babel/cli @babel/core @babel/node @babel/preset-env)* to the app so that I can use features of JavaScript that aren’t available in Node.js such as `import` in future developement.


```js
// .babelrc
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

The App start with babel-node runtime instead of the normal Node runtime so that it can use Babel.

```json
  "scripts": {
    "start": "nodemon --exec npm run babel-node --  ./bin/www",
    "babel-node": "babel-node"
  }
```

I use the Bull package for creating a job queue for scraping data, CORS for allowing requests from the frontend, Request and Request Promise for fetching the website text, Sequelize for the ORM, and SQLite3 for storing data.