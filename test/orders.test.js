var test = require('node:test');
var assert = require('node:assert/strict');

var orders = require('../lib/orders');

function makeOrder(id, date) {
  return { id: id, date: date, status: 'completed' };
}

test('order history sorts newest dates first chronologically', function () {
  var db = { orders: [
    makeOrder(1004, '30/01/2022'),
    makeOrder(1001, '28/12/2021'),
    makeOrder(1008, '15/03/2022'),
    makeOrder(1007, '04/03/2022')
  ] };

  assert.deepEqual(orders.list(db).map(function (order) { return order.id; }), [1008, 1007, 1004, 1001]);
});

test('order date filters include only dates inside the selected range', function () {
  var db = { orders: [
    makeOrder(1004, '30/01/2022'),
    makeOrder(1001, '28/12/2021'),
    makeOrder(1008, '15/03/2022'),
    makeOrder(1007, '04/03/2022')
  ] };

  assert.deepEqual(orders.list(db, { from: '2022-01-01', to: '2022-01-31' }).map(function (order) {
    return order.id;
  }), [1004]);
});
