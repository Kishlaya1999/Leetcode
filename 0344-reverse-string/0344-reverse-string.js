/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {

    function swap (str, x, y) {
      let temp = str[x];
      str[x] = str[y];
      str[y] = temp;
    }

    for(let i = 0, j = s.length - 1; i < s.length/2 ; i++, j-- ){
      swap(s, i, j);
    }
};