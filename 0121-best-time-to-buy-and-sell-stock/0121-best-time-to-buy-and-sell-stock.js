/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let minVal = +Infinity, maxProfit = 0;
    for (let i = 0 ; i< prices.length; i++) {
        if (prices[i] < minVal) {
          minVal = prices[i];
        }
        if ((prices[i] - minVal) > maxProfit) {
          maxProfit = prices[i] - minVal;
        }
    }

    return maxProfit;
};