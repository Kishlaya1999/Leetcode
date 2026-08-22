/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/*
Approach: Floyd's Tortoise and Hare (Single Pass, Two Pointers)

Intuition:
- Previous approach needed two passes: one to count length, one to reach middle
- Can we find the middle in just ONE pass without knowing the length?
- Key insight: if one pointer moves at DOUBLE the speed of another,
  when the faster one reaches the end, the slower one must be
  exactly halfway through — right at the middle!
- Think of two runners on a track: if one runs twice as fast,
  when the fast runner finishes the full track, the slow runner
  has covered exactly half the distance

Key Idea:
- Use two pointers starting at head:
  * slow: moves 1 step at a time
  * fast: moves 2 steps at a time
- When fast reaches the end (null) or the last node (fast.next == null),
  slow is guaranteed to be at the middle node
- For even-length lists, this naturally returns the SECOND middle node
  (same behavior as the two-pass approach)

Algorithm:
1. Initialize both slow and fast pointers at head
2. While fast != null AND fast.next != null:
   - Move slow one step forward: slow = slow.next
   - Move fast two steps forward: fast = fast.next.next
3. Return slow (it's at the middle when fast exits the loop)

Why the condition is `fast != null && fast.next != null`:
- fast != null: ensures fast itself is valid before accessing fast.next
- fast.next != null: ensures fast.next is valid before doing fast.next.next
  (if fast.next is null, we're at the last node and can't jump two steps)

Example 1: 1 → 2 → 3 → 4 → 5 (odd length, n=5)

  Step | slow | fast | fast.next | Action
  -----|------|------|-----------|---------------------------
  init |  1   |  1   |     2     | both start at head
   1   |  2   |  3   |     4     | slow→2, fast→3
   2   |  3   |  5   |    null   | slow→3, fast→5
   3   |  —   |  —   |     —     | fast.next==null → loop ends
  Return slow = node(3) ✓

  Visual:
  Step 0: [1] → [2] → [3] → [4] → [5]
           ↑S,F
  Step 1: [1] → [2] → [3] → [4] → [5]
                  ↑S         ↑F
  Step 2: [1] → [2] → [3] → [4] → [5]
                        ↑S               ↑F(null)
  Return node(3) ✓

Example 2: 1 → 2 → 3 → 4 → 5 → 6 (even length, n=6)

  Step | slow | fast | fast.next | Action
  -----|------|------|-----------|---------------------------
  init |  1   |  1   |     2     | both start at head
   1   |  2   |  3   |     4     | slow→2, fast→3
   2   |  3   |  5   |     6     | slow→3, fast→5
   3   |  4   |  null|     —     | slow→4, fast→null
   4   |  —   |  —   |     —     | fast==null → loop ends
  Return slow = node(4) ✓ (second middle node)

  Visual:
  Step 0: [1] → [2] → [3] → [4] → [5] → [6]
           ↑S,F
  Step 1: [1] → [2] → [3] → [4] → [5] → [6]
                  ↑S         ↑F
  Step 2: [1] → [2] → [3] → [4] → [5] → [6]
                        ↑S               ↑F
  Step 3: [1] → [2] → [3] → [4] → [5] → [6]
                               ↑S              ↑F(null)
  Return node(4) ✓

Time Complexity: O(n) - single pass, fast pointer covers n steps total
Space Complexity: O(1) - only two pointer variables used

Comparison with Two-Pass Approach:
  Approach               | Passes | Time   | Space
  ------------------------|--------|--------|-------
  Two-pass (length calc) | 2      | O(n)   | O(1)
  Floyd's tortoise/hare ✓| 1      | O(n)   | O(1)  ← half the iterations!
*/

var middleNode = function(head) {
  let slow = head, fast = head;  // Both pointers start at head

  // fast moves 2 steps, slow moves 1 step
  // When fast reaches end, slow is at the middle
  while(fast != null && fast.next != null) {
    slow = slow.next;        // Tortoise: 1 step
    fast = fast.next.next;   // Hare: 2 steps
  }

  return slow;  // slow is at the middle node
};