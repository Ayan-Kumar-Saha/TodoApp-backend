const database = require('../lib/database');
const { raiseError } = require('../lib/utils');

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let payload = req.body;

  if(!payload.hasOwnProperty('taskId')) {
      raiseError(context, 'TaskId missing');
      return;
  }

  const client = await database.getClient();

  const result = await client.db("todo").collection("task")
  .updateOne(
      { taskId: payload.taskId}, 
      {
          $set: {
              isCompleted: payload.isCompleted
          }
      }
    )

  context.res = {
    body: {
      success: true,
      data: result
    },
  };
};