# Issue-tracker

Issue tracker node project developed using node, express, ejs and MongoDB. The project is a web application that allows users to create, manage and track issues or bugs for different projects. The application uses express as the web framework, ejs as the templating engine, MongoDB as the database and mongoose as the object data modeling library. The application also uses tailwind CSS for the user interface.

The main features of the application are:

- Users can create new projects and assign them a name, description and author🆕.
- Users can view all their projects and filter them by name.
- Users can create new issues for a project and assign them a title, description, labels and author.
- Users can view all the issues for a project and filter them by labels and author.

To run the application locally, you need to have node.js and MongoDB installed on your machine. You also need to create a .env file in the root directory of the project and add the following variables:

- MONGO_URI: The connection string for your MongoDB database
- PORT: The port number for your server
- SESSION_SECRET: A secret key for your session

Then, you can follow these steps:

- Clone this repository using `git clone https://github.com/GiridharTinnaluri/issue-tracker.git`
- Navigate to the project directory using `cd issue-tracker`
- Install the dependencies using `npm install`
- Start the server using `npm start`
- Open your browser and go to `http://localhost:5000`

You can also view a live demo of the application at `https://issue-tracker-eo3z.vercel.app/`
