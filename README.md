# SOLID studies in Node.js
API project built with Node.js and Fastify with the purpose of study and review SOLID, unit testing, e2e testing and TDD concepts.

## Author

- [@lucasyule2212 - GitHub](https://www.github.com/lucasyule2212)
- [lucasyulerocha - LinkedIn](https://www.linkedin.com/in/lucasyulerocha/)

## Used Techs
**Core techs**: Node.js & Typescript.

**Framework**: Fastify.

**Database**: PostgreSQL.

**Database ORM**: PrismaORM.

**E2E/Unit Testing**: Vitest.

**E2E API Mock**: Supertest.

**Others/Utilities**: Zod, DayJS.

**CI**: Github Actions.


## Features -> Gympass Style API
### FR - Functional Requirements

- [x] It must be possible to sign-up a new user
- [x] It must be possible to sign-in a user
- [x] It must be possible to get signed-in user information
- [x] It must be possible to check-in a signed-in user in a gym
- [x] It must be possible to get the number of check-ins of a signed-in user
- [x] It must be possible to get signed-in user check-in history
- [x] It must be possible to get signed-in user closests gyms (2km radius)
- [x] It must be possible the signed-in user to search for gyms by name
- [x] It must be possible to validate the signed-in user check-in
- [x] It must be possible to sign-up a new gym

### BR - Business Requirements

- [x] User should not be able to sign-up with an already registered email
- [x] User should not be able to perform 2 check-ins in the same day
- [x] User should not be able to check-in in a gym if it is not close (100m) to the gym
- [x] User check-in can only be validated within 20 minutes
- [x] User check-in can only be validated by an administrator
- [x] Gym should only be able to be signed-up by an administrator

### NFR - Non-Functional Requirements
- [x] User password must be encrypted
- [x] User password must be in a PostgreSQL database
- [x] All listed data must be paginated with a limit of 20 items per page
- [x] User must be identified by a JWT token
