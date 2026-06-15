/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/*
Approach: Two-Pointer Technique

Intuition:
- We want non-zero elements at the front and zeros at the back
- Removing zeros and shifting elements is expensive (O(n) per removal)
- Instead, can we just swap zeros with non-zero elements?
- Key insight: maintain a boundary pointer 'p' that always points to
  where the next non-zero element should go
- Whenever we find a non-zero element, swap it to position 'p'
- This naturally pushes zeros to the end without extra space

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

Example: nums = [0, 1, 0, 3, 12]
- Start: p = 0
         ↑p

- i=0: nums[0]=0 → zero, skip (p stays at 0)
  nums = [0, 1, 0, 3, 12]
          ↑p

- i=1: nums[1]=1 → non-zero, swap(nums, p=0, i=1)
  nums = [1, 0, 0, 3, 12], p = 1
             ↑p

- i=2: nums[2]=0 → zero, skip (p stays at 1)
  nums = [1, 0, 0, 3, 12]
             ↑p

- i=3: nums[3]=3 → non-zero, swap(nums, p=1, i=3)
  nums = [1, 3, 0, 0, 12], p = 2
                ↑p

- i=4: nums[4]=12 → non-zero, swap(nums, p=2, i=4)
  nums = [1, 3, 12, 0, 0], p = 3
                    ↑p

Final: [1, 3, 12, 0, 0] ✓
       (non-zeros preserved in order, zeros pushed to end)

Time Complexity: O(n) - single pass through the array
Space Complexity: O(1) - only uses two pointers, in-place modification
*/

var swap = function(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
};

var moveZeroes = function(nums) {
    let p = 0;   // Pointer for the position of next non-zero element

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            swap(nums, p, i);  // Swap non-zero element with element at position p
            p++;               // Move boundary forward
        }
    }
};