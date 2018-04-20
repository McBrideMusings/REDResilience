# ATL RED Housing Code Violation Tracking

ATL RED (Atlanta Resilience EEEEE Design Lab) Housing Code Violation Tracking is a React/NodeJS/Express web application for submitting and processing housing code violations.

This app allows users to download our [code violation form](www.google.com), which they can use to take note of a housing code violation. Then, users can transcribe the form to a matching web form on our app, which when submitted will process and enter the new code violation data to Google Sheets

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need to install NodeJS and NPM (VERSION)

### Installing

There are two embedded Node projects in this repo. The first is at the root level, and handles the server. The second's root is the client folder, and houses the React app.

First, install all dependencies in both the root

```
npm install
```

And the client

```
cd client
npm install
```

Next, you'll need to create a .env file in the root folder to set up the development environment

```
cd ..
touch .env
nano .env
```

The .env file contains the environment variables, which can be different for different developers and the deployed environment.

```
PORT=3001
PASSWORD="12345"
DRIVE_PHOTOFOLDERID="1lB53NoYKh26pQUi1YqFY2MtwKYe7gsEA"
DRIVE_SPREADSHEETID='1KYZOVHZM7KVj0jVMx8H95jqPP3jjVC5vQUIewIRb33w'
```

Port is the port used by the Express server to serve the app. In a deveopment env it can't be 3000 because that's what react uses

Password is the password used to control access to the web form. There is no user system, instead a single password can be shared between any number of volunteers

Drive PhotoFolderID is the root folder on drive that will be 

https://drive.google.com/drive/folders/HeresWhereIDIsInURL

Drive 

https://docs.google.com/spreadsheets/d/HeresWhereIDIsInURL/editOnce 

Next, you need to make a google sheet with names and a photo folder

Next, you need to download masters-creds and give the masters-creds acces to your specified folder

you're done, return to the root folder and try running the app using npm start.

```
npm start
```

npm start runs the server using nodemon (which restarts the server automatically) and the react app using concurrently.If both installed properly, a react app should start and open in your default browser

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Make sure you use

## Built With

* [React](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Node](https://maven.apache.org/) - Dependency Management
* [Express](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* Google API

## Contributing

At this time we're not using contributors

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **[Pierce McBride](https://github.com/McBrideMusings)** - *Initial work* 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Digital Media Program at Georgia Institute of Technology
* Carl DiSalvo

