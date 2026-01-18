/**
 * @param {number} n
 * @return {number}
 */

/*
Approach: Naive Recursion (Direct Mathematical Definition)

Key Idea:
- Fibonacci sequence: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1
- Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
- Directly translate the mathematical definition into recursive calls
- Each call branches into two more calls until reaching base cases

Algorithm:
1. Base cases:
   - If n == 0, return 0
   - If n == 1, return 1
2. Recursive case:
   - Return fib(n-1) + fib(n-2)
   - Calculate sum of previous two Fibonacci numbers

Example: n = 5
Call tree visualization:
                    fib(5)
                   /      \
              fib(4)        fib(3)
             /     \        /     \
        fib(3)   fib(2)  fib(2)  fib(1)
        /   \    /   \   /   \     |
    fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)  1
    /   \    |     |      |      |      |
fib(1) fib(0) 1    1      0      1      0
  |      |
  1      0

Execution trace:
- fib(5) = fib(4) + fib(3)
- fib(4) = fib(3) + fib(2) = 2 + 1 = 3
- fib(3) = fib(2) + fib(1) = 1 + 1 = 2
- fib(2) = fib(1) + fib(0) = 1 + 0 = 1
- fib(1) = 1
- fib(0) = 0

Result: fib(5) = 3 + 2 = 5 ✓

Example: n = 0
- fib(0) = 0 (base case)

Example: n = 1
- fib(1) = 1 (base case)

Example: n = 6
- fib(6) = fib(5) + fib(4)
- fib(5) = 5 (from previous example)
- fib(4) = 3 (from previous example)
- Result: 5 + 3 = 8 ✓

Time Complexity: O(2^n) - exponential
- Each call makes 2 recursive calls
- Forms a binary tree of height n
- Many redundant calculations (e.g., fib(3) calculated multiple times)
- Actual complexity closer to O(φ^n) where φ = golden ratio ≈ 1.618

Space Complexity: O(n) - maximum recursion depth
- Call stack can go n levels deep
- At most n function calls on the stack at once

Performance Issue:
- VERY INEFFICIENT for large n due to repeated calculations
- fib(5) calls fib(3) twice, fib(2) three times, etc.
- For n=40, makes over 200 million function calls!

Optimized Alternatives:

1. Dynamic Programming (Memoization):
   - Cache results to avoid redundant calculations
   - Time: O(n), Space: O(n)
   
2. Iterative (Bottom-up):
   - Use loop with two variables
   - Time: O(n), Space: O(1)
   
3. Matrix Exponentiation:
   - Time: O(log n), Space: O(1)

Example with Memoization:
const memo = {};
var fib = function(n) {
    if (n == 0 || n == 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
};
*/

var fib = function(n) {
    // Base cases: F(0) = 0, F(1) = 1
    if (n == 1 || n == 0) return n;

    // Recursive case: F(n) = F(n-1) + F(n-2)
    return fib(n - 1) + fib(n - 2);
};