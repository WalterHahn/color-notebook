import store from '../src/store';

test('store.set && store.get', () => {
  expect(store.get('test')).toBe(null);
  store.set('test', 1);
  expect(store.get('test')).toBe("1");
});;

test('store.clr && store.del', () => {
  store.clr();
  expect(store.get('test')).toBe(null);
  store.set('test', 1);
  expect(store.get('test')).toBe("1");
  store.del('test');
  expect(store.get('test')).toBe(null);
});
