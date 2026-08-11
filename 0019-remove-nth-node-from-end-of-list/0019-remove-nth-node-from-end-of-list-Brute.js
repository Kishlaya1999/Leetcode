/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

/*
Approach: Two-Pass (Length Calculation + Targeted Deletion)

Intuition:
- We need to remove the nth node FROM THE END, but we can only traverse
  forward in a linked list — we don't know where the end is until we reach it
- Simplest idea: if we know the total length, we can convert "nth from end"
  into "positionFromStart = length - n" (0-indexed from head)
- This requires two passes: one to measure, one to reach and delete
- Edge case: if positionFromStart == 0, we're deleting the HEAD itself
  → just return head.next (no predecessor to rewire from)
- For all other positions: traverse to the node JUST BEFORE the target
  and rewire its next pointer to skip the target

Key Idea:
- Pass 1: Count total length of the list
- Convert: positionFromStart = len - n
  (how many nodes to skip from head to reach the node to delete)
- If positionFromStart == 0: target is the head → return head.next
- Pass 2: Traverse to positionFromStart - 1 (node before target)
- Delete: current.next = current.next.next

Algorithm:
1. Pass 1 - Count length:
   - Traverse entire list, increment len each step
2. Calculate positionFromStart = len - n
3. Edge case: if positionFromStart == 0, return head.next (remove head)
4. Pass 2 - Reach predecessor:
   - Traverse positionFromStart - 1 steps from head
5. Delete: current.next = current.next.next
6. Return head

Example 1: head = [1 → 2 → 3 → 4 → 5], n = 2

Pass 1: len = 5
positionFromStart = 5 - 2 = 3 (0-indexed: node at position 3 = value 4)

  Index:   0    1    2    3    4
  List:  [1] → [2] → [3] → [4] → [5]
                              ↑ delete this (3rd from start, 2nd from end)

positionFromStart = 3, not 0 → no head removal

Pass 2: Traverse positionFromStart - 1 = 2 steps
  start: current=[1]
  i=0: current=[2]
  i=1: current=[3]
  current=[3] is the predecessor of target [4]

Delete: current.next = current.next.next
  [3].next = [4].next = [5]

Result: [1] → [2] → [3] → [5] ✓

Example 2: head = [1 → 2], n = 2 (remove head)

Pass 1: len = 2
positionFromStart = 2 - 2 = 0 → remove head!
Return head.next = [2] ✓

Example 3: head = [1], n = 1 (single node, remove head)

Pass 1: len = 1
positionFromStart = 1 - 1 = 0 → remove head!
Return head.next = null ✓

Example 4: head = [1 → 2 → 3], n = 1 (remove last node)

Pass 1: len = 3
positionFromStart = 3 - 1 = 2

Pass 2: Traverse positionFromStart - 1 = 1 step
  start: current=[1]
  i=0: current=[2]
  current=[2] is predecessor of target [3]

Delete: [2].next = [3].next = null

Result: [1] → [2] ✓

State table (Example 1):
  Pass 1:
    Step | current | len
    -----|---------|----
     1   |   [2]   |  1
     2   |   [3]   |  2
     3   |   [4]   |  3
     4   |   [5]   |  4
     5   |   null  |  5

  positionFromStart = 5 - 2 = 3

  Pass 2 (traverse to index 2 = positionFromStart - 1):
    i=0: current=[1] → [2]
    i=1: current=[2] → [3]
    current=[3], delete [3].next=[4]: [3].next=[5]

Time Complexity: O(n) - two passes, each O(n)
Space Complexity: O(1) - only pointer and counter variables

Optimized Alternative - Single Pass with Two Pointers:
- Use fast and slow pointers, gap of n between them
- When fast reaches end, slow is exactly at the predecessor of target
- Achieves same result in ONE pass

var removeNthFromEnd = function(head, n) {
    let sentinel = new ListNode(0, head);
    let fast = sentinel, slow = sentinel;
    
    // Move fast n+1 steps ahead (so slow lands on predecessor)
    for (let i = 0; i <= n; i++) fast = fast.next;
    
    // Move both until fast hits null
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    
    slow.next = slow.next.next;  // Delete target
    return sentinel.next;
};

Comparison:
  Approach                | Time   | Space | Passes
  ------------------------|--------|-------|-------
  Two-pass (this)         | O(n)   | O(1)  |   2
  One-pass two-pointer ✓  | O(n)   | O(1)  |   1   ← fewer iterations
*/

var removeNthFromEnd = function(head, n) {
    // Pass 1: Count total length of the list
    let len = 0;
    let current = head;
    while(current) {
      current = current.next;
      len++;
    }

    // Convert "nth from end" to "position from start" (0-indexed)
    let positionFromStart = len - n;

    // Edge case: target is the head node itself
    if(positionFromStart == 0) return head.next;

    // Pass 2: Traverse to the node just BEFORE the target
    current = head;
    for(let i = 0; i < positionFromStart - 1; i++) {
      current = current.next;
    }
    
    // Delete: skip over the target node
    current.next = current.next.next;

    return head;
};