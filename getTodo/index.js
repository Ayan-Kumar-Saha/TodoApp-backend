const database = require('../lib/database');

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const client = await database.getClient();

  const result = await client.db("todo").collection("task").find({}).toArray();

  context.res = {
    body: {
      success: true,
      data: result
    },
  };
};
