
# FreeCodeCamp
## APIs and Microservices projects

All projects that are part of the "APIs and Microservices" certification.

A runnable REPL can be found [here](https://replit.com/@DamianHaziak/FCC-APIs-and-Microservices-Projects).

Timestamp: 
* `GET /api/timestamp/`

Request Header Parser: 
* `GET api/whoami`

URL Shortener: 
* `POST api/shorturl/new`: to create new short URLs
* `POST api/shorturl/<number>`: to access the shortened URLs

Exercise tracker:
* `POST api/exercise/new-user`: create a new user, returns an ID
* `GET api/exercise/users`: get all users
* `POST api/exercise/add`: add a new exercise, requires a valid `userId`
* `GET api/exercise/log`: get a log of all exercises for a given `userId`, can also supply a `from` and `to` date, and a `limit` to limit return size
