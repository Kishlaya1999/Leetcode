/**
 * @param {number[]} nums
 * @return {number}
 */

/*
Approach: Frequency Counter using Hash Map

Key Idea:
- Use a hash map (object) to count the frequency of each number
- Every number appears twice except one that appears once
- Find and return the number with frequency 1

Algorithm:
1. Create an empty frequency map 'freq' = {}
2. First pass - Count frequencies:
   - Traverse the array
   - For each number:
     * If not in map, initialize with frequency 1
     * If already in map, increment frequency
3. Second pass - Find the single number:
   - Traverse the array again
   - Check frequency of each number in the map
   - Return the number with frequency == 1

Example: [4, 1, 2, 1, 2]
- First pass (building frequency map):
  - i=0: nums[0]=4 → freq = {4: 1}
  - i=1: nums[1]=1 → freq = {4: 1, 1: 1}
  - i=2: nums[2]=2 → freq = {4: 1, 1: 1, 2: 1}
  - i=3: nums[3]=1 → freq = {4: 1, 1: 2, 2: 1}
  - i=4: nums[4]=2 → freq = {4: 1, 1: 2, 2: 2}
  
- Second pass (finding single number):
  - i=0: freq[4] = 1 ✓ → Return 4

Example: [2, 2, 1]
- First pass: freq = {2: 2, 1: 1}
- Second pass: freq[2] = 2 (skip), freq[1] = 1 ✓ → Return 1

Time Complexity: O(n) - two passes through the array
Space Complexity: O(n) - hash map stores up to n/2 + 1 unique numbers
*/

var singleNumber = function (nums) {

  let freq = {};  // Frequency map to store count of each number

  // First pass: Build frequency map
  for (let i = 0; i < nums.length; i++) {
    if (!freq[nums[i]]) {
      freq[nums[i]] = 1;  // Initialize count for new number
    } else {
      freq[nums[i]]++;  // Increment count for existing number
    }
  }

  // Second pass: Find number with frequency 1
  for (let i = 0; i < nums.length; i++) {
    if (freq[nums[i]] == 1) return nums[i];  // Found the single number
  }

};