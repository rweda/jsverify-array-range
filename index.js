var jsc = require("jsverify");

/**
 * Generate an array with size bounds.
 * @param {Abstract<T>} gen a generator for the entries inside the array.
 * @param {Number} [min=0] the smallest valid length of the generated array.
 * @param {Number} [max] the largest valid length of the generated array.
 * @return {Abstract<Array<T>>}
 * @todo Have shrink obey 'min'
*/
function arrayRange(gen, min, max) {
  if(min && !max) { max = min; min = null; }
  if(!min) { min = 0; }
  return jsc.bless({
    generator: function(size) {
      var arrsize = jsc.random(min, max || size);
      var arr = new Array(arrsize);
      for(var i = 0; i < arrsize; i++) {
        arr[i] = gen(size);
      }
      return arr;
    },
    shrink: jsc.shrink.array,
  });
}

module.exports = arrayRange;
