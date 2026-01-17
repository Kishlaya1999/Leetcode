/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

/*
Approach: Two-Pointer Technique (Overwrite Method)

Key Idea:
- Use two pointers to separate elements that should be kept from those to remove
- 'x' (slow pointer): tracks the position where next valid element should be placed
- 'i' (fast pointer): explores the array to find elements not equal to 'val'
- Overwrite array in-place by copying valid elements to the front

Algorithm:
1. Initialize 'x' = 0 (position for next valid element)
2. Traverse array with 'i':
   - If nums[i] != val (element should be kept):
     * Copy nums[i] to position 'x'
     * Increment 'x' (move to next available position)
   - If nums[i] == val (element to remove):
     * Skip it (don't increment 'x')
3. Return 'x' (number of valid elements remaining)

Example: nums = [3, 2, 2, 3], val = 3
- Start: x = 0
- i=0: nums[0]=3, val=3 → 3 == 3 (skip, don't increment x)
- i=1: nums[1]=2, val=3 → 2 != 3 (keep it)
       nums[x] = nums[1] → nums[0] = 2, x = 1
       nums = [2, 2, 2, 3]
- i=2: nums[2]=2, val=3 → 2 != 3 (keep it)
       nums[x] = nums[2] → nums[1] = 2, x = 2
       nums = [2, 2, 2, 3]
- i=3: nums[3]=3, val=3 → 3 == 3 (skip)
- Return x = 2
- Final array: [2, 2, _, _] (first 2 elements are valid)

Example: nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2
- Start: x = 0
- i=0: 0 != 2 → nums[0] = 0, x = 1, nums = [0, 1, 2, 2, 3, 0, 4, 2]
- i=1: 1 != 2 → nums[1] = 1, x = 2, nums = [0, 1, 2, 2, 3, 0, 4, 2]
- i=2: 2 == 2 (skip)
- i=3: 2 == 2 (skip)
- i=4: 3 != 2 → nums[2] = 3, x = 3, nums = [0, 1, 3, 2, 3, 0, 4, 2]
- i=5: 0 != 2 → nums[3] = 0, x = 4, nums = [0, 1, 3, 0, 3, 0, 4, 2]
- i=6: 4 != 2 → nums[4] = 4, x = 5, nums = [0, 1, 3, 0, 4, 0, 4, 2]
- i=7: 2 == 2 (skip)
- Return x = 5
- Final array: [0, 1, 3, 0, 4, _, _, _] (first 5 elements don't contain val)

Time Complexity: O(n) - single pass through the array
Space Complexity: O(1) - in-place modification with only two pointers

Key Differences from removeDuplicates:
- removeDuplicates: compares with previous unique element (nums[x])
- removeElement: compares with given value (val)
- Both use same two-pointer overwrite strategy
*/

var removeElement = function(nums, val) {
    let x = 0;  // Pointer for position of next valid element
    
    for (let i = 0; i < nums.length; i++) {
        // Keep elements that are not equal to val
        if(nums[i] != val) {
            nums[x] = nums[i];  // Place valid element at position x
            x++;  // Move to next position
        }   
    }
    
    return x;  // Number of elements remaining (not equal to val)
};