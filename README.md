# Factorial technical challenge

The repository contains both frontend and backend (server) folders. To run them, do the following in separate terminal sessions:

## How to run?

### Frontend

1. `cd frontend`
2. `yarn install`
3. `yarn dev`

### Backend

1. `cd server`
2. `yarn install`
3. `yarn start`

The backend uses nodejs and express framework, and uses postgres database engine with Prisma as the ORM. To set it up locally, please make sure you have postgres installed.

You can also seed the database by running `yarn seed` command. This should generate some data for you.

## Challenges

1. A technical challenge was more on figuring out which database to use and I thought to give Prisma a try for an ORM that supports typescript.

2. Another challenge I found was understanding the task and trying to set a behaviour of creating metrics with time intervals that will generate a more meaningful visualization of them.

## Tradeoffs

1. Due to time limitation, I did not add any unit tests to the application.

2. Since the backend is simple, I left the implementation in the root file instead of structuring it by any architecture.
