# Topics Covered
- react-router v6
- CRUD With Functional & Class Component using json-server

# Running the app

## Something more than "npm start"
The react code in this repo demonstrates CRUD operations with both class as well as functional component syntaxes.
For CRUD operations I have used json-server.

## What is json-server
So, json-server is a http service working with db.json file and offers REST API URL Endpoints to perform CRUD operations with db.json file.

## How to start json server
```bash
npx json-server --watch db.json --port 8080
```
Now open http://localhost:8080/users in your browser and check if you are able to fetch the data which is available in db.json file

## Starting React App
After you successfully start the json-server start the react app using:
```bash
npm start
```
