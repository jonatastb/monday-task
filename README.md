# World Countries 🌎

## Description 📝
This system was created to collect data from a table on the monday website and show the current climate in that country. With a search bar to help you search for the country you want

## Technologies Used 🤖
- **Front-end:**
  - React
  - TypeScript
  - Axios
  - monday-ui-react-core

- **Back-end:**
  - Node.js
  - Fastify
  - Zod
  - Axios
  - dotenv
  - monday-sdk-js

## Project 

## Front-End 
### Installation 
Provide steps to install and run the front-end:

```bash
cd frontend
npm install
npm run dev
```
The project will be run on PORT 3000
### Structure
The front-end has the following folders and files inside src:

- api: Contains the api.tsx file, where Axios is instantiated and the API path to the back-end is defined and exported.
- components: Contains the Table.tsx file, where our table is created and the functions that fetch the necessary data are called. This separation was made to ensure that rendering is handled only by the table, avoiding unnecessary re-renders of the entire front-end.
- services: Contains functions that fetch information for the table and other components. This includes:
  - countryService.tsx: Fetches information from the Monday API.
  - weatherApi.tsx: Fetches climate information from the back-end.

- styles: Contains global styles for the entire system.
- App.tsx: Contains our table component, the country search bar, and a modal that shows climate information for the selected country.
- main.tsx: The entry point for our React application.

## Back-End 
### Installation 
Provide steps to install and run the back-end:

```bash
cd back-end
npm install
npm run dev
```
The project will be run on PORT 5432
### Structure
The back-end has the following folders and files inside src:

- env: Where *dotenv* does all the configuration and *zod* validates the .env data so we can use it in our application.
- routes: Contains our route file monday-api-routes.ts that creates our route:
```bash 
 GET - get-country-weather/:country (name of the country the user clicked on the front end) 
```
- app.ts: Contains the *Fastify* intaciation, and some configurations such as cors registration, default route for returning 404 code, and a prefix for our task routes:
```bash
prefix: monday-task-api
```
- server.ts: Finally, inside the src folder we have the file that starts the *Fastify* server, bringing our .env port.

- back-end/.env: Inside the back-end directory we have the .env file that is responsible for providing us with the *Fastify* server port and the weather api token. This file will be sent to the repository via email.

## API 
``` bash
Route: http://localhost:5432/monday-task-api/get-country-weather/:country

Example: http://localhost:5432/monday-task-api/get-country-weather/Brazil
```

## Acknowledgments 🙏
Thank you very much for the opportunity to work on this project and for the lessons it provided.