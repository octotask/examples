import { beforeEach, test } from 'node:test'
import assert from 'node:assert'

import nock from 'nock'
nock.disableNetConnect()

// disable Octotask logs
process.env.LOG_LEVEL = 'fatal'
import { Octotask, OctotaskOctokit } from 'octotask'

import app from '../app.js'

/** @type {import('octotask').Octotask */
let octotask
beforeEach(() => {
  octotask = new Octotask({
    id: 1,
    githubToken: 'test',
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
    .post(
      '/repos/octotask/example-github-action/issues/1/comments',
      (requestBody) => {
        assert.deepStrictEqual(requestBody, { body: 'Hello, World!' })

        return true
      }
    )
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
        name: 'example-github-action',
      },
      issue: {
        number: 1,
      },
    },
  })

  assert.deepStrictEqual(mock.activeMocks(), [])
})
