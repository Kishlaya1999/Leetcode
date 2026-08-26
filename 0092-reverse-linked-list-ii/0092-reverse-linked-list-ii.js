/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

/*
Approach: Two-Phase Traversal (Navigate + Reverse Sublist)

Intuition:
- We need to reverse only a PORTION of the list (from position left to right)
- Full list reversal is straightforward, but partial reversal needs care:
  * Everything BEFORE position left stays unchanged
  * Everything AFTER position right stays unchanged
  * Only nodes at positions left to right get reversed
- Key challenge: after reversing the sublist, we need to reconnect it
  to both the untouched prefix and suffix — requiring careful pointer bookkeeping
- Sentinel handles the case where left=1 (reversing from the head)
  without any special case

Key Idea:
- Phase 1 (Navigate): Move prev and curr to the boundary
  * prev stops at position left-1 (node just BEFORE the sublist)
  * curr stops at position left (first node OF the sublist)
  * Save leftPrev = prev (anchor to reconnect reversed sublist)
- Phase 2 (Reverse): Reverse exactly (right - left + 1) nodes
  * Standard three-pointer reversal, but only for the sublist
  * After loop: prev = new head of reversed sublist (was right-th node)
               curr = node just AFTER the reversed sublist
- Reconnect:
  * leftPrev.next.next = curr   (old left node, now tail of reversed sublist,
                                  must point to the node after right)
  * leftPrev.next = prev        (node before sublist must point to new sublist head)

Why reconnect ORDER matters:
  leftPrev.next still points to the original left node (now tail of reversed sublist)
  Step 1: leftPrev.next.next = curr  → use leftPrev.next (=old left) to set its next
  Step 2: leftPrev.next = prev       → NOW update leftPrev.next (would lose old left ref if done first!)

Algorithm:
1. Create sentinel, sentinel.next = head
2. Initialize prev = sentinel, curr = head
3. Phase 1 - Navigate to left boundary:
   - Loop (left-1) times: advance prev and curr
   - Save leftPrev = prev (anchor point before sublist)
   - Reset prev = null (needed for clean reversal)
4. Phase 2 - Reverse (right - left + 1) nodes:
   - For each node: save front=curr.next, curr.next=prev, prev=curr, curr=front
   - After loop: prev = reversed sublist head, curr = node after sublist
5. Reconnect:
   - leftPrev.next.next = curr  (old left node → node after right)
   - leftPrev.next = prev       (node before left → new sublist head)
6. Return sentinel.next

Example: head = [1→2→3→4→5], left=2, right=4

Initial: sentinel→[1]→[2]→[3]→[4]→[5]
  prev=sentinel, curr=[1]

Phase 1 (navigate to position left=2, loop left-1=1 times):
  i=1: prev=[1], curr=[2]

  leftPrev = [1] (node before sublist)
  prev = null (reset for reversal)

  sentinel→[1]→[2]→[3]→[4]→[5]
             ↑leftPrev  ↑curr (left node)

Phase 2 (reverse right-left+1 = 3 nodes: [2],[3],[4]):

  i=1: front=[3], curr([2]).next=null, prev=[2], curr=[3]
    null ← [2]  [3]→[4]→[5]

  i=2: front=[4], curr([3]).next=[2], prev=[3], curr=[4]
    null ← [2] ← [3]  [4]→[5]

  i=3: front=[5], curr([4]).next=[3], prev=[4], curr=[5]
    null ← [2] ← [3] ← [4]  [5]

  After loop:
    prev = [4] (new head of reversed sublist)
    curr = [5] (node after sublist)
    leftPrev = [1] (anchor before sublist)
    leftPrev.next = [2] (old left node = new tail of reversed sublist)

Reconnect:
  Step 1: leftPrev.next.next = curr
          [1].next.next = [5]
          [2].next = [5]   ← old left node [2] now points to [5]
          sentinel→[1]→[2]→[5]   [4]→[3]→[2]→[5]

  Step 2: leftPrev.next = prev
          [1].next = [4]   ← [1] now points to new sublist head [4]
          sentinel→[1]→[4]→[3]→[2]→[5]

Return sentinel.next = [1→4→3→2→5] ✓

Example: left=1, right=3, head=[1→2→3→4→5] (sentinel handles head reversal)

Phase 1: loop 0 times (left-1=0), prev=sentinel, curr=[1]
  leftPrev = sentinel

Phase 2: reverse 3 nodes [1],[2],[3]
  After: prev=[3], curr=[4], leftPrev.next=[1]

Reconnect:
  sentinel.next.next = [4] → [1].next = [4]
  sentinel.next = [3]       → sentinel points to [3]
  Result: [3→2→1→4→5] ✓

State table (main example):
  Phase 2 iterations:
  i  | front | curr.next | prev | curr
  ---|-------|-----------|------|-----
  1  |  [3]  |   null    | [2]  | [3]
  2  |  [4]  |   [2]     | [3]  | [4]
  3  |  [5]  |   [3]     | [4]  | [5]

  After: prev=[4](new head), curr=[5](suffix), leftPrev.next=[2](new tail)

Time Complexity: O(n) - at most two passes (navigate + reverse sublist)
Space Complexity: O(1) - only pointer variables, in-place reversal
*/

var reverseBetween = function(head, left, right) {
    let sentinel = new ListNode();  // Handles left=1 (head reversal) uniformly
    sentinel.next = head;
    let prev = sentinel, curr = head;

    // Phase 1: Navigate to the left boundary (left-1 steps)
    for(let i = 1; i <= left - 1; i++) {
      prev = prev.next;
      curr = curr.next;
    }
    // prev = node just before sublist, curr = first node of sublist

    let leftPrev = prev;  // Anchor: connects prefix to reversed sublist
    prev = null;          // Reset prev for clean reversal (tail of reversed list → null)
    front = curr;         // Temp pointer for reversal

    // Phase 2: Reverse exactly (right - left + 1) nodes
    for(let i = 1; i <= right - left + 1; i++) {
      front = front.next;   // Save next node before overwriting
      curr.next = prev;     // Reverse the link
      prev = curr;          // Advance prev
      curr = front;         // Advance curr
    }
    // prev = new head of reversed sublist (was right-th node)
    // curr = node immediately after the reversed sublist

    // Reconnect (ORDER CRITICAL: set tail's next before updating leftPrev.next!)
    leftPrev.next.next = curr;  // Old left node (now tail) → node after sublist
    leftPrev.next = prev;       // Node before sublist → new sublist head

    return sentinel.next;
};