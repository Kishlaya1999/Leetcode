/**
 * @param {number[]} nums
 * @return {number}
 */

/*
Approach: Single Pass with Counter Tracking

Key Idea:
- Traverse the array once while maintaining two variables:
  * 'count': tracks the current consecutive sequence of 1s
  * 'maxConsecutive': stores the maximum consecutive 1s found so far
- Reset 'count' to 0 whenever we encounter a 0
- Update 'maxConsecutive' whenever current count exceeds it

Algorithm:
1. Initialize 'count' = 0 (current consecutive 1s) and 'maxConsecutive' = 0 (global max)
2. Traverse the array:
   - If current element is 1:
     * Increment 'count'
     * Update 'maxConsecutive' if 'count' is greater
   - If current element is 0:
     * Reset 'count' to 0 (sequence broken)
3. Return 'maxConsecutive' after the loop completes

Example: [1, 1, 0, 1, 1, 1]
- i=0, nums[0]=1 → count=1, maxConsecutive=1
- i=1, nums[1]=1 → count=2, maxConsecutive=2
- i=2, nums[2]=0 → count=0, maxConsecutive=2
- i=3, nums[3]=1 → count=1, maxConsecutive=2
- i=4, nums[4]=1 → count=2, maxConsecutive=2
- i=5, nums[5]=1 → count=3, maxConsecutive=3
Result: 3

Time Complexity: O(n) - single pass through the array
Space Complexity: O(1) - only uses two variables
*/

var findMaxConsecutiveOnes = function(nums) {
    let count = 0, maxConsecutive = 0;
    for (let i = 0 ; i< nums.length; i++) {
        if(nums[i] == 1) {
          count++;
          if (count > maxConsecutive) {
            maxConsecutive = count;
          }
        } 
        else {
          count = 0;
        } 
    }

    return maxConsecutive;
};