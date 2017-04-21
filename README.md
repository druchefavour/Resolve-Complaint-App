# Resolve: A Consumer Complaint App
## Overview
## PAGE TO TAKE COMPLAINTS BY CONSUMERS (MongoApp folder)
This Page will be created using MongoDB, Node.js and ExpressJs. All the codes are included in a folder called MongoApp. 
### Public Folder
* Inside MongoApp, create a folder called: public
  * Inside public, create an html file called ```index.html```
  * Mobile-responsive design: To ensure proper rendering and touch zooming, add the ```<meta>``` tag inside the ```<head>``` element
  * Inside ```index.html``` include bootstrap css framework [bootstrap](http://getbootstrap.com/getting-started/)
  * Create the .container class to provide a responsive fixed width container.  
  * Navabar: Create a Right-Aligned Navigation Bar
#### Place Autocomplete Address Form
* Inside ```index.html```, create place autocomplete address form to capture consumers address/ location (use [Google Maps APIs](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform#try-it-yourself))
* Create a css folder
  * Inside the css folder create the file ```addressStyle.css```
* Create a js folder
  * Inside the js folder create the file ```addressScript.css```
#### Coding Date Parameter in the Form
Here we use Bootstrap 3 Datepicker [Bootstrap Datepicker](http://eonasdan.github.io/bootstrap-datetimepicker/) to create time functionalty. This enables the user to log the time of submission of the form. 
##### Procedure
* Install bower package using: bower install eonasdan-bootstrap-datetimepicker#latest --save
* Include jQuery and Boostrap files.
* include moment.js
* Use the [enabled/disabled dates](http://eonasdan.github.io/bootstrap-datetimepicker/#enableddisabled-dates) code to create the datetimepicker.
## Creating MongoDB for loading Consumer Complaint 
* Create a models folder
* Inside the folder, create two models one for loading user information - ```user.js``` and the other for loading the complaint data- ```complaint.js```.
* ```user.js``` will take the following parameters: firstname, lastname, useremail, logintime, and useraddress
* ```complaint.js``` will take the following parameters: companyname, productname, complainttitle and complaintinput
* Create ```server.js```.
* Inside ```server.js```, require the dependencies: express, bodyParser, morgan and mongoose
* Include the Models: Complaint and User
* Set mongoose to leverage built in JavaScript ES6 Promises
* Initialize Express
* Use morgan and body parser with the app
* Make public a static dir
* Create mongo database called consumerCompdb.
* Configure database with mongoose
* Write a script to show any mongoose errors
* Write a script that once logged in to the db through mongoose, a success message would be logged
* Create a new user by using the User model as a class - The "unique" rule in the User model's schema will prevent duplicate users from being added to the server - This uses the save method.
### Routes
Creating routes for our model.
* Use GET method to
  * Create a route to see complaints users have added
  * Create a route to see what user looks like without populating
* Use POST method to
  * Create new complaint
* Use GET route to see what user looks like WITH populating
### Running program
* run npm init to create package.json file
* Install dependencies
  * Express
  * Bodyparser
  * Morgan
  * Mongoose
  * This will create node modules file
* run app (node ```server.js```) and listen at port 3000
## CHART RENDERING
## Things Required
In order to render the manager's dashboard which contains various charts, the following are required:
Run npm init to create package.json file.
  * We need to install Node.js
  * Install ExpressJS using $ npm install express (This will create the file node modules) and
  * Install MongoDB
Other processes required include:
  * To populate data in MongoDB
  * To create REST API for data retrieval
  * To create views for rendering the chart
## Import Data
The MongoDB created is a JSON based document store, the data to be populated is created in the form of an array of JSON objects. 
To populate this data into the MongoDB we make use of another tool called: mongoimport provided by MongoDB. 
name of the database (-d dataCompdb)
name of the collection (-c Logged Complaints)
type of the input data (--type json)
location of the file containing data (--file complaint.json)
option to indicate input is JSON array (--jsonArray)
```$ mongoimport -d dataCompdb -c Logged Complaints --type json --file complaint.json --jsonArray```
## Validation
Confirm if the data really got inserted by running a few queries:
  * > use dataCompdb                                    
   switched to db dataCompdb
  * > show collections
   logged_complaints
   system.indexes
  * > db.logged_complaints.find();
This displays the data in the database:
![Image of Database](https://github.com/druchefavour/Consumer_Complaint/blob/master/mongoApp/public/image/datbase_pic.PNG)
## Creating REST API for data retrieval
Now we have the required data in our db. Let us create REST API using ExpressJS to consume the data from MongoDB.
Install mongodb by using the command: $ npm install mongodb
In order to develop the REST API, we follow the steps below:
  * Import the express and mongodb packages to be used in the application
  * Connect to MongoDB instance running locally
  * Implement method to fetch the data from Database
    * While we implement the method to fetch db, we also need to parse and construct the object so that we are able to use it for rendering the multi series line chart. The multi series line chart we are going to draw requires an array of labels, multiple arrays of values where each array indicates a series:
     * We have to transform the series into the form which will help us bind to the chart
  * Create express server and REST API end-point
    * We expose the REST API at the URL /loggedComplaints. We will modify the getData() method by adding an additional parameter to the method. This additional parameter is the response object. We are going to write the JSON object created in getData() method to the response object so that it is sent to the client invoking the API.
  * Launch the express app on a port
  The server is up on http://localhost:3300 and when we open the URL http://localhost:3300/loggedComplaints in the browser, we find the JSON response of the API.
## Creating views for rendering the chart
### Handlebars Template Engine
The back-end is, so we will now build the views for rendering the chart. We are going to use the Handlebars template engine which will help us create dynamic HTML views. 
* To get handlebars working with Express we need to install a node package ```express-handlebars```. This will help us to invoke the templates from express code. 
* Install the package by running the command: ```npm install express-handlebars```.
* Create the required templates in a views directory. 
  * This base template is commonly called main.handlebars. 
  * Render other templates within this layout file. 
  * Place the base template within the layouts folder.
* The layout template would be referring to a JavaScript resource: ```complaintcharts.js``` which is placed under public/js folder.
  * This JavaScript resource is where we are going to add our code to get data from backend and render that in a chart.
  * [FusionCharts template](http://www.fusioncharts.com/dev/using-with-server-side-languages/tutorials/creating-interactive-charts-using-node-express-and-mongodb.html#step-1--import-the-express-and-mongodb-packages-to-be-used-in-the-application)  would be used in this project
  * All the FusionCharts JavaScript library would be placed in this folder.
* The template that will contain the chart is called ```chart.handlebars```. 
  * In this template we will show the data both in tabular as well as graphical format. 
* In server.js, 
  * Setup handlebars template engine with main.handlebars as default layout.
Defining an endpoint to serve static resources like JavaScript resources
A new endpoint to render the view:
Let us work on building the JavaScript code for making an AJAX call to get the data as shown below:
We will build chart.handlebars in two parts:
Build the relevant HTML to display the fuel price in a tabular form
Build the JavaScript and HTML to display the fuel price in a line chart
Build the relevant HTML to display the fuel price in a tabular form
The aim of this HTML is to display the data in a tabular form as shown below:
And for this we will make use of Handlebars template at the client side i.e we will process the handlebars templates in the client with the data we received after making an AJAX call to the server. Let us define the Handlebars template within in the <script> tag in the chart.handlebars file as shown below:
The placeholders identified by are handlebar constructs. Let us get back to the JavaScript AJAX call we had made. Within the success function we will use Handlebars.compile() to compile the client side template and then invoke the compiled template with the data obtained from server as shown below:
If you want to see the app we have built so far in action, just run the following command from the app directory: node server.js. You will see Server up: http://localhost:3300 printed. Open the URL http://localhost:3300/ to see the table as shown in the below image:
Build the JavaScript and HTML to display the fuel price in a line chart
In this section we will add code for rendering the chart. 
* Build the chart step-by-step as shown below:
* Create chart properties object
* Create categories array object
* Create FusionCharts object for multiseries line
* Render the chart using the render() API.
* Load the URL http://localhost:3300/ in the browser to see both table and chart being displayed
# React App
## Build a Chat Application with ReactJS/NodeJS/Socket.IO
* Start a new project - create a new folder: ReactApp
* Create an index.html file
* Create a package.json file
* Install the dependencies and save them in package.json (Use yarn add <package> --save)
  * http
  * express
  * socket.io
* Create server.js
  * Require all the dependencies
  * Set up socket.io to receive and send messages like would be done in a chat room
  * Listen to the server at port 3000.
### Index.html
* Import all the libraries that are required in the html file [
cdn library](https://cdnjs.com/libraries/react)
* Create a <div> inside the body tag and give it an id chat
### React Part
* Create a new file called ```chat-component.js```
* Inside ``chat-component.js``` create a variable and set it as React.createClass (call is ChatApp)
* Inside the class, create a render object
* Inside the render object, return a div tag
* Render the entire class in a DOM using reactDOM.render
### index.html
* In the ```index.html```
 file, load ```chat-component.js``` (set the script type to text babel)
* Back to ``chat-component.js```, set the initial state by using the getInitialState function 
* Return an object (messages) which is set to a blank array
* Set socket as the initial function
* For this to run, we need to load the socket.io library [socket.io](https://cdnjs.com/libraries/socket.io)
* Mount the connection and make sure that the chat is sending the information. Use componentDidMount function on this.state. So when the component mounts we send a test to see whether the app is working.
* Go back to ```server.js`` and set the connection to socket