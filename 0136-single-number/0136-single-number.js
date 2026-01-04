/**
 * @param {number[]} nums
 * @return {number}
 */

/*
Approach: XOR Bit Manipulation (Optimal Solution)

Key Idea:
- Use XOR (^) operation which has special mathematical properties:
  * a ^ a = 0 (any number XORed with itself equals 0)
  * a ^ 0 = a (any number XORed with 0 equals itself)
  * XOR is commutative and associative: a ^ b ^ c = c ^ b ^ a
- Since every number appears twice except one, all pairs cancel out to 0
- The single number remains after XORing all elements

Algorithm:
1. Initialize 'singleNumber' = 0 (XOR identity element)
2. Traverse the array and XOR each element with 'singleNumber'
3. All duplicate numbers cancel out (become 0)
4. Return the final result which is the single number

Example: [4, 1, 2, 1, 2]
- Start: singleNumber = 0
- i=0: singleNumber = 0 ^ 4 = 4
- i=1: singleNumber = 4 ^ 1 = 5 (binary: 100 ^ 001 = 101)
- i=2: singleNumber = 5 ^ 2 = 7 (binary: 101 ^ 010 = 111)
- i=3: singleNumber = 7 ^ 1 = 6 (binary: 111 ^ 001 = 110)
- i=4: singleNumber = 6 ^ 2 = 4 (binary: 110 ^ 010 = 100)
- Return 4 ✓

Breakdown of how pairs cancel:
4 ^ 1 ^ 2 ^ 1 ^ 2
= 4 ^ (1 ^ 1) ^ (2 ^ 2)  [rearranging due to commutative property]
= 4 ^ 0 ^ 0
= 4

Example: [2, 2, 1]
- Start: singleNumber = 0
- i=0: singleNumber = 0 ^ 2 = 2
- i=1: singleNumber = 2 ^ 2 = 0 (pair cancels out)
- i=2: singleNumber = 0 ^ 1 = 1
- Return 1 ✓

Time Complexity: O(n) - single pass through the array
Space Complexity: O(1) - only uses one variable (constant space)

Advantages over Hash Map approach:
- No extra space needed (O(1) vs O(n))
- Single pass instead of two passes
- Elegant mathematical solution
*/

var singleNumber = function(nums) {
    
    let singleNumber = 0;  // Initialize with 0 (XOR identity)
    
    // XOR all elements - pairs cancel out, single number remains
    for (let i = 0; i < nums.length; i++) {
        singleNumber = singleNumber ^ nums[i];
    }

    return singleNumber;  // The number that appears only once
};