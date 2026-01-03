/**
 * @param {number[]} prices
 * @return {number}
 */
 
// For getting the maximum profit on selling the stock we need to calculate the maximum profit at every index of the array. And for finding the max profit we need to get the min. price up until the traversed index, so that using the min price and current index we could find the max profit for current index and store it somewhere for comparing the max profit in future.

// From the above understanding we can observe that we need to keep the track of 2 things which are minValue of stock and maxProfit up until the traversed index. And if we keep on calculating these 2 things so at the end of the array iteration we would get the maxProfit which we can return .

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