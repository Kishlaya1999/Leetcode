/**
 * @param {number} n
 * @return {boolean}
 */

/*
Approach: Recursive Division by 2

Key Idea:
- A number is a power of 2 if it can be expressed as 2^k (where k >= 0)
- Powers of 2: 1, 2, 4, 8, 16, 32, 64, 128, ...
- If we keep dividing a power of 2 by 2, we eventually reach 1
- Non-powers of 2 will either become odd (can't be divided evenly) or go below 1

Algorithm:
1. Base case - Success: if n == 1, return true (2^0 = 1)
2. Base case - Failure: if n < 1 OR n is odd, return false
   - n < 1: number became fractional or is non-positive
   - n % 2 != 0: number is odd and > 1, can't be power of 2
3. Recursive case: return isPowerOfTwo(n/2)
   - Divide by 2 and check if result is power of 2

Example: n = 16
- Call 1: isPowerOfTwo(16)
  - 16 != 1, 16 >= 1, 16 % 2 == 0 → recurse with 16/2 = 8
- Call 2: isPowerOfTwo(8)
  - 8 != 1, 8 >= 1, 8 % 2 == 0 → recurse with 8/2 = 4
- Call 3: isPowerOfTwo(4)
  - 4 != 1, 4 >= 1, 4 % 2 == 0 → recurse with 4/2 = 2
- Call 4: isPowerOfTwo(2)
  - 2 != 1, 2 >= 1, 2 % 2 == 0 → recurse with 2/2 = 1
- Call 5: isPowerOfTwo(1)
  - 1 == 1 → return true ✓
- Result propagates back: true

Example: n = 6
- Call 1: isPowerOfTwo(6)
  - 6 != 1, 6 >= 1, 6 % 2 == 0 → recurse with 6/2 = 3
- Call 2: isPowerOfTwo(3)
  - 3 != 1, 3 >= 1, but 3 % 2 == 1 (odd!) → return false ✗
- Result: false

Example: n = 0
- isPowerOfTwo(0)
  - 0 != 1, 0 < 1 → return false ✗

Example: n = -16
- isPowerOfTwo(-16)
  - -16 != 1, -16 < 1 → return false ✗

Time Complexity: O(log n) - divides n by 2 each time, takes log₂(n) recursive calls
Space Complexity: O(log n) - recursive call stack depth

Alternative Approaches:
1. Bit Manipulation (Most Efficient):
   - return n > 0 && (n & (n - 1)) === 0
   - Powers of 2 have exactly one bit set in binary
   - Time: O(1), Space: O(1)
   
2. Iterative Division:
   - While loop dividing by 2
   - Time: O(log n), Space: O(1)

Binary Representation Insight:
- Powers of 2 in binary: 1, 10, 100, 1000, 10000, ...
- n & (n-1) removes the rightmost set bit
- For powers of 2, this results in 0
*/

var isPowerOfTwo = function(n) {
    // Base case: 2^0 = 1, any power of 2 eventually reduces to 1
    if (n == 1) return true;
    
    // Base cases for failure:
    // - n < 1: non-positive or became fractional (not a power of 2)
    // - n % 2 != 0: odd number greater than 1 (can't be power of 2)
    else if(n < 1 || n % 2 != 0) return false;

    // Recursive case: divide by 2 and check again
    return isPowerOfTwo(n / 2);
};