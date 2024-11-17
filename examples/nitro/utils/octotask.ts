import { Octotask } from 'octotask'
import app from '../octotask-app/index.js'

let octotask: Octotask

export function useOctotask(): Octotask {
  if (!octotask) {
    octotask = new Octotask({
      appId: process.env.APP_ID,
      privateKey: process.env.PRIVATE_KEY,
      secret: process.env.WEBHOOK_SECRET,
    })
    octotask.load(app)
  }
  return octotask
}
