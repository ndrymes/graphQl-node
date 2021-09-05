

# Codelitt Test

The task is to build a Graphql API to perfom a CRUD operation on users profile based on some requirements which are.

1)A member has a name and a type the late one can be an employee or a contractor.
2) A contractor should have the duration of a contract which should be  an integer.
3) An employee, should have a  role, for instance: Software Engineer, Project Manager and so on.
4) A member can be tagged, for instance: C#, Angular, General Frontend, Seasoned Leader and so on. (Tags will likely be used as filters later)

# Get Started

- Clone the repository using git clone https://gitlab.com/codelittinc/node-graphql-interview-project-sunmonu-oluwole.git
- Run `npm i` or `npm install` to install all app dependencies
- Make a copy of the .env.sample file and rename to .env
- Start the app using
  - `npm run dev` for development
  - `npm run start` for production

# Demo

The app is hosted on heroku. The base url is <a href="https://blooming-springs-54358.herokuapp.com">https://blooming-springs-54358.herokuapp.com</a>.
The default endpoint is an health check endpoint that returns a success response.

## API

There is only a single api available, it can be used to retrieve records over the graphql network

| Parameter   | Description                                 |
| ----------- | ------------------------------------------- |
| Http Method | GET                                         |
| Base Url    | https://blooming-springs-54358.herokuapp.com|
| Path        | /graphql                                    |

## MUTATIONS

###  Sample Request Parameters

### signUp 

```
mutation{
  signUp(email:"sunm@yahoo.com",password:"123456", role:"software", userType:"CONTRACTOR" ){
    role
  }
}
```

### Sample Success Response Parameters

```
    {
  "data": {
    "signUp": {
      "role": "software",
      "userType": "CONTRACTOR"
    }
  }
}
```

### Sample Error Response Parameters

```
    {
  "errors": [
    {
      "message": {
        "error": "user already exist"
      }
    }
  ],
  "data": {
    "signUp": null
  }
}
```

## QUERIES

### Sample Request Parameters

### User Profile

```
 query{
   getUser{
     role
  }
 }

```

### Sample Success Response Parameters

```
    {
  "data": {
    "getUser": {
      "role": "software",
    }
  }
}
```

### Sample Error Response Parameters

```
    {
  "errors": [
    {
      "message": {
        "error": "Not Authorized"
      }
    }
  ],
  "data": {
    "getUser": null
  }
}
```

# Project Structure

![file structure](https://i.ibb.co/4MHsBCk/Screenshot-2021-09-05-at-16-26-58.png)

# Libraries Used

- Jest - For running unit tests
- Express - Popular framework with a robust set of features for running apps
- Dotenv - For using environment variables in development
- Joi - For validating data
- Mongoose - ODM for mongodb that makes maning the database much easier
- Express-graphql - For serving request leveraging on express and graphql

# Todo

I had a lot of fun building this but there are some improvements I can still make:

- More tests, especially integration tests, unit tests for the services and api tests using super test.
- Use a DTO object to handle transfer of data from the resolver to the service layer, this will help keep data consistent even when data names change
- Add push pre-hooks that runs eslint and prettifier before every push
- Add a dependency injection library like awilix to handle injection of dependencies
- Include a makefile to ease the execution of some common tasks
- Improve on graphql error handling

# Testing

- To run the tests, simply type `npm test`
- We can also get code coverage by `npm run coverage`

Thank you 👍
