const { createNodeMiddleware, createOctotask } = require('octotask')

const app = require('../../../app')
const octotask = createOctotask()

module.exports = createNodeMiddleware(app, {
  octotask,
  webhooksPath: '/api/github/webhooks',
})
