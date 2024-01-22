# chipmunks_also_rest
1/14/2024

    -this is the start of my gardening log project. the aim is to create an application users can sign into and make daily logs of their gardens. 

    -These logs should include the following:
        a date time
        pictures if the user wants
        a description
        the ability to make sub logs for seperate garden beds

    -the user should be able to look at a collection of all their log entries as a calendar image or as a list

    -all the information needs to be stored server side.

    -from this day forward all days work and future needs must be documented in this read me file with the corresponding date

1/14/2024

    -I created the html file for testing the api.

    -I also created the server files and the majority of other files im going to need. The majority of this project will be based on user use. I need to make sure everything is diplayed properly when retrieving information from the API



1/15/2024

    -I implemented the ability to post new entries to the api

    -I created the users object and added myself as a user. This object contains the logs object and the logs object contains the datetime object. finally the users submission is store as key value pairs in the datetime object. the reason for so many levels is the user will contain other resources and we will want to be able to obtain specific logs based on the date they were submitted so the user can look back at what they did previously.

    ***in the future I want the user to to have the ability to distinguish between different gardens or plant types that they name. they will be able to create logs specific for that type. this could probably be included as another key value pair within the datetime object when they create their submission. this could then be used to sort later.

    ***I still need to create a page that updates for the user but first i want to make sure i'm able to update the api. currently the results of what i submit are just logged on the console.



1/16/2024

    -I created and connected the mongo atlas database to the server

    -I hosted the server on cyclic under the url https://gardenmonk.cyclic.app/

    -I also created the userlist database in the mongo client to hold the the existing user info to avoid creating accounts with the same username. this will be essential in accessing the users data. 

    ***I need to make the username dynamic based on them logging into the site this is top priority



1/17/2024

    -I think the index.html can remain as the landing page and log in. I just need to change the forms on there and then redirect from that page to my ejs template. I'm also thinking that the sign in button will need to be tied to the client side JS in order to set the variable for the username and give the user access to their logs that they have created.

    -The priority will be the log in, creation of observations by the user that go only in their collection, and being able to log all of their entries. Later I will want the user to be able to sort through their entries with different search parameters but for now they just need to be able to find what they have already written.

    -Today I was able to set up the two posts to create a new user and to check if a user exists. 

    -I set up the landing page ejs for the user when they sign in or sign up

    -I need to figure out how to allow the user to make post and get requests from the ejs that tie directly to their database collection. 



1/18/24

    -Today I finished the basic functionality of the site. the user can:
        Make a new account

        Sign in

        Make a new post

        View all of the posts they have made in the past

        Delete posts they have made

    the site can also prevent users from entering observations that don't contain a title or observation, it will prevernt duplicate users from being created, it will present the user the log in screen again upon entering incorrect credentials, it will prompt the user to use a password at least eight characters long.

    *** what do i want to do from here? I want to:

        create a drop down menu of all the users previously created categories so they can easily keep track of different plants or areas of a garden.

        i want to give the user the ability to enter search terms and filter out the results of their journal.

        i want to create a feature that will give the user a break down of their month upon the first successfull log in of the following month

        i need to work on the aesthetics of the site

        i want to compile a list of resources for users to use when they are trying to diagnose issues with their plants

        i would be interested in providing a list of seed vendors that i have personally used and enjoyed

        i would like to create a blog section for myself or certain users to post helpful tips and tricks

        i would like to create a reward system that gives users badges based on how many observations they have made and the longest streak of days theyve gone making observations



1/19/2024

    -I was able to successfully host the website on Render

    -I had encountered an issue where the server was not receiving the connection string in order to connect to mongodb. the solution was to add the secret file in the environments tab in render. this makes sense because without that file there is no way for mongodbclient to access the credentials. I was just unsure of how to give it the credentials in a secure way. there is documentation on the issue and i think i may have made it worse than it was but it was still a vague situation. I think the majority of the issue derived from my inexpreience.

    -that being solved i can now focus on the to do list that I described in the previous entry.

    -I also added logic that requires all usernames to be at least three characters long.



1/20/2024

    -I added styles to all the ejs files

    -I added a cute chipmunk pixel art

    -I made corrections to all of the copy and titles

    -I spent some time testing functionality and added a few media queries
    
    ***The next steps will be to add drop down menus in the designated areas of the code to allow the user to reuse categories they have created and to sort their journal based on category or date range.