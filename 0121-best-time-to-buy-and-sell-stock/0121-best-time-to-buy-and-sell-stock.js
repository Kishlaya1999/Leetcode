/**
 * @param {number[]} prices
 * @return {number}
 */

/*
Approach: Single Pass with Min Price Tracking (Greedy Algorithm)

Key Idea:
- To maximize profit, we need to buy at the lowest price and sell at a higher price later
- We can't sell before we buy (must maintain chronological order)
- Track two key values while traversing:
  * minVal: minimum stock price seen so far (best buying opportunity)
  * maxProfit: maximum profit achievable up to current index
- At each index, calculate potential profit if we sell today after buying at minVal
- Update maxProfit if current profit is better

Algorithm:
1. Initialize:
   - minVal = +Infinity (no price seen yet, so start with max possible value)
   - maxProfit = 0 (worst case: no profit)
2. Traverse the prices array:
   - Update minVal if current price is lower (found better buying opportunity)
   - Calculate profit if we sell today: currentProfit = prices[i] - minVal
   - Update maxProfit if currentProfit is greater
3. Return maxProfit

Example: prices = [7, 1, 5, 3, 6, 4]
- i=0: prices[0]=7
       minVal = min(7, ∞) = 7
       profit = 7 - 7 = 0, maxProfit = max(0, 0) = 0
       
- i=1: prices[1]=1
       minVal = min(1, 7) = 1 (better buying price found!)
       profit = 1 - 1 = 0, maxProfit = max(0, 0) = 0
       
- i=2: prices[2]=5
       minVal = min(5, 1) = 1 (keep previous min)
       profit = 5 - 1 = 4, maxProfit = max(4, 0) = 4 ✓
       
- i=3: prices[3]=3
       minVal = min(3, 1) = 1
       profit = 3 - 1 = 2, maxProfit = max(2, 4) = 4
       
- i=4: prices[4]=6
       minVal = min(6, 1) = 1
       profit = 6 - 1 = 5, maxProfit = max(5, 4) = 5 ✓
       
- i=5: prices[5]=4
       minVal = min(4, 1) = 1
       profit = 4 - 1 = 3, maxProfit = max(3, 5) = 5

- Return 5 (Buy at 1, sell at 6)

Example: prices = [7, 6, 4, 3, 1]
- Continuously decreasing prices
- minVal keeps updating to lower values
- Every profit calculation: prices[i] - minVal = 0 or negative
- maxProfit remains 0
- Return 0 (no profitable transaction possible)

Time Complexity: O(n) - single pass through the array
Space Complexity: O(1) - only two variables used

Why This Works:
- We only need ONE transaction (one buy + one sell)
- For maximum profit, we want: lowest buy price & highest sell price after it
- By tracking minimum price seen so far, we ensure we're always comparing
  current price against the best possible buying opportunity up to this point
*/

var maxProfit = function(prices) {
  let minVal = +Infinity,   // Track minimum stock price seen so far
     maxProfit = 0;         // Track maximum profit achievable
    
    for (let i = 0; i < prices.length; i++) {
      // Update minimum price if current price is lower (better buying opportunity)
        if (prices[i] < minVal) {
          minVal = prices[i];
        }
        
        // Calculate profit if we sell at current price
        // Update maxProfit if this gives better profit
        if ((prices[i] - minVal) > maxProfit) {
          maxProfit = prices[i] - minVal;
        }
    }
    
    return maxProfit;  // Maximum profit from single transaction
};