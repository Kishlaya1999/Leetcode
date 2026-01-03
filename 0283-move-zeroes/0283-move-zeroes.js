/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/*
Approach: Two-Pointer Technique

Key Idea:
- Use two pointers: 'p' and 'i'
- 'p' maintains the position where the next non-zero element should be placed
- 'i' traverses the entire array looking for non-zero elements

Algorithm:
1. Initialize pointer 'p' at index 0 (marks the boundary of non-zero elements)
2. Traverse the array with pointer 'i':
   - When we find a non-zero element at index 'i':
     * Swap it with the element at index 'p'
     * Increment 'p' (expand the non-zero boundary)
3. After the loop, all non-zero elements are at the front in their original order,
   and all zeros are pushed to the end

Time Complexity: O(n) - single pass through the array
Space Complexity: O(1) - only uses two pointers, in-place modification
*/

var moveZeroes = function(nums) {
    let p = 0;   // Pointer for the position of next non-zero element
    for (let i = 0 ; i< nums.length; i++) {
        if (nums[i] != 0) {
          // Swap non-zero element with element at position p
          let temp = nums[p];
          nums[p] = nums[i];
          nums[i] = temp;
          p++;     // Move boundary forward
        }
    }
};