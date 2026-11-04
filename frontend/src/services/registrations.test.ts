import { afterEach, describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'
import { buildRegistrationPayload, createRegistration } from './registrations.ts'
import { postJson } from './api.ts'

afterEach(() => mock.restoreAll())

describe('registration integration', () => {
  it('builds a minimal payload for a standard tournament', () => {
    const data = new FormData()
    data.set('name', ' Test Player ')
    data.set('email', ' player@example.com ')
    data.set('phone', 'unused')
    assert.deepEqual(buildRegistrationPayload(data, 'lol'), {
      tournamentId: 'lol', fullName: 'Test Player', email: 'player@example.com',
    })
  })

  it('serializes all five Valorant players and captain fields', () => {
    const data = new FormData()
    for (const [key, value] of Object.entries({name: 'Captain', email: 'captain@example.com', age: '20', phone: '+37060000000', highestRank: 'Diamond', currentRank: 'Platinum', challengermodeUsername: 'captain', discordUsername: 'captain123'})) data.set(key,value)
    for (let player = 1; player <= 5; player++) data.set(`player${player}RiotId`, ` Player${player}#1234 `)
    const payload = buildRegistrationPayload(data, 'valorant')
    assert.equal(payload.age, 20)
    assert.deepEqual(payload.riotIds, ['Player1#1234', 'Player2#1234', 'Player3#1234', 'Player4#1234', 'Player5#1234'])
    assert.equal(payload.discordUsername, 'captain123')
    assert.equal(payload.challengermodeUsername, 'captain')
  })

  it('does not send data while registration is disabled', async () => {
    const transport = mock.method(globalThis, 'fetch', async () => Response.json({}))
    await assert.rejects(createRegistration({tournamentId: 'tft', fullName: 'Player', email: 'player@example.com'}), /not open/)
    assert.equal(transport.mock.callCount(), 0)
  })

  it('sends JSON to the ASP.NET registration endpoint', async () => {
    const transport = mock.method(globalThis, 'fetch', async () => Response.json({ id: 'test-id', tournamentId: 'tft' }, {status: 201}))
    const payload = { tournamentId: 'tft', fullName: 'Player', email: 'player@example.com' }
    assert.deepEqual(await postJson('registrations', payload), { id: 'test-id', tournamentId: 'tft' })
    const [url, options] = transport.mock.calls[0].arguments
    assert.equal(url, '/api/registrations')
    assert.equal(options?.method, 'POST')
    assert.deepEqual(JSON.parse(String(options?.body)), payload)
  })
})
