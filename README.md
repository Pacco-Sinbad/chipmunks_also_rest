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