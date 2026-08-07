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
Approach: Iterative Three-Pointer Reversal

Intuition:
- To reverse a linked list, each node's 'next' pointer must point
  to its PREVIOUS node instead of its next node
- The challenge: when we redirect a node's 'next' pointer backward,
  we lose our reference to the rest of the list!
- Solution: save the next node BEFORE redirecting the pointer
- We need three pointers at all times:
  * 'previous': the node behind current (new destination for current's next)
  * 'current': the node we're currently reversing
  * 'front': saves the node ahead (so we don't lose the rest of the list)
- Process one node at a time, marching forward until we've reversed all links

Key Idea:
- Traverse the list while maintaining three pointers
- At each node, perform three operations IN ORDER:
  1. Save the next node (front = current.next) — preserve rest of list
  2. Reverse the link (current.next = previous) — do the actual reversal
  3. Advance both pointers forward (previous = current, current = front)
- When current becomes null, previous is at the new head

Algorithm:
1. Base case: if head is null or single node, return head as-is
2. Initialize: current = head, previous = null, front = null
3. While current != null:
   - front = current.next      (save next node before we lose it)
   - current.next = previous   (reverse the link)
   - previous = current        (advance previous forward)
   - current = front           (advance current forward)
4. Set head = previous (previous is now at the last node = new head)
5. Return head

Example: 1 → 2 → 3 → 4 → 5

Initial state:
  prev=null, curr=1, front=null
  null ← ? [1] → [2] → [3] → [4] → [5]

Step 1: curr=1
  front = 2               (save next)
  1.next = null           (reverse: 1 now points to null)
  prev = 1, curr = 2
  null ← [1]  [2] → [3] → [4] → [5]
          ↑prev  ↑curr

Step 2: curr=2
  front = 3               (save next)
  2.next = 1              (reverse: 2 now points to 1)
  prev = 2, curr = 3
  null ← [1] ← [2]  [3] → [4] → [5]
                 ↑prev  ↑curr

Step 3: curr=3
  front = 4               (save next)
  3.next = 2              (reverse: 3 now points to 2)
  prev = 3, curr = 4
  null ← [1] ← [2] ← [3]  [4] → [5]
                       ↑prev  ↑curr

Step 4: curr=4
  front = 5               (save next)
  4.next = 3              (reverse: 4 now points to 3)
  prev = 4, curr = 5
  null ← [1] ← [2] ← [3] ← [4]  [5]
                             ↑prev  ↑curr

Step 5: curr=5
  front = null            (save next)
  5.next = 4              (reverse: 5 now points to 4)
  prev = 5, curr = null
  null ← [1] ← [2] ← [3] ← [4] ← [5]
                                     ↑prev  ↑curr(null)

Loop ends: curr == null
  head = prev = 5
  Return 5 → 4 → 3 → 2 → 1 → null ✓

State table:
  Step | front | current | current.next | previous | current(after)
  -----|-------|---------|--------------|----------|---------------
  init |  —    |    1    |      2       |   null   |      1
   1   |  2    |    1    |     null     |    1     |      2
   2   |  3    |    2    |      1       |    2     |      3
   3   |  4    |    3    |      2       |    3     |      4
   4   |  5    |    4    |      3       |    4     |      5
   5   | null  |    5    |      4       |    5     |     null

Time Complexity: O(n) - single pass through the list
Space Complexity: O(1) - only three pointer variables used

*/

var reverseList = function(head) {
    // Base case: empty list or single node needs no reversal
    if(head == null || head.next == null) {
      return head;
    }

    let current = head;
    let previous = null, front = null;

    while (current != null) {
      front = current.next;      // Step 1: Save next node before losing reference
      current.next = previous;   // Step 2: Reverse the link
      previous = current;        // Step 3: Advance previous forward
      current = front;           // Step 4: Advance current forward
    }

    head = previous;  // previous is now pointing to the last node (new head)

    return head;
};