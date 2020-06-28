const config = require('../config');
const AWS = require('aws-sdk');
const Quicksight = require('aws-sdk/clients/quicksight');

const awsConfig = config.aws;

AWS.config.credentials = new AWS.CognitoIdentityCredentials(awsConfig.config.credentials);
AWS.config.region = awsConfig.config.region;

const quicksight = new Quicksight({
    region: awsConfig.quicksight.region,
});

module.exports = {
    quicksight,
};
