import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateDish, toFormData } from './dishRules.js'

const valid = { title: 'Røget laks', description: 'Let røget laks.', category: 'starter', price: '149', isSignature: true, image: null }

test('gyldig ret giver ingen fejl', () => {
  assert.deepEqual(validateDish(valid), {})
})

test('ugyldige felter giver fejl', () => {
  const errors = validateDish({ title: 'A', description: 'kort', category: '', price: '-5', image: { type: 'text/plain' } })
  assert.deepEqual(Object.keys(errors).sort(), ['category', 'description', 'image', 'price', 'title'])
  assert.ok(validateDish({ ...valid, price: '' }).price)
  assert.ok(validateDish({ ...valid, price: 'abc' }).price)
})

test('toFormData sender id kun ved redigering', () => {
  assert.equal(toFormData(valid).get('id'), null)
  const fd = toFormData(valid, 'abc123')
  assert.equal(fd.get('id'), 'abc123')
  assert.equal(fd.get('isSignature'), 'true')
  assert.equal(fd.get('price'), '149')
})
