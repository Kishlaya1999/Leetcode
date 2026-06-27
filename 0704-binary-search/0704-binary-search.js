/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/*
Approach: Binary Search

Intuition:
- The array is sorted, so we don't need to check every element one by one
- A sorted array lets us eliminate HALF the remaining elements with
  every comparison — check the middle element and decide which half
  the target could possibly be in
- If middle element is too small, target must be in the right half
  (discard left half entirely)
- If middle element is too large, target must be in the left half
  (discard right half entirely)
- Repeat this halving process until we find the target or run out
  of elements to check

Key Idea:
- Maintain two pointers: 'l' (left boundary) and 'r' (right boundary)
- Calculate 'mid' as the middle index between l and r
- Compare nums[mid] with target:
  * If equal: found it, return mid
  * If nums[mid] < target: target is in right half, move l to mid+1
  * If nums[mid] > target: target is in left half, move r to mid-1
- Continue until l > r (search space exhausted) — target not found

Algorithm:
1. Initialize l = 0, r = nums.length - 1
2. While l <= r (search space still valid):
   - Calculate mid = floor((l + r) / 2)
   - If nums[mid] == target: return mid (found!)
   - Else if nums[mid] < target: search right half → l = mid + 1
   - Else: search left half → r = mid - 1
3. If loop exits without finding target, return -1

Example: nums = [-1, 0, 3, 5, 9, 12], target = 9

  Step | l | r | mid | nums[mid] | Comparison      | Action
------|---|---|-----|-----------|-----------------|------------------
  1   | 0 | 5 |  2  |     3     | 3 < 9           | l = mid+1 = 3
  2   | 3 | 5 |  4  |     9     | 9 == 9 ✓ FOUND  | return 4

Return 4 ✓ (nums[4] = 9)

Example: nums = [-1, 0, 3, 5, 9, 12], target = 2

  Step | l | r | mid | nums[mid] | Comparison      | Action
------|---|---|-----|-----------|-----------------|------------------
  1   | 0 | 5 |  2  |     3     | 3 > 2           | r = mid-1 = 1
  2   | 0 | 1 |  0  |    -1     | -1 < 2          | l = mid+1 = 1
  3   | 1 | 1 |  1  |     0     | 0 < 2           | l = mid+1 = 2
  4   | 2 | 1 |  —  |     —     | l > r, loop ends| return -1

Return -1 ✓ (2 is not in the array)

Time Complexity: O(log n) - search space halves with each iteration
Space Complexity: O(1) - only uses a few pointer variables

Why this is better than linear search:
  Approach        | Time      | Space
  -----------------|-----------|-------
  Linear search    | O(n)      | O(1)
  Binary search ✓  | O(log n)  | O(1)   ← much faster for large arrays
                                          (e.g., n=1,000,000 → only ~20 steps!)
*/

var search = function (nums, target) {

  let l = 0, r = nums.length - 1;
  
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);  // Middle index of current search range
    
    if (nums[mid] == target) {
      return mid;  // Found the target!
    }
    else if (nums[mid] < target) {
      l = mid + 1;  // Target is in the right half, discard left half
    }
    else {
      r = mid - 1;  // Target is in the left half, discard right half
    }
  }

  return -1;  // Target not found in the array
};