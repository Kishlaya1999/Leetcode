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
Approach: Two-Pass with Sentinel Node

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What is a Sentinel Node and When is it Used?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A sentinel (dummy) node is a fake placeholder node prepended before
the actual head of the list. It holds no meaningful value — its ONLY
purpose is to eliminate special cases in pointer manipulation.

Why it's needed:
- Deleting or inserting a node requires access to its PREDECESSOR
- The head node has NO predecessor → requires a special case without sentinel
- With a sentinel, even the head has a predecessor (the sentinel itself)
  → ALL nodes can be handled with the SAME uniform logic

Classic situations where sentinel is used:
  1. DELETING the head node:
     Without sentinel: if (positionFromStart == 0) return head.next; ← special case
     With sentinel:    prev.next = prev.next.next;  ← works for ALL positions!

  2. BUILDING a new list (e.g., merge two lists, remove elements):
     Without sentinel: track whether head has been set yet → if/else on first node
     With sentinel:    always append to sentinel.next → uniform for all nodes

  3. INSERTING at position 0:
     Without sentinel: newNode.next = head; head = newNode; ← different logic
     With sentinel:    prev.next = newNode; ← same as any other insertion

The pattern is always:
  sentinel.next = head          ← attach real list after sentinel
  // ... manipulate using prev/curr starting from sentinel ...
  return sentinel.next          ← skip sentinel, return actual head

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Intuition:
- We need to delete the nth node from the end
- Two-pass strategy: count length first, then convert to position from start
- Sentinel lets us handle head deletion without any special case

Key Idea:
- Sentinel sits before head; 'prev' starts at sentinel
- Traverse (len - n) steps from sentinel to land exactly on the
  PREDECESSOR of the target node
- This naturally handles target=head (0 steps from sentinel → prev=sentinel)
- Rewire: prev.next = prev.next.next (skip the target)

Algorithm:
1. Create sentinel, sentinel.next = head
2. Pass 1: Count total length (len) of the list
3. Start prev = sentinel
4. Traverse len - n steps to reach predecessor of target
5. Delete: prev.next = prev.next.next
6. Return sentinel.next

Example 1: head = [1 → 2 → 3 → 4 → 5], n = 2

Pass 1: len = 5
Steps to predecessor = len - n = 5 - 2 = 3

  sentinel(0) → [1] → [2] → [3] → [4] → [5]
  ↑prev

  i=0: prev = [1]
  i=1: prev = [2]
  i=2: prev = [3]
  prev = [3] ← predecessor of target [4]

  Delete: [3].next = [4].next = [5]

  sentinel(0) → [1] → [2] → [3] → [5]
  Return sentinel.next = [1] → [2] → [3] → [5] ✓

Example 2: head = [1 → 2], n = 2 (delete head — sentinel handles this!)

Pass 1: len = 2
Steps to predecessor = len - n = 2 - 2 = 0

  sentinel(0) → [1] → [2]
  ↑prev (stays at sentinel — 0 steps taken!)

  Delete: sentinel.next = [1].next = [2]

  sentinel(0) → [2]
  Return sentinel.next = [2] ✓
  (No special case needed — sentinel was the predecessor of head!)

Example 3: head = [1 → 2 → 3], n = 1 (delete tail)

Pass 1: len = 3
Steps = len - n = 3 - 1 = 2

  sentinel(0) → [1] → [2] → [3]
  i=0: prev=[1]
  i=1: prev=[2]
  prev=[2] ← predecessor of [3]

  Delete: [2].next = [3].next = null
  Return [1] → [2] ✓

State table (Example 1):
  Pass 1:
    Step | current | len
    -----|---------|----
     1   |   [2]   |  1
     2   |   [3]   |  2
     3   |   [4]   |  3
     4   |   [5]   |  4
     5   |   null  |  5

  Pass 2 (traverse len-n = 3 steps from sentinel):
    i=0: prev=sentinel → [1]
    i=1: prev=[1] → [2]
    i=2: prev=[2] → [3]
    prev=[3], delete [4]: [3].next=[5]

Sentinel vs No Sentinel (side by side):
  Without sentinel (previous solution):
    let positionFromStart = len - n;
    if(positionFromStart == 0) return head.next;  ← SPECIAL CASE for head
    current = head;
    for(let i = 0; i < positionFromStart - 1; i++) current = current.next;
    current.next = current.next.next;

  With sentinel (this solution):
    let prev = sentinel;
    for(let i = 0; i < len - n; i++) prev = prev.next;  ← UNIFORM, no special case
    prev.next = prev.next.next;

Time Complexity: O(n) - two linear passes through the list
Space Complexity: O(1) - only sentinel, prev, current pointer variables
*/

var removeNthFromEnd = function(head, n) {
    let sentinel = new ListNode();  // Dummy predecessor for uniform deletion
    sentinel.next = head;

    // Pass 1: Count total length
    let current = head, len = 0;
    while(current) {
      current = current.next;
      len++;
    }

    // Start prev at sentinel (it acts as predecessor for all positions,
    // including position 0 which is the head itself)
    let prev = sentinel;

    // Traverse len-n steps to land on the predecessor of the target node
    for (let i = 0; i < len - n; i++) {
      prev = prev.next;
    }

    // Delete target: skip over prev.next (works for ALL positions including head)
    prev.next = prev.next.next;

    return sentinel.next;  // Skip sentinel, return actual head
};