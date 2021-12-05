# Tally-Hackathon-Submission - A One-Stop Platform to Generate and Manage Short URLs

## Deployment
- Our website is live @ https://tallyurl.herokuapp.com/


## About Our Submission
- Our submission involves the implementation of a one-stop platform that handles a URL Shortening service in the form of a web app. 
- The platform enables customization of the shortened URL in the form of multiple options provided to the end user from which he can choose from. 
- The core algorithm behind the URL shortening has been developed using Base 62 encryption technique which involves generating the unique Base-62 hash for the corresponding long url along with optimizations to be scaled while maintaining its core efficiency. 
- The platform is able to maintain high look-up and write times using a synchronous counter mechanism, which enables us to generate a unique short URL for each corresponding long URL, hence ensuring that there are always no collisions in the database. 
- The user is also provided with a dashboard to manage all the short links that he has generated using the platform, and view detailed statistics on each of the links such as the geographic locations from which the website has been accessed from, number of clicks, etc. 
- Secure authentication using SHA-256 algorithm to verify the user credentials.

## Tech Stack
### Frontend
- React JS
- HTML, CSS, Javascript
- Bootstrap, React-bootstrap, Google-Fonts

### Backend
- Node JS
- Express Server
- MongoDB Atlas (Cloud NoSQL Database)

## Business Value
- Our solution also aims to bring business value by providing a premium service which enables the user to go for extra customization options and view detailed statistics on the generated short URL. 
- Our platform also enables the user to directly share the generated short URL through a single click onto multiple platforms such as Facebook, Instagram, Email, Whatsapp, etc.

## More Info
For more info, checkout the powerpoint presentation, we have covered almost everything there!
