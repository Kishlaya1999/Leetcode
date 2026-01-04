/**
 * @param {number[]} nums
 * @return {number}
 */


/*
Approach: Mathematical Sum Formula

Key Idea:
- The array should contain numbers from 0 to n (where n = array length)
- Calculate the expected sum of all numbers from 0 to n using the formula: n * (n + 1) / 2
- Calculate the actual sum of elements present in the array
- The difference between expected sum and actual sum is the missing number

Algorithm:
1. Calculate 'n' = length of the array
2. Calculate 'actualSum' (expected sum) = n * (n + 1) / 2
   - This is the sum formula for first n natural numbers (including 0)
3. Calculate 'partialSum' by iterating through the array and summing all elements
4. Return the difference: actualSum - partialSum (this is the missing number)

Example: [3, 0, 1]
- n = 3
- actualSum = 3 * (3 + 1) / 2 = 3 * 4 / 2 = 6
  (Expected: 0 + 1 + 2 + 3 = 6)
- partialSum = 3 + 0 + 1 = 4
- Missing number = 6 - 4 = 2

Example: [0, 1]
- n = 2
- actualSum = 2 * 3 / 2 = 3
- partialSum = 0 + 1 = 1
- Missing number = 3 - 1 = 2

Time Complexity: O(n) - single pass through the array to calculate partial sum
Space Complexity: O(1) - only uses a few variables
*/

var missingNumber = function(nums) {
    let n = nums.length;
    let actualSum = n * (n + 1) / 2;
    let partialSum = 0
    for (let i = 0 ; i < nums.length; i++) {
        partialSum += nums[i];
    }

    return actualSum - partialSum;
};