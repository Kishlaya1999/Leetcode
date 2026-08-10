/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */

/*
Approach: Sentinel Node + Single Pass Deletion

Intuition:
- We need to remove all nodes with a given value, including possibly
  the head node itself
- Deleting a node in a linked list requires access to the node BEFORE
  it (to rewire its next pointer and skip over the deleted node)
- Problem: the head node has no predecessor, requiring a special case
- Elegant trick: prepend a SENTINEL (dummy) node before head
  * Now even the head has a predecessor (the sentinel)
  * We can handle ALL deletions uniformly — no special case for head!
- Use 'current' to track the node just BEFORE the one being examined
  (current.next is the node we're deciding to keep or delete)

Key Idea:
- Create a sentinel node pointing to head as its next
- Use 'current' pointer to inspect current.next (the candidate node):
  * If current.next.val == val: SKIP it (current.next = current.next.next)
    DO NOT advance current (new current.next might also need deletion!)
  * If current.next.val != val: keep it, advance current forward
- Return sentinel.next (the actual head of the modified list)

Algorithm:
1. Create sentinel node, sentinel.next = head
2. Initialize current = sentinel
3. While current AND current.next both exist:
   - If current.next.val == val:
     * Delete: current.next = current.next.next (skip over it)
     * Don't advance current (recheck new current.next!)
   - Else:
     * Keep: advance current = current.next
4. Return sentinel.next

Example: head = [1 → 2 → 6 → 3 → 4 → 5 → 6], val = 6

Initial setup:
  sentinel(0) → [1] → [2] → [6] → [3] → [4] → [5] → [6] → null
  current = sentinel

Step 1: current=sentinel, current.next=[1]
  [1].val=1 != 6 → keep, advance current
  current = [1]
  sentinel(0) → [1] → [2] → [6] → [3] → [4] → [5] → [6] → null
                 ↑curr

Step 2: current=[1], current.next=[2]
  [2].val=2 != 6 → keep, advance current
  current = [2]
  sentinel(0) → [1] → [2] → [6] → [3] → [4] → [5] → [6] → null
                        ↑curr

Step 3: current=[2], current.next=[6]
  [6].val=6 == 6 → DELETE: current.next = [6].next = [3]
  DO NOT advance current (recheck new current.next!)
  sentinel(0) → [1] → [2] → [3] → [4] → [5] → [6] → null
                        ↑curr

Step 4: current=[2], current.next=[3]
  [3].val=3 != 6 → keep, advance current
  current = [3]
  sentinel(0) → [1] → [2] → [3] → [4] → [5] → [6] → null
                               ↑curr

Step 5: current=[3], current.next=[4]
  [4].val=4 != 6 → keep, advance current
  current = [4]

Step 6: current=[4], current.next=[5]
  [5].val=5 != 6 → keep, advance current
  current = [5]

Step 7: current=[5], current.next=[6]
  [6].val=6 == 6 → DELETE: current.next = [6].next = null
  sentinel(0) → [1] → [2] → [3] → [4] → [5] → null
                                            ↑curr

Step 8: current=[5], current.next=null → loop ends

Return sentinel.next = [1] → [2] → [3] → [4] → [5] ✓

Example: head = [6 → 6 → 6], val = 6 (all nodes deleted, including head)

Initial: sentinel(0) → [6] → [6] → [6] → null
  current = sentinel

Step 1: current.next=[6], val==6 → DELETE: sentinel.next=[6(2nd)]
  sentinel(0) → [6] → [6] → null
  (don't advance current)

Step 2: current.next=[6(2nd)], val==6 → DELETE: sentinel.next=[6(3rd)]
  sentinel(0) → [6] → null

Step 3: current.next=[6(3rd)], val==6 → DELETE: sentinel.next=null
  sentinel(0) → null

Step 4: current.next=null → loop ends
Return sentinel.next = null ✓

Why we DON'T advance current after deletion:
  Consider: [1] → [6] → [6] → [3], val=6
  If we advanced current after deleting first [6]:
    current would move to the second [6] (now current.next=[3])
    We'd miss checking IF current itself needs deletion!
  By NOT advancing, we recheck current.next which is now the second [6]
  and correctly delete it too.

Time Complexity: O(n) - each node examined exactly once
Space Complexity: O(1) - only sentinel and current pointer variables

Why sentinel is better than handling head separately:
  Without sentinel, we'd need:
    while (head && head.val == val) head = head.next;  // Special head case
    // Then handle rest of list...
  With sentinel: uniform logic for ALL nodes including head ✓
*/

var removeElements = function(head, val) {
    let sentinel = new ListNode();  // Dummy node before head
    sentinel.next = head;

    let current = sentinel;  // current stays BEHIND the node being examined
    
    while(current && current.next) {
      if(current.next.val == val) {
        // Delete: skip over current.next (don't advance — recheck new next!)
        current.next = current.next.next;
      } else {
        // Keep: move current forward to examine the next node
        current = current.next;
      }
    }

    return sentinel.next;  // Sentinel.next is the new head of modified list
};