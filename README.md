# Michael Cairney JWD node-project
### A RESTful API that uses Node, Express and connects to a MongoDB database.

The API is for a "band finder" application where a user can sign up and login to their account and view/post ads that are either for bands seeking musicians or a musician seeking a band.
These ads inlcude details such as instruments played, instruments seeking, genres and general description.

To test the functionality click this link to a Postman public collection that contains the CRUD operations for the API
https://www.postman.com/aerospace-explorer-65602547/workspace/mcairney-jwd.

#### Example request body:
##### Sign up
```
{
    "username": "steve",
    "email": "test@123.com",
    "password": "password",
    "passwordConfirm": "password"
}
```
##### Login
```
{
    "email": "test@123.com",
    "password": "password"
}
```
After sending the login (or get all users) request, use the _id value in the response to fill in the body request for creating an ad below:
##### Create Ad
```
{
    "userId": "641833141454d47086e48fc7",
    "adType": "band",
    "name": "amazingBand",
    "instruments": ["Drummer", "Lead Guitar"],
    "seeking": ["Vocals"],
    "genres": ["Metal", "Rock", "Punk"],
    "description": "We are very good band please join us"
}
```
```
{
    "userId": "641833141454d47086e48fc7",
    "adType": "musician",
    "name": "steve",
    "instruments": ["Vocals"],
    "seeking": ["Vocals"],
    "genres": ["Metal"],
    "description": "I sing"
}
```

