/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {

  let minVal = +Infinity,   // variable for tracking the minValue of stock
     maxProfit = 0;         // variable for tracking the maxProfit
    for (let i = 0 ; i< prices.length; i++) {
      // Checking the current price of the stock if it is lesser than the price up until now then upating it with new minimum value
        if (prices[i] < minVal) {
          minVal = prices[i];
        }
        // Calculating the profit for the current index and comparing it with the maxProfit which we have calculated up until now. If current profit is more than the previous profit value then upating the maxProfit variable
        if ((prices[i] - minVal) > maxProfit) {
          maxProfit = prices[i] - minVal;
        }
    }

    return maxProfit;
};