# solid-studies-node
API project build with Node.js with the purpose of study and review SOLID concepts

# Gympass Style app
## FR - Functional Requirements

- [x] It must be possible to sign-up a new user
- [x] It must be possible to sign-in a user
- [x] It must be possible to get signed-in user information
- [x] It must be possible to check-in a signed-in user in a gym
- [ ] It must be possible to get the number of check-ins of a signed-in user
- [ ] It must be possible to get signed-in user check-in history
- [ ] It must be possible to get signed-in user closests gyms
- [ ] It must be possible the signed-in user to search for gyms by name
- [ ] It must be possible to validate the signed-in user check-in
- [ ] It must be possible to sign-up a new gym

## BR - Business Requirements

- [x] User should not be able to sign-up with an already registered email
- [x] User should not be able to perform 2 check-ins in the same day
- [x] User should not be able to check-in in a gym if it is not close (100m) to the gym
- [ ] User check-in can only be validated within 20 minutes
- [ ] User check-in can only be validated by an administrator
- [ ] Gym should only be able to be signed-up by an administrator

## NFR - Non-Functional Requirements
- [x] User password must be encrypted
- [x] User password must be in a PostgreSQL database
- [ ] All listed data must be paginated with a limit of 20 items per page
- [ ] User must be identified by a JWT token
