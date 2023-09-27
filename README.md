


# NoSQL: Social Network API

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Mock Up](#mock-up)
- [Getting Started](#getting-started)
- [Models](#models)
- [API Routes](#api-routes)
- [Liscense](#Liscense)
- [author](#Author)

## Description

MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. Over the last part of this course, you'll use several of the technologies that social networking platforms use in their full-stack applications. Because the foundation of these applications is data, it's important that you understand how to build and structure the API first.

 build an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. You'll use Express.js for routing, a MongoDB database, and the Mongoose ODM. In addition to using the [Express.js](https://www.npmjs.com/package/express) and [Mongoose](https://www.npmjs.com/package/mongoose) packages, you may also optionally use a JavaScript date library of your choice or the native JavaScript `Date` object to format timestamps.

No seed data is provided, so you'll need to create your own data using Insomnia after you've created your API.

Because this application won't be deployed, you'll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You'll need to submit a link to the video and add it to the README of your project.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user's friend list
```

## Mock Up



![Demo that shows all routes for a user/thoughts/reactions being tested in Insomnia.](https://drive.google.com/file/d/1K7AW-xhJn8mIvK7eKb4KE-e2o8WoifVd/view) 

In addition to this, your walkthrough video should show the POST, PUT, and DELETE routes for thoughts being tested in Insomnia and the POST and DELETE routes for reactions to thoughts.

## Getting Started

Before you begin, ensure that you have MongoDB installed on your machine. Follow the [MongoDB installation guide on The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb) to install MongoDB locally.

### Guidelines to Set Up Models and API Routes

### Models

**User**:

- `username`
  - String
  - Unique
  - Required
  - Trimmed

- `email`
  - String
  - Required
  - Unique
  - Must match a valid email address (look into Mongoose's matching validation)

- `thoughts`
  - Array of `_id` values referencing the `Thought` model

- `friends`
  - Array of `_id` values referencing the `User` model (self-reference)

**Thought**:

- `thoughtText`
  - String
  - Required
  - Must be between 1 and 280 characters

- `createdAt`
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

- `username` (The user that created this thought)
  - String
  - Required

- `reactions` (These are like replies)
  - Array of nested documents created with the `reactionSchema`

**Reaction** (SCHEMA ONLY)

- `reactionId`
  - Use Mongoose's ObjectId data type
  - Default value is set to a new ObjectId

- `reactionBody`
  - String
  - Required
  - 280 character maximum

- `username`
  - String
  - Required

- `createdAt`
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

### API Routes

**`/api/users`**

- `GET` all users

- `GET` a single user by its `_id` and populated thought and friend data

- `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

- `PUT` to update a user by its `_id`

- `DELETE` to remove a user by its `_id`

**BONUS**: Remove a user's associated thoughts when deleted.

**`/api/users/:userId/friends/:friendId`**

- `POST` to add a new friend to a user's friend list

- `DELETE` to remove a friend from a user's friend list

**`/api/thoughts`**

- `GET` to get all thoughts

- `GET` to get a single thought by its `_id`

- `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- `PUT` to update a thought by its `_id`

- `DELETE` to remove a thought by its `_id`

**`/api/thoughts/:

## License
This project is licensed under the MIT License.

## Author
Tyler Webster

## github & video
https://github.com/Tyythedeveloper33

![click to watch functionality](https://drive.google.com/file/d/1K7AW-xhJn8mIvK7eKb4KE-e2o8WoifVd/view) 
