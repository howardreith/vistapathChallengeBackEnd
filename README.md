# Vistapath Challenge Back End

Details concerning the project in general and the front end are available in the front end repo's
wiki, available here: [https://github.com/howardreith/vistapathChallengeFrontEnd](https://github.com/howardreith/vistapathChallengeFrontEnd)

## Instructions for running

1. Install and start an instance of mongodb on your local machine. The community edition is sufficient.
You can find instructions [here](https://www.mongodb.com/docs/manual/administration/install-community/). If you would 
like additional help, feel free to watch my video tutorial available [here](https://www.youtube.com/watch?v=2rPpG5hzZtw).
2. Create a .env file in the root directory with the following values:
```
MONGO_URI=[Your mongo URI, can be found by running "mongo" in your terminal, e.g. mongodb://127.0.0.1:27017]
FRONT_END_URL="http://localhost:3000"
AWS_BUCKET_NAME="vistapathchallenge"
AWS_ACCESS_KEY_ID=[I should have emailed this to you. Ask if you do not have it]
AWS_ACCESS_KEY_SECRET=[I should have emailed this to you. Ask if you do not have it]
```
You are of course welcome to create your own AWS S3 bucket and use your own ID and secret.
Instructions for doing so are available [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html).

If your front end is running on a port other than 3000, make sure to update your environment variable.

3. Install dependencies with `yarn install` or `npm install`.
4. Start the server with `yarn start` or `npm run start`.

## Instructions for testing

1. After installing dependencies, run tests with `yarn test` or `npm run test`.
