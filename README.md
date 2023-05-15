## To run the server go to server directory and run
```
npm start
```

## To run the client go to client directory and run
```
npx http-server
```

## express-generator
The express package is the framework that exposes functionalities you can use in your code
The express-generator package a utility that provides a command-line tool you can use to scaffold your project - ie create boilerplate folder structure, files and code.
As part of the boiler plate files is a package.json file defining the dependencies for your project - ie npm packages that you will need for your project. The express package is listed there.

Knowing the npm install instruction (run with current working directory set to project folder containing the package.json) will "install" all dependencies listed in package.json into your project folder to make them available to your application, it would be sufficient to do:
```
npm install express-generator -g
```
Create the app:
```
express myApp                               // without view
express --view=hbs /tmp/foo && cd /tmp/foo  // with view
```

## Get the bootstrap cdn
https://getbootstrap.com/docs/5.3/getting-started/introduction/

## Express method-override middleware
## override using a query value
To use a query string value to override the method, specify the query string key as a string argument to the methodOverride function. To then make the call, send a POST request to a URL with the overridden method as the value of that query string key. This method of using a query value would typically be used in conjunction with plain HTML <form> elements when trying to support legacy browsers but still use newer methods.
```
var express = require('express')
var methodOverride = require('method-override')
var app = express()
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
```
Example call with query override using HTML <form>:
```
<form method="POST" action="/resource?_method=DELETE">
  <button type="submit">Delete resource</button>
</form>
```