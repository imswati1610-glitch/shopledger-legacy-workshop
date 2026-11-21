var test = require('node:test');
var assert = require('node:assert/strict');

var inventory = require('../lib/inventory');

test('inventory allows selling exactly the remaining sellable quantity', function () {
  var products = [
    { id: 1, name: 'A2 Gir Cow Ghee 500ml', stock: 1, reserved: 0 },
    { id: 2, name: 'Byadgi Kashmiri Chilli Powder 500g', stock: 4, reserved: 3 }
  ];

  assert.deepEqual(inventory.check(products, [
    { id: 1, qty: 1 },
    { id: 2, qty: 1 }
  ]), { ok: true });
});

test('inventory release restores physical stock for cancelled order items', function () {
  var products = [{ id: 1, name: 'A2 Gir Cow Ghee 500ml', stock: 3, reserved: 0 }];
  var orderItems = [{ id: 1, qty: 2 }];

  inventory.release(products, orderItems);

  assert.equal(products[0].stock, 5);
  assert.equal(inventory.getSellableStock(products[0]), 5);
});
