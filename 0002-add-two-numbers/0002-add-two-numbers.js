/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

/*
Approach: Elementary Addition with Carry (Three-Pass Simulation)

Intuition:
- The numbers are stored in REVERSE order (least significant digit first)
  so the heads of both lists are already aligned for addition!
- This mirrors exactly how we do manual addition: right to left,
  digit by digit, carrying over whenever the sum exceeds 9
- Process both lists simultaneously, adding corresponding digits + carry
- When one list runs out, continue adding remaining digits from the
  longer list (still applying carry)
- If carry remains after both lists are exhausted, append a final node

Key Insight about carry:
- sum = digit1 + digit2 + carry (carry is 0 or 1)
- New digit to store = sum % 10  (ones place)
- New carry = Math.floor(sum / 10) (tens place: 0 or 1)
- carry can only ever be 0 or 1 (max sum = 9+9+1 = 19, carry = 1)

Key Idea:
- Use sentinel node to build result list uniformly
- Three phases mirror the three possible states:
  1. Both lists have digits (add both + carry)
  2. Only l1 has remaining digits (add l1 + carry)
  3. Only l2 has remaining digits (add l2 + carry)
- Final check: if carry == 1 after all digits processed, append node(1)

Algorithm:
1. Base cases: if either list is null, return the other
2. Create sentinel, curr = sentinel, carry = 0
3. Phase 1 - While both l1 and l2 exist:
   - sum = l1.val + l2.val + carry
   - carry = floor(sum / 10), append new node with sum % 10
   - Advance both l1 and l2
4. Phase 2 - While l1 still exists:
   - sum = l1.val + carry
   - carry = floor(sum / 10), append new node with sum % 10
   - Advance l1
5. Phase 3 - While l2 still exists:
   - sum = l2.val + carry
   - carry = floor(sum / 10), append new node with sum % 10
   - Advance l2
6. If carry == 1: append node(1) for final overflow
7. Return sentinel.next

Example: l1 = [2→4→3] (342), l2 = [5→6→4] (465)
Expected result: 342 + 465 = 807 → [7→0→8]

Initial: sentinel(0), curr=sentinel, carry=0

Phase 1 (both lists):
  Iter 1: l1=[2], l2=[5]
    sum = 2+5+0 = 7, carry=0, digit=7
    append node(7), curr=[7]
    l1→[4], l2→[6]
    sentinel → [7]

  Iter 2: l1=[4], l2=[6]
    sum = 4+6+0 = 10, carry=1, digit=0
    append node(0), curr=[0]
    l1→[3], l2→[4]
    sentinel → [7] → [0]

  Iter 3: l1=[3], l2=[4]
    sum = 3+4+1 = 8, carry=0, digit=8
    append node(8), curr=[8]
    l1→null, l2→null
    sentinel → [7] → [0] → [8]

Both null → Phase 1 ends

Phase 2: l1=null → skip
Phase 3: l2=null → skip
carry=0 → no extra node

Return sentinel.next = [7→0→8] ✓ (represents 807)

Example with carry overflow: l1 = [9→9→9], l2 = [1]
Expected: 999 + 1 = 1000 → [0→0→0→1]

Phase 1:
  Iter 1: 9+1+0=10, carry=1, digit=0 → append [0]
  l1→[9], l2→null → Phase 1 ends

Phase 2 (l1 remaining):
  Iter 1: l1=[9], sum=9+1=10, carry=1, digit=0 → append [0]
  Iter 2: l1=[9], sum=9+1=10, carry=1, digit=0 → append [0]
  l1→null → Phase 2 ends

Phase 3: l2=null → skip
carry=1 → append node(1)!

Result: [0→0→0→1] ✓ (represents 1000)

State table (main example):
  Phase | l1  | l2  | carry | sum | digit | Result so far
  ------|-----|-----|-------|-----|-------|---------------
    1   | [2] | [5] |   0   |  7  |   7   | [7]
    1   | [4] | [6] |   0   | 10  |   0   | [7→0]
    1   | [3] | [4] |   1   |  8  |   8   | [7→0→8]
   end  |null |null |   0   |  —  |   —   | no extra node

Time Complexity: O(max(m, n)) - traverse both lists, length of longer one
Space Complexity: O(max(m, n)) - result list has at most max(m,n)+1 nodes
*/

var addTwoNumbers = function(l1, l2) {
    if(!l1) return l2;  // If l1 empty, result is l2
    if(!l2) return l1;  // If l2 empty, result is l1

    let sentinel = new ListNode(0), curr = sentinel;
    let carry = 0;  // Tracks overflow from each digit addition

    // Phase 1: Add digits from both lists simultaneously
    while(l1 && l2) {
      let sum = l1.val + l2.val + carry;
      carry = Math.floor(sum / 10);         // Carry for next digit (0 or 1)
      curr.next = new ListNode(sum % 10);   // Store ones digit
      curr = curr.next;
      l1 = l1.next;
      l2 = l2.next;
    }

    // Phase 2: Process remaining digits from l1 (if l1 was longer)
    while(l1) {
      let sum = l1.val + carry;
      carry = Math.floor(sum / 10);
      curr.next = new ListNode(sum % 10);
      curr = curr.next;
      l1 = l1.next;
    }

    // Phase 3: Process remaining digits from l2 (if l2 was longer)
    while(l2) {
      let sum = l2.val + carry;
      carry = Math.floor(sum / 10);
      curr.next = new ListNode(sum % 10);
      curr = curr.next;
      l2 = l2.next;
    }

    // Final carry: e.g. 999 + 1 = 1000 → extra leading 1
    if(carry == 1) {
      curr.next = new ListNode(1);
    }

    return sentinel.next;  // Skip sentinel, return actual result head
};