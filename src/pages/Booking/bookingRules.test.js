// Kør med: node --test src/pages/Booking/bookingRules.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slotsFor, validate } from './bookingRules.js'

const valid = { name: 'Anna Jensen', email: 'anna@mail.dk', date: '2099-01-06', time: '17:00', guests: '4' } // tirsdag

test('tider følger åbningstiden for dagen', () => {
  assert.deepEqual(slotsFor('2099-01-05'), []) // mandag: lukket
  assert.equal(slotsFor('2099-01-06').at(0), '17:00') // tirsdag 17–22
  assert.equal(slotsFor('2099-01-06').at(-1), '21:00')
  assert.equal(slotsFor('2099-01-04').at(0), '12:00') // søndag 12–20
})

test('gyldig booking giver ingen fejl', () => {
  assert.deepEqual(validate(valid), {})
})

test('ugyldige felter giver fejl', () => {
  const errors = validate({ name: 'A', email: 'nej', date: '2000-01-01', time: '', guests: '13' })
  assert.deepEqual(Object.keys(errors).sort(), ['date', 'email', 'guests', 'name', 'time'])
  assert.ok(validate({ ...valid, date: '2099-01-05' }).date) // lukket mandag
  assert.ok(validate({ ...valid, date: '2099-01-04', time: '21:00' }).time) // søndag lukker 20
})
