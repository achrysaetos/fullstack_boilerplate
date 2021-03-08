# FRONTEND

* Allow react to access your graphql server *(src/ApolloProvider.js)*
* Create the entry point to your app *(src/index.js)*
* Serve each component of your app *(src/App.js)* <br/><br/>

* Call the graphql queries and mutations, and display your components *(src/pages/)*
* Create react components for your pages *(src/components/)*
* Handle verification of users and the implementation their token *(src/context/)* <br/><br/>

* Create queries and mutations to update the database *(src/graphql/)*
* Write helper functions for the parts of your app *(src/util/)*
* Allow your app access to tailwind's styles *(src/index.css)*
* Write standard css for your app *(src/App.css)*


## Important files and folders:

**src/**\
&nbsp; **components/**\
&nbsp; &nbsp; **DeleteButton.js** -- create a delete button and determine what happens when it is clicked\
&nbsp; &nbsp; **LikeButton.js** -- create a like button and determine what happens when it is clicked\
&nbsp; &nbsp; **MenuBar.js** -- create a complete, interactive navbar\
&nbsp; &nbsp; **PostCard.js** -- create the card component that displays all the parts of a post\
&nbsp; &nbsp; **PostForm.js** -- create the form component that handles the creation of a new post\
&nbsp; **context/**\
&nbsp; &nbsp; **auth.js** -- verify that the user exists, and set/remove the user token on login/logout\
&nbsp; **graphql/**\
&nbsp; &nbsp; **...** -- create queries and mutations to update the database\
&nbsp; **pages/**\
&nbsp; &nbsp; **Home.js** -- display the PostForm and PostCard components using the FETCH_POSTS_QUERY\
&nbsp; &nbsp; **Login.js** -- create the login form and decide what to do with user data\
&nbsp; &nbsp; **Register.js** -- create the register form and decide what to do with user data\
&nbsp; &nbsp; **SinglePost.js** -- display any post and its comments using FETCH_POST_QUERY and SUBMIT_COMMENT_MUTATION\
&nbsp; **util/**\
&nbsp; &nbsp; **AuthRoute.js** -- route to different pages if the user is logged in\
&nbsp; &nbsp; **hooks.js** -- handle onChange, onSubmit, and values when dealing with forms

&nbsp; **ApolloProvider.js** -- allow react to access your graphql server along with any cached data

&nbsp; **App.css** -- write standard css for your app

&nbsp; **App.js** -- serve each component of your app

&nbsp; **index.css** -- use tailwind's `base`, `components`, and `utilities` styles

&nbsp; **index.js** -- create the entry point to your app


## Others:

**.gitignore** -- commit only the files you write yourself

**craco.config.js** -- necessary for tailwind, b/c create react app doesn't let you override the PostCSS config natively

**tailwind.config.js** -- configure tailwind, generated from running `npx tailwindcss init`