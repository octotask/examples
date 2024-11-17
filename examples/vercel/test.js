const { suite } = require('uvu')
const assert = require('uvu/assert')

const nock = require('nock')
nock.disableNetConnect()

const { Octotask, OctotaskOctokit } = require('octotask')

const app = require('./app')

/** @type {import('octotask').Octotask */
let octotask
const test = suite('app')
test.before.each(() => {
  octotask = new Octotask({
    // simple authentication as alternative to appId/privateKey
    githubToken: 'test',
    // disable logs
    logLevel: 'warn',
    // disable request throttling and retries
    Octokit: OctotaskOctokit.defaults({
      throttle: { enabled: false },
      retry: { enabled: false },
    }),
  })
  octotask.load(app)
})

test('recieves issues.opened event', async function () {
  const mock = nock('https://api.github.com')
    // create new check run
    .post('/repos/octotask/example-vercel/issues/1/comments', (requestBody) => {
      assert.equal(requestBody, { body: 'Hello, World!' })

      return true
    })
    .reply(201, {})

  await octotask.receive({
    name: 'issues',
    id: '1',
    payload: {
      action: 'opened',
      repository: {
        owner: {
          login: 'octotask',
        },
        name: 'example-vercel',
      },
      issue: {
        number: 1,
      },
    },
  })

  assert.equal(mock.activeMocks(), [])
})

test.run()
