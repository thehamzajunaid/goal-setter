Video # 1:
Create a folder named 'backened'
In this folder create a file named server.js

In the root directory run 'npm init'
This will create 'packages.json' for us in the root directory

Create a file named '.gitignore' in the root
Initializes a git repo but doesnt upload node_modules and the .env files

After all this go to root and install all the dependencies
run 'npm i express dotenv mongoose colors'

As a dev dependency we will install nodemon that will constantly watch our 
server.js file so we dont have to keep restarting it.
run 'npm i -D nodemon'

Go to packages.json and update the scripts
"scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
This will allow us to run 'npm run server' for our nodemon to run server.js file

Initialize a git repo using 'git init' and then add the code using 'git add .'
commit it using 'git commmit -m "Initial commit"'

Setup the server.js file by adding the port and then creating an app using express.js 
This app listen on some port.

Now open up Postman for api. We will access our server using localhost:5000.
Create some routes in your server.js For exampple the get request to /api/goals
try some res.send and res.json to see if your routes are working okay

We dont want our server.js to be filled with so much routes so what we do is we create a new
folder in our backend as 'routes' and in that we will have a file named 'goalRoutes.js' i.e each resource 
in our api will have its own route file.

In our goalRoutes.js file we will import express and router from express
We will use router for the route and then this router object will be exported using 
module.exports = router

In our server.js file we will make use of 'app.use' to use our route using the require() method
in its arguments so that we will call our goalRoutes file 

Now add couple other routes on your goalRoutes file for post put delete methods
In put and delete request we will have to pass an id '/:id'

After we set up our routes in goalRoutes. Instead of defining all the logic in this file
what we can do is create another folder named as 'controller' and in that create a file named 
'goalController.js' where we will define the functions of every type of request. It makes our code more 
organized. 
In the end we have to export these functions using 'modules.exports = {getGaols, ...}'

In the route file i.e goalRoutes we will import our controller functions.
Using 'const {} = require(`path of controller file`)'

Uptil now we have default express Error handler but we want to create our own.
For this we will create a new folder in backedn named as 'middleware' in this folder
we willl create a file named 'errorMiddleware.js' in which we will write the 
middleware for Error Handling. We export our errorMiddleware function and import it in 'server.js'
In server.js we will call it using 'app.use(errorMiddleware)' now whenever we use 
'throw new Error(`message`)' then our errorMiddleware function will be used. 

SInce we will be interacting with databse and request responses so there will be events occuring at all times
we want to work asynchronously so we will use 'async' functions in controller files. 
We know we use try catch with async await but if we wanna use our Error handler then we will
install a dependency called 'express-async-handler' and enclose our controller functions into this asyncHandler.

So we have setup our server almost now. Now it is time to conect to your database MongoDB.
Create account of mongoDB atlas and then complete the process. Click the connect button
and connect with application and your mongoDB compass. For connecting with application we will
paste the connection string in our '.env' file. Declare a new variable named 'MONGO_URI'.
Restart your server so that .env file is reflected everywhere. 

In the backend folder create a new folder named 'config'. Create new file named 'db.js'.
In db.js import mongoose. Initialize a connnection to your database. Write simple logic and then export 
this connectDB function. In server.js import the connectDB function from db.js 
Run the connectDB function before other app. methods

Now we will start working with our database. So we will be using mongoose's Schemas to
work with. Create a new folder named models in the backend folder and in that create a new file named
'goalModel'. Create a Schema for our goal and then export its model using 
'module.exports = mongoose.model(`name of model in string`, `variable name of defined schema`)'

Import this model in your goalController and use the Goal model to create, read, update and delete 
different goals based on the route of URL. Since our controller functions are asynchronous so 
we will use await keyword with our Goal model.

Video # 2:

Create a User model just like we created a goal model. In the goal model we will now add a user reference. 
So that we know that this goal belongs to whcih user. 

Import this new userModel.js in userRoutes.js
Setup some routes using router. Create a new controller file for user as userController.js
In this file make some cntroller functions for different routes for a user api.
Import these functions into yur userRoutes.js with the appropriate paths using
'router.post(`path`, `controllerFunction`)'

We dont save passwords as it is in our database so fr that we hash them using 'bcryptjs' and also we will
use json web tokens for authentication. So lets install these two libraries 
'npm i bcryptjs jsonwebtoken'

Wrap our userController functions in express-async-handler and async keyword. Here in userControllers
we will import our jwt and bcryptjs libraries because here we want our passwords to be ecnrypted and 
we will be using authentication logic in this file also.

In the registerUser controller function we will hash our password using the salt method
of bcryptjs. The syntax is in userControllers.js for reference. This way we will not save our same password
in db but its ecnrypted version. For login we will get this password from db and run a .compare() 
method on our password and hashed password from db. 

Now we will use jwt to authenticate our user. JwT generates a token which is to be maintained by the 
client machine and the server only looks at it when the client ask for any data. The token is signed
by using some data as its payload i.e when the token is verified you can access this payload as a return 
value of .verify() usually as decoded.payload. Most of the times it is the id that we pass as a payload when 
signing the token and upon verification we extract it by using findByID(decoded.id)
where decode is a variable in which we store the return value of .verify(`token`, `secret`). 

If we dont want our  decoded payload (which is now stored in req.user or whatever)to be used to 
access other data that is stored with it then we can use .select("-fieldName"). 

The JWT token is passed to the server using the HTTp request filed Authentication. It starts with a 'Bearer'
keyword to let the server know that it is a JWT which the server has to validate first to let the user make 
changes to the database or whatever he wants. We have to implement all this logic in a separate middleware
which will be created in middleware folder as 'authMiddleware.js'. All of this is implemented 
within a function and that function will be imported in routes files to be used to allow private accesses
to different routes based on the user that is logged in. 


Video # 3

Now when we have our backend up and running we will now build our front end. For this we will
use react-redux. 

Go to the root directory and run on the terminal 'npx create-react-app frontend --template redux'
This will create a boilerplate react app code with redux toolkit boilerplate in it too. The 
incremenet counter exmaple of redux toolkit.

Remove unnecessary files from the tree.

To run the frontend only we will make some changes in the 'packages.json' file of our root directory. 
Include ` "client": "npm start --prefix frontend" ` in the scripts.
With this we can just type 'npm run client' in the terminal in the root directory and only our frontend
will run the browser. We will later see how to run both server and server at the same time.

Clean the 'App.js' file. 
Decide the pages fot your application and then make a folder in frontend with the name 'pages' and in
that folder add all all your page files. For different components create a folder named 'components' in the
src folder in which we will be putting all of our components. 

In the App.js file import react-router-dom because we will be working with riutes in that file. 

Write the code for your pages. We wrote for register.js fist in this application. Pure react logic
no server interaction yet. 

Setup the folder structure for the redux store. Create a folder named 'app' in which 
we will create file named 'store.js'. This file contains our redux store for the app.
Create a 'features' folder in the src which will contain
folders based on the name of the domain of the features. For example we will have 'auth' folder in 
it which will have our authSlice of our global state. In this file we will create our authReducer 
which will be used to update our state provided we give it some action to perform.

We use 'createSlice()' method of redux to make a slice of the state. 
authSlice has normal actions within the authSlice function but also Thunk fnctions for 
asynchronous actions. We use 'createAsyncthunk()' function of the redux toolkit to create a Thunk
action creator. This function make use of http service calls to grab data from the request. 
For this we usually create a separate file to manage the service calls. here we have a file named 
'authService' in which we are making use of axios for the same work that we used to do with postman. 
Its just that now we want to do the same work by coding. 

The axios requests return the responses and we pass the data back to our async thunk action creator
in our authSlice file to be used. 

The thunk action creators have their states as 'pending', 'fulfilled' and 'rejected'
These states are used in the 'exraReducers' key of the authSlice function. 

The async thunk actions are handled in the extraReducers part of our authSlice. 

Now when we have our authSlice almost complete we will start coding for the events to be handled
by our frontend. 

We will implement login functionality also using the auth token that we used in our backend.
We will crosscheck if the user that is trying to login has the key that we gave them while 
he was registering on our website.
