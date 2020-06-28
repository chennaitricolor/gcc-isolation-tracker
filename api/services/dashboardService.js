const { quicksight } = require('../helpers/awsQuicksight');
const config = require('../config');

const getReport = async() => {
    try {
      const embed = await quicksight.getDashboardEmbedUrl(config.aws.quicksight.dashboard, function(err, res) {
        return res;          
      }).promise();
      return embed;
    } catch (e) {
      throw e;
    }
  };

  module.exports = {
    getReport
  };
  