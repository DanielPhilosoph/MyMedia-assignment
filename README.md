# MyMedia assignment

## Website Link

==> <a href="http://cicd-my-media-s3.s3-website.eu-west-2.amazonaws.com/" target="_blank">My Media Assignment Website</a> <==

## Preview

### Login Page
![phone](https://www.linkpicture.com/q/316cbed5-e9fe-4582-b9c3-e9afd1398422.jpg)

### Users Page
![phone](https://www.linkpicture.com/q/b92cee11-53f5-4a3f-ab37-2d699df116ea.jpg)

### User Page
![phone](https://www.linkpicture.com/q/99039919-65be-4f54-95e4-48b7b56b00e7.jpg)

## Backend

### Endpoints

#### Login
Allows to login to the system.
- [ ] POST /login 

Body to send
```js
{ email: "someEmail@gmail.com", password: "somePassword" }
```
Response 
```js
{
    user: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjExMWU5MjAxMzM3ZDRmMWU4MDY0N2YiLCJlbWFpbCI6ImRhbmllbHBoOUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzNTE1NjcsImV4cCI6MTY0NTM1NTE2N30.ESNCGY_r9_kZc4GNRt1D7S1nWpGxnqYDqF9MKknc_xk",
        "_id": "62111e9201337d4f1e80647f",
        "firstName": "daniel",
        "lastName": "philosph"
    },
    login: true
}
```

- - - -

#### Register
Register to the system, email must be unique.
- [ ] POST /register

Body to send
```js
{
    firstName: "daniel",
    lastName: "philosoph",
    email: "danielph9@gmail.com",
    password: "123456789"
}
```

Response
```js
{
    user: {
        firstName: "daniel",
        lastName: "philosoph",
        email: "danielph9@gmail.com",
        _id: "6212133cc7ff924493558d23",
        entries: []
    },
    registered: true
}
```

- - - -

#### Get User
Request for a specific user by id. Authorization is needed!
- [ ] GET /user/:id

Headers
```js
{ Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjExMWU5MjAxMzM3ZDRmMWU4MDY0N2YiLCJlbWFpbCI6ImRhbmllbHBoOUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzNTE1NjcsImV4cCI6MTY0NTM1NTE2N30.ESNCGY_r9_kZc4GNRt1D7S1nWpGxnqYDqF9MKknc_xk" }
```

Response
```js
{
    user: {
        _id: "6212133cc7ff924493558d23",
        firstName: "daniel",
        lastName: "philosoph",
        email: "danielph98@gmail.com",
        entries: []
    }
}
```

- - - - 

#### Get Users (with query)
Request for all users. Authorization is needed!
- [ ] GET /user/users

Request for all users who has the query string in their first or last name. Authorization is needed!
- [ ] GET /user/users?query=abc

Headers
```js
{ Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjExMWU5MjAxMzM3ZDRmMWU4MDY0N2YiLCJlbWFpbCI6ImRhbmllbHBoOUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzNTE1NjcsImV4cCI6MTY0NTM1NTE2N30.ESNCGY_r9_kZc4GNRt1D7S1nWpGxnqYDqF9MKknc_xk" }
```

Response
```js
{
    users: [
        {
            _id: "62111e9201337d4f1e80647f",
            firstName: "daniel",
            lastName: "philosph",
            email: "danielph9@gmail.com",
            entries: [
                {
                    loggingTime: "Sat Feb 19 2022 18:45:14 GMT+0200 (שעון ישראל (חורף))",
                    _id: "62111e9a01337d4f1e806483"
                },                
            ]
        },
        {
            _id: "6212133cc7ff924493558d23",
            firstName: "daniel2",
            lastName: "philosoph2",
            email: "danielph98@gmail.com",
            entries: []
        }
    ]
}
```





