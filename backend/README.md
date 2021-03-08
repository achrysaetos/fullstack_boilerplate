# BACKEND

* Set up access to your database *(server.js)*
* Set up document organization *(models/)*
* Create the rules by which queries and mutations can read and write data *(graphql/)*
* Validate user input and authorization *(util/)*


## Important files and folders:

**graphql/**\
&nbsp; **resolvers/**\
&nbsp; &nbsp; **comments.js** -- create mutations for creating and deleting comments\
&nbsp; &nbsp; **index.js** -- combine all the resolvers so you can actually use them\
&nbsp; &nbsp; **post.js** -- create queries for getting one/many posts, and mutations for creating/deleting/liking posts\
&nbsp; &nbsp; **users.js** -- create mutations for logging in and registering users\
&nbsp; **typeDefs** -- define your schema's types (the types of data a client can read and write to your data graph)

**models/**\
&nbsp; **Post.js** -- set up document organization and type declarations for your posts\
&nbsp; **User.js** -- set up document organization and type declarations for your users

**util/**\
&nbsp; **validators.js** -- validate the strings (only!) from the login and register inputs (no access to database here)\
&nbsp; **check-auth.js** -- return the user if one exists, given the bearer token from the http header

**server.js** -- create your server and link to your database


## Others:

**.gitignore** -- commit only the files you write yourself (not your config file, of course)

**config.js** -- store all your sensitive variables here