# Parks Pass
## Introduction
Parks Pass allows its user to search for national park site and camping data and add parks to their virtual passport.
## Landing Page
![Image of Landing](https://i.imgur.com/Qzi94m9.png)
## Technology
* React
* Next.js
* Chakra UI
## Backend Repository
https://github.com/taylorschmidt/Parks-Pass-BackEnd
## Set-Up
* fork and clone repo
* npm i
## User Stories
* As a user, I should be able to sign up as a new user and log in
* As a user, I should be able to see the front page with the title of the site and about on the top left corner with the login/signup on the top right corner with a get started button
* As a user, I should be able to click the browse parks button which redirects me to a search page when I am not logged in
* As a user, I should be able to enter a search term which then populates the related national parks when I am not logged in
* As a user, I should be able to view more information about a particular park and its camping data
* As a user, I should not be able to add a park to my passport unless I am logged in
* As a user, I should be able to click on my profile and view my profile and passport
* As a user, I should be able to delete parks from my passport
* As a user, I should be able to update my username
## Creation Process
* Familiarization with National Parks API
* Developed user stories and wireframes.
* Created RESTful routes in the backend that allow for the manipulation of database models.
* Developed React components with Next.js and Chakra to match wireframes and connect to the database models.
#### ERD
![Image of ERD](https://i.imgur.com/D2r7M2t.png)
#### Wireframes
##### Search Page
![Image of Search](https://i.imgur.com/lS5upM9.png)
##### Park Information
![Image of Info](https://i.imgur.com/NLKao7U.png)
## Challenges
* Utilising Axios to connect to backend routes.
* Deploying with Surge and editing unrecognized routes.
* Learning best user authentication methods to store session data and not conflict with Flask's flask-login.
## Future Goals
* Allow users to leave park reviews and tips.
* Input best hiking trails in each park.
* Have visited locations leave a virtual stamp on the user's passport.
