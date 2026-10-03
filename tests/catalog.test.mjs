import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyState, restoreFilters, catalogRoute, buildRequest, heightLabel } from '../src/data/catalog.ts';

test('dance categories map to 8, 9 and 10 inches; Demonia stays numeric', () => {
  assert.match(heightLabel('8'), /Тройки.*8″/);
  assert.match(heightLabel('9'), /Четвёрки.*9″/);
  assert.match(heightLabel('10'), /Пятёрки.*10″/);
  assert.doesNotMatch(heightLabel('8', 'demonia'), /Тройки/);
});
test('Pleaser combines height and exact type instead of losing type', () => {
  const state = { ...emptyState(), type: 'thigh-high', height: '8', color: 'black', material: 'patent', size: '8', fit: 'wide' };
  const route = catalogRoute('pleaser', state);
  const url = new URL(route.url);
  assert.equal(url.pathname, '/collections/8-inch-collection');
  assert.equal(url.searchParams.get('filter.p.m.pleasershoes.style'), 'Boots - Thigh High');
  assert.equal(url.searchParams.get('filter.p.m.pleasershoes.color_filter'), 'Black');
  assert.equal(url.searchParams.get('filter.p.m.pleasershoes.material'), 'Patent');
  assert.deepEqual(route.pending, ['size', 'fit']);
});
test('Hella correct style routes and unsupported height remain explicit', () => {
  const state = { ...emptyState(), type: 'sandals', height: '10' };
  const route = catalogRoute('hella', state);
  assert.equal(new URL(route.url).pathname, '/collections/stilettos');
  assert.deepEqual(route.pending, ['height']);
  assert.equal(new URL(catalogRoute('hella', { ...state, type: 'thigh-high' }).url).pathname, '/collections/thigh-highs');
  const combined = catalogRoute('hella', { ...state, height: '8' });
  assert.equal(new URL(combined.url).searchParams.get('filter.p.tag'), '8inch');
  assert.deepEqual(combined.pending, []);
});
test('Demonia uses exact type collections without silently applying height', () => {
  const route = catalogRoute('demonia', { ...emptyState(), type: 'ankle-boots', height: '8' });
  assert.equal(new URL(route.url).pathname, '/collections/ankle-high-boots');
  assert.deepEqual(route.applied, ['type']);
  assert.deepEqual(route.pending, ['height']);
});
test('ambiguous materials and colors remain manager wishes', () => {
  const route = catalogRoute('pleaser', { ...emptyState(), color: 'red', material: 'glitter' });
  assert.deepEqual(route.applied, []);
  assert.deepEqual(route.pending, ['color', 'material']);
});
test('URL restore ignores unknown keys, private fields and invalid values', () => {
  const restored = restoreFilters(new URLSearchParams('brand=invalid&height=9&size=999&color=black&city=private&__proto__=bad&fit=constructor'));
  assert.deepEqual(restored, { ...emptyState(), height: '9', color: 'black' });
});
test('request retains wishes unsupported by catalog and optional details', () => {
  const state = { ...emptyState(), brand: 'hella', height: '10', size: 'help', color: 'other' };
  const request = buildRequest(state, { foot: '24,5', city: 'Москва', model: 'MODEL-1', comment: '<script>pink</script>' });
  assert.match(request, /Пятёрки.*10″/);
  assert.match(request, /Не знаю размер/);
  assert.match(request, /24,5/);
  assert.match(request, /Москва/);
  assert.match(request, /MODEL-1/);
  assert.match(request, /<script>pink<\/script>/);
});
