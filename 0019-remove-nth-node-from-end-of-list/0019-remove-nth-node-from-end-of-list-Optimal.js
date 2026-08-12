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
Approach: Single Pass with Two-Pointer Gap Technique + Sentinel

Intuition:
- Previous approach needed TWO passes: one to count length, one to delete
- Can we find the predecessor of the target node in just ONE pass?
- Key insight: if we maintain two pointers exactly n steps apart,
  when the FRONT pointer reaches the last node, the BACK pointer
  is exactly at the PREDECESSOR of the nth node from the end!
- Sentinel gives us a clean starting point so the back pointer
  naturally handles head deletion without any special case

Key Idea:
- Both pointers start at sentinel
- Advance 'first' pointer n steps ahead (creates n-node gap)
- Move BOTH pointers forward until first.next == null
  (first is at the last node, second is at the predecessor of target)
- Delete: second.next = second.next.next

Why the gap works:
- After advancing first by n steps, first is n nodes ahead of second
- When first reaches the last node (first.next == null), second is
  exactly n nodes behind the last node
- That means second.next is the nth node from the end — the target!
- So second is the predecessor we need for deletion

Algorithm:
1. Create sentinel, sentinel.next = head
2. Initialize first = sentinel
3. Advance first exactly n steps forward
4. Initialize second = sentinel
5. Move both first and second forward until first.next == null
6. Delete: second.next = second.next.next
7. Return sentinel.next

Example 1: head = [1 → 2 → 3 → 4 → 5], n = 2

Setup: sentinel(0) → [1] → [2] → [3] → [4] → [5]
       first = sentinel, second = sentinel

Step 1 - Advance first by n=2 steps:
  i=0: first = [1]
  i=1: first = [2]

  sentinel(0) → [1] → [2] → [3] → [4] → [5]
  ↑second              ↑first
  (gap of 2 nodes between second and first)

Step 2 - Move both until first.next == null:

  Iteration 1: first.next=[3] ✓
    first = [3], second = [1]
    sentinel(0) → [1] → [2] → [3] → [4] → [5]
                   ↑second       ↑first

  Iteration 2: first.next=[4] ✓
    first = [4], second = [2]
    sentinel(0) → [1] → [2] → [3] → [4] → [5]
                          ↑second       ↑first

  Iteration 3: first.next=[5] ✓
    first = [5], second = [3]
    sentinel(0) → [1] → [2] → [3] → [4] → [5]
                                ↑second       ↑first

  Iteration 4: first.next=null ✗ → loop ends
  second = [3] ← predecessor of target [4] (2nd from end) ✓

Step 3 - Delete:
  second.next = second.next.next → [3].next = [5]
  Result: sentinel(0) → [1] → [2] → [3] → [5]
  Return sentinel.next = [1] → [2] → [3] → [5] ✓

Example 2: head = [1 → 2], n = 2 (delete head — sentinel handles this!)

Advance first by n=2:
  i=0: first = [1]
  i=1: first = [2]

  sentinel(0) → [1] → [2]
  ↑second              ↑first

Move both until first.next == null:
  first.next = null → loop never executes!
  second = sentinel (never moved)

Delete: sentinel.next = [1].next = [2]
Return sentinel.next = [2] ✓
(Sentinel cleanly handled head deletion — second stayed at sentinel!)

Example 3: head = [1 → 2 → 3], n = 1 (delete tail)

Advance first by n=1:
  i=0: first = [1]

  sentinel(0) → [1] → [2] → [3]
  ↑second        ↑first

Move both until first.next == null:
  Iter 1: first=[2], second=[1]
  Iter 2: first=[3], second=[2]
  first.next=null → stop

Delete: [2].next = [3].next = null
Return [1] → [2] ✓

State table (Example 1):
  Phase 1 - Advance first by n=2:
    i  | first
    ---|-------
    0  |  [1]
    1  |  [2]

  Phase 2 - Move both until first.next==null:
    Iter | first | second | first.next
    -----|-------|--------|----------
     1   |  [3]  |  [1]   |   [4]
     2   |  [4]  |  [2]   |   [5]
     3   |  [5]  |  [3]   |   null  → stop

  second=[3] is predecessor of target [4] → delete [4]

Comparison across all three removeNthFromEnd approaches:
  Approach                       | Time   | Space | Passes
  -------------------------------|--------|-------|-------
  Two-pass no sentinel           | O(n)   | O(1)  |   2 (+ special head case)
  Two-pass with sentinel         | O(n)   | O(1)  |   2 (no special case)
  Single-pass two-pointer (this)✓| O(n)   | O(1)  |   1 (no special case)

Time Complexity: O(n) - first traverses up to n steps + both traverse rest
Space Complexity: O(1) - only sentinel and two pointer variables
*/

var removeNthFromEnd = function(head, n) {
    let sentinel = new ListNode();  // Dummy node to eliminate head special case
    sentinel.next = head;

    // Step 1: Advance first pointer n steps ahead of sentinel
    let first = sentinel;
    for (let i = 0; i < n; i++) {
      first = first.next;
    }
    // Gap of n nodes now exists between second(sentinel) and first

    // Step 2: Move both pointers until first reaches the last node
    let second = sentinel;
    while(first.next) {       // Stop when first.next is null (first is at last node)
      first = first.next;     // first advances toward end
      second = second.next;   // second follows, maintaining n-node gap
    }
    // second is now at the predecessor of the nth node from the end

    // Step 3: Delete the nth node from the end
    second.next = second.next.next;

    return sentinel.next;  // Skip sentinel, return actual head
};