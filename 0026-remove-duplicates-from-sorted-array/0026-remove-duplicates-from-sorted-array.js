/**
 * @param {number[]} nums
 * @return {number}
 */

/*
Non-decreasing order means items arranged (numbers, letters, etc.) such that each subsequent item is greater than or equal to the one before it, allowing for duplicates


Approach: Two-Pointer Technique (Slow-Fast Pointer)

Key Idea:
- Since array is sorted, duplicates appear consecutively
- Use two pointers:
  * 'x' (slow pointer): tracks the position of last unique element
  * 'i' (fast pointer): explores the array to find next unique element
- When a new unique element is found, place it right after position 'x'

Algorithm:
1. Initialize 'x' = 0 (first element is always unique)
2. Traverse array with 'i' starting from index 0:
   - Compare nums[i] with nums[x] (current unique element)
   - If different (found new unique element):
     * Place nums[i] at position x + 1
     * Increment x to expand the unique elements section
3. Return x + 1 (length of unique elements)

Example: [1, 1, 2]
- Start: x = 0, nums = [1, 1, 2]
           ↑x
- i=0: nums[0]=1, nums[x]=1 → 1 == 1 (duplicate, skip)
- i=1: nums[1]=1, nums[x]=1 → 1 == 1 (duplicate, skip)
- i=2: nums[2]=2, nums[x]=1 → 2 != 1 (unique found!)
       nums[x+1] = nums[2] → nums[1] = 2
       nums = [1, 2, 2], x = 1
              ↑x
- Return x + 1 = 2
- Final array: [1, 2, _] (first 2 elements are unique)

Example: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
- Start: x = 0, nums[x] = 0
- i=0: 0 == 0 (skip)
- i=1: 0 == 0 (skip)
- i=2: 1 != 0 → nums[1] = 1, x = 1, nums = [0, 1, 1, 1, 1, 2, 2, 3, 3, 4]
- i=3: 1 == 1 (skip)
- i=4: 1 == 1 (skip)
- i=5: 2 != 1 → nums[2] = 2, x = 2, nums = [0, 1, 2, 1, 1, 2, 2, 3, 3, 4]
- i=6: 2 == 2 (skip)
- i=7: 3 != 2 → nums[3] = 3, x = 3, nums = [0, 1, 2, 3, 1, 2, 2, 3, 3, 4]
- i=8: 3 == 3 (skip)
- i=9: 4 != 3 → nums[4] = 4, x = 4, nums = [0, 1, 2, 3, 4, 2, 2, 3, 3, 4]
- Return x + 1 = 5
- Final array: [0, 1, 2, 3, 4, _, _, _, _, _] (first 5 elements are unique)

Time Complexity: O(n) - single pass through the array
Space Complexity: O(1) - in-place modification with only two pointers

Key Insight:
- We don't need to remove duplicates; just overwrite them
- First 'k' elements contain all unique values in sorted order
- Rest of the array beyond index 'k-1' is irrelevant
*/

var removeDuplicates = function (nums) {
  let x = 0;  // Pointer to track position of last unique element
  
  for (let i = 0; i < nums.length; i++) {
    // Found a new unique element
    if (nums[i] != nums[x]) {
      nums[x + 1] = nums[i];  // Place it next to last unique element
      x++;  // Move unique boundary forward
    }
  }
  
  return x + 1;  // Length of unique elements (x is 0-indexed, so add 1)
};