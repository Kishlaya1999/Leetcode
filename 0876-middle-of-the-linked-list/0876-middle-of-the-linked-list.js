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
Approach: Two-Pass Traversal (Length Calculation)

Intuition:
- Finding the middle of a linked list is tricky because unlike arrays,
  we can't directly access elements by index — we must traverse node by node
- Simplest idea: first count the total length, then traverse exactly
  half that length to land on the middle node
- This requires two passes: one to measure, one to reach the middle

Key Idea:
- Pass 1: Traverse entire list to count total number of nodes
- Calculate midIndex = floor(length / 2)
  (for even-length lists, this gives the SECOND middle node — e.g.,
  length=6 → midIndex=3, which is the 4th node, 0-indexed)
- Pass 2: Traverse exactly midIndex steps from head
- Return the node we land on

Algorithm:
1. Pass 1 - Count length:
   - Initialize current = head, length = 0
   - Traverse until current == null, incrementing length each step
2. Calculate midIndex = Math.floor(length / 2)
3. Pass 2 - Reach middle:
   - Reset current = head
   - Move current forward midIndex times via current = current.next
4. Return current (the middle node)

Example 1: 1 → 2 → 3 → 4 → 5 (odd length)

Pass 1 (counting):
  current=1 → length=1
  current=2 → length=2
  current=3 → length=3
  current=4 → length=4
  current=5 → length=5
  current=null → stop
  length = 5, midIndex = floor(5/2) = 2

Pass 2 (reaching middle):
  start: current=1
  i=0: current = 2
  i=1: current = 3
  Return node(3) ✓

Example 2: 1 → 2 → 3 → 4 → 5 → 6 (even length)

Pass 1 (counting):
  length = 6, midIndex = floor(6/2) = 3

Pass 2 (reaching middle):
  start: current=1
  i=0: current = 2
  i=1: current = 3
  i=2: current = 4
  Return node(4) ✓
  (returns the SECOND middle node for even-length lists)

Visual representation:
  Odd:  1 → 2 → [3] → 4 → 5        middle = node 3
  Even: 1 → 2 → 3 → [4] → 5 → 6   middle = node 4 (second middle)

Time Complexity: O(n) - two passes through the list (O(n) + O(n/2))
Space Complexity: O(1) - only uses a few pointer variables

Optimized Alternative - Floyd's Tortoise and Hare (Single Pass):
- Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
- When fast reaches the end, slow is exactly at the middle
- Achieves the same result in ONE pass instead of TWO

var middleNode = function(head) {
    let slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;        // Move 1 step
        fast = fast.next.next;   // Move 2 steps
    }
    return slow;  // slow is at the middle when fast reaches the end
};

Comparison:
  Approach               | Passes | Time   | Space
  ------------------------|--------|--------|-------
  Two-pass (length calc) | 2      | O(n)   | O(1)
  Floyd's tortoise/hare  | 1      | O(n)   | O(1)  ← fewer iterations
*/

var middleNode = function(head) {
    
    let current = head, length = 0;

    // Pass 1: Count total number of nodes
    while(current != null) {
        length++;
        current = current.next;
    }

    let midIndex = Math.floor(length / 2);  // Index of middle node

    // Pass 2: Traverse to the middle node
    current = head;
    for (let i = 0; i < midIndex; i++) {
        current = current.next;
    }

    return current;  // Middle node of the linked list
};