const chai = require("chai");
const should = chai.should();
const jsc = require("jsverify");
const arrayRange = require("../index");

/**
 * Runs JSVerify on an arbirary array generator, and produce statistics of the run results.
 * @param {Arbitrary<Array>} arb the arbitrary to use to produce test results.
 * @return {Object} `{stats, items}`
*/
function getData(arb) {
  let stats = {
    min: null,
    max: null,
    total: null,
  };
  let items = [];

  jsc.check(jsc.forall(arb, function(arr) {
    if(!items[arr.length]) {
      items[arr.length] = { count: 0 }
    }
    ++items[arr.length].count;
    return true;
  }));

  for(var i = 0; i<items.length; i++) {
    if(!items[i] || !items[i].count || items[i].count < 1) { continue; }
    ++stats.total;
    if(!stats.min || i < stats.min) { stats.min = i; }
    if(!stats.max || i > stats.max) { stats.max = i; }
  }
  return {stats: stats, items: items};
}

describe("arrayRange Usage", function() {

  describe("arrayRange(gen)", function() {

    let stats = null;
    let items = null;

    before(function() {
      let testData = getData(arrayRange(jsc.number));
      stats = testData.stats;
      items = testData.items;
    });

    it("produces several different array lengths", function() {
      stats.total.should.be.above(3);
    });

    it("produces varying array lengths", function() {
      (stats.max - stats.min).should.be.above(5);
    });

  });

  describe("arrayRange(gen, max)", function() {

    let max = 3;
    let stats = null;
    let items = null;

    before(function() {
      let testData = getData(arrayRange(jsc.number, max));
      stats = testData.stats;
      items = testData.items;
    });

    it("produces several different array lengths", function() {
      stats.total.should.be.above(3);
    });

    it("shouldn't produce arrays with more than "+max+" entries", function() {
      stats.max.should.be.at.most(max);
    });

    it("should produce arrays with 0 entries", function() {
      items[0].count.should.be.above(5);
    })

    it("should produce arrays with "+max+" entries", function() {
      items[max].count.should.be.above(10);
    });

  });

  describe("arrayRange(gen, min, max)", function() {

    let min = 5;
    let max = 8;
    let stats = null;
    let items = null;

    before(function() {
      let testData = getData(arrayRange(jsc.number, min, max));
      stats = testData.stats;
      items = testData.items;
    });

    it("produces several different array lengths", function() {
      stats.total.should.be.above(3);
    });

    it("shouldn't produce arrays with more than "+min+" entries", function() {
      stats.min.should.be.at.least(min);
    })

    it("shouldn't produce arrays with more than "+max+" entries", function() {
      stats.max.should.be.at.most(max);
    });

    it("should produce arrays with "+min+" entries", function() {
      items[min].count.should.be.above(10);
    })

    it("should produce arrays with "+max+" entries", function() {
      items[max].count.should.be.above(10);
    });

  });

});
