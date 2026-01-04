/**
 * @param {number[]} nums
 * @return {number}
 */

/*
Approach: Sorting and Gap Detection with Proper Boundary Handling

Key Idea:
- Sort the array so consecutive numbers appear adjacent
- Traverse the sorted array and find where the sequence breaks
- The missing number is detected when nums[i] + 1 != nums[i+1]
- Handle edge case where missing number is at the end (equals n)

Algorithm:
1. Sort the array in ascending order
2. Traverse the sorted array with proper bounds checking:
   - Check if i + 1 < nums.length to avoid out-of-bounds access
   - If current element + 1 doesn't equal next element, gap found
   - Return nums[i] + 1 as the missing number
3. If loop completes without finding gap, missing number is n (array length)

Example: [0, 1]
- Array is already sorted: [0, 1]
- n = 2 (array length), so complete sequence should be [0, 1, 2]
- i=0: Check i + 1 < nums.length → 1 < 2 ✓
       nums[0]=0, nums[1]=1 → 0 + 1 = 1 ✓ (no gap, continue)
- i=1: Check i + 1 < nums.length → 2 < 2 ✗ (boundary check fails, skip)
- Loop ends, return nums.length = 2 ✓

Example: [3, 0, 1]
- After sorting: [0, 1, 3]
- i=0: Check 1 < 3 ✓
       nums[0]=0, nums[1]=1 → 0 + 1 = 1 ✓ (continue)
- i=1: Check 2 < 3 ✓
       nums[1]=1, nums[2]=3 → 1 + 1 = 2 ≠ 3 ✗ (gap found)
- Return 1 + 1 = 2 ✓

Example: [1, 2, 3]
- After sorting: [1, 2, 3]
- i=0: Check 1 < 3 ✓
       nums[0]=1, nums[1]=2 → 1 + 1 = 2 ✓ (continue)
- i=1: Check 2 < 3 ✓
       nums[1]=2, nums[2]=3 → 2 + 1 = 3 ✓ (continue)
- i=2: Check 3 < 3 ✗ (boundary check fails, skip)
- Loop ends, but missing number is 0 (not handled!)
- Returns 3 (incorrect - should return 0)

Note: Current implementation still has a bug - doesn't check if 0 is missing!
Should add: if (nums[0] !== 0) return 0; before the loop

Time Complexity: O(n log n) - dominated by sorting
Space Complexity: O(1) or O(n) - depending on sorting algorithm
*/

var missingNumber = function(nums) {
    nums.sort((a, b) => a - b);  // Sort array in ascending order
    
    // Check if 0 is missing (edge case)
    if (nums[0] !== 0) return 0;
    
    for (let i = 0; i < nums.length; i++) {
        // Check bounds and if there's a gap between consecutive elements
        if(i + 1 < nums.length && nums[i] != nums[i+1] - 1) {
          return nums[i] + 1;  // Found the missing number
        }
    }
    
    // If no gap found, missing number is n (the last number)
    return nums.length;
};