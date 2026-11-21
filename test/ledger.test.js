var test = require('node:test');
var assert = require('node:assert/strict');

var ledger = require('../lib/ledger');

test('settlement form amount stored as text updates Khata totals numerically', function () {
  var db = {
    nextSettlementId: 1,
    customers: [{
      id: 1,
      name: 'Meera Joshi',
      openingBalance: 450,
      totalBilled: 1982.01,
      totalSettled: 1200
    }],
    settlements: []
  };

  var result = ledger.recordSettlement(db, 1, '500', 'upi', 'Counter payment');

  assert.equal(result.ok, true);
  assert.equal(result.settlement.amount, 500);
  assert.equal(result.customer.totalSettled, 1700);
  assert.equal(result.customer.balance, 732.01);
});
