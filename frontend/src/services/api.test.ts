import { afterEach, describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'
import { ApiError, getJson } from './api.ts'
import { getTournaments } from './tournaments.ts'

afterEach(() => mock.restoreAll())

describe('ASP.NET JSON transport', () => {
  it('uses the API prefix and forwards cancellation', async () => {
    const fetchMock = mock.method(globalThis, 'fetch', async () => Response.json([{ id: 'lol' }]))
    const controller = new AbortController()
    assert.deepEqual(await getJson('tournaments', controller.signal), [{ id: 'lol' }])
    assert.equal(fetchMock.mock.calls[0].arguments[0], '/api/tournaments')
    assert.equal(fetchMock.mock.calls[0].arguments[1]?.signal, controller.signal)
  })

  it('preserves ASP.NET Problem Details on a failed response', async () => {
    const problem = { title: 'Service unavailable', status: 503, detail: 'Try again later.' }
    mock.method(globalThis, 'fetch', async () => Response.json(problem, { status: 503 }))
    const error = await getJson('tournaments').catch(error => error)
    assert.ok(error instanceof ApiError)
    assert.equal(error.status, 503)
    assert.deepEqual(error.problem, problem)
  })

  it('handles non-JSON gateway errors', async () => {
    mock.method(globalThis, 'fetch', async () => new Response('Bad gateway', { status: 502 }))
    await assert.rejects(getJson('tournaments'), { status: 502 })
  })

  it('rejects unsafe registration destinations from the API', async () => {
    mock.method(globalThis, 'fetch', async () => Response.json([{
      id: 'lol', game: 'League of Legends', category: 'Main', date: null,
      imageUrl: null, registrationPath: 'https://unrelated.example/register',
    }]))
    await assert.rejects(getTournaments(), /invalid response/)
  })

  it('accepts the documented camelCase contract', async () => {
    const items = [{ id: 'lol', game: 'League of Legends', category: 'Main', date: null, imageUrl: null, registrationPath: '/register?game=lol' }]
    mock.method(globalThis, 'fetch', async () => Response.json(items))
    assert.deepEqual(await getTournaments(), items)
  })
})
