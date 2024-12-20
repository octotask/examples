const arc = require('@architect/functions')
const { createOctotask } = require('octotask')

const app = require('./app')

const octotask = createOctotask()

octotask.load(app)

exports.handler = async function post(req) {
  const signature =
    req.headers['x-hub-signature-256'] ||
    req.headers['X-Hub-Signature-256'] ||
    req.headers['x-hub-signature'] ||
    req.headers['X-Hub-Signature']
  const name = req.headers['x-github-event'] || req.headers['X-GitHub-Event']
  const id =
    req.headers['x-github-delivery'] || req.headers['X-GitHub-Delivery']

  try {
    await octotask.webhooks.verifyAndReceive({
      id,
      name,
      signature,
      payload: arc.http.helpers.bodyParser(req),
    })

    return {
      statusCode: 200,
      body: 'ok',
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message,
    }
  }
}
