# volunteer-rocks

API: {
  googleAPI: {
    mapsJavascript: https://developers.google.com/maps/documentation/javascript/tutorial
    geocoding: https://developers.google.com/maps/documentation/geocoding/start
    places: https://developers.google.com/places/web-service/autocomplete 
    oAuth: https://developers.google.com/identity/protocols/OAuth2, http://www.passportjs.org/docs/google/ 
  }
  zipCodeAPI: https://www.zipcodeapi.com/
}

SETUP:

1. Have one team member get a google API key
  a. Enter your google api key in GAPI_KEY @ ./config.js (Need to create config.js @ root)
  b. Enter google api key in key @ ./database/saveToDbs.js
2. Have each team member get a zipCode API key (Only 50 calls/hr is free per key)
  a. Enter zipcode api key in zipApiUrl @ ./server/index.js
  `https://www.zipcodeapi.com/rest/<<< API KEY GOES HERE >>>/radius.json/<<< ZIP CODE TO SEARCH >>>/<<< Distance >>>/mile`
    i. <<< Distance >>> is the number of miles you want to search
    ii. The api call returns all the zip codes in the radius of the distance entered.

NOTES:

Filter.jsx is not complete. It's been commented out in OpsList.
We originally had plans to filter by cause, distance, and date.
Also had plans to store time of opportunities.
Careful about exposing your google api key. Create restrictions.
Passport is an oAuth middleware for express. http://www.passportjs.org/docs/google/ 
Reactstrap is a library for bootstrap https://reactstrap.github.io/components/alerts/
Don't try to generate a ton of zipcode api keys with spoofed emails. They will IP ban you.