/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

/*
Approach: Find Tail + Circular Link + Break at New Head

Intuition:
- "Rotate right by k" means the last k nodes move to the front
- Example: [1→2→3→4→5], k=2 → [4→5→1→2→3]
  (last 2 nodes [4,5] move to the front)
- Key observations:
  1. Rotating by list length = same list (full cycle back to original)
     → k = k % length (eliminate redundant full rotations)
  2. The new head is (length - k) steps from the original head
  3. The node JUST BEFORE the new head becomes the new tail (next = null)
- Strategy: find length + tail in one pass, then find the break point

Key Idea:
- Pass 1: traverse to find length AND tail node simultaneously
- Reduce: k = k % length (handle k > length)
- Find break point: new head is at position (length - k) from start
  * Traverse (length - k) steps, tracking prev and curr
  * After loop: curr = new head, prev = new tail
- Make circular: tail.next = head (connect old tail to old head)
- Break: prev.next = null (cut the list at the new tail)
- Return curr (new head)

Algorithm:
1. Base cases: null, single node, or k=0 → return head unchanged
2. Pass 1 - Find length and tail:
   - Start tail = head, length = 1
   - Traverse until tail.next == null, counting length
3. Reduce k: k = k % length
   - If k == 0 after reduction: return head (no rotation needed)
4. Calculate stepsToNewHead = length - k
5. Traverse stepsToNewHead steps tracking prev and curr:
   - After loop: curr = new head, prev = new tail
6. Break and relink:
   - prev.next = null   (cut: prev becomes new tail)
   - tail.next = head   (link: old tail connects to old head)
7. Return curr (new head)

Example 1: head = [1→2→3→4→5], k = 2

Pass 1:
  tail traversal: [1]→[2]→[3]→[4]→[5]→null
  tail = [5], length = 5

Reduce: k = 2 % 5 = 2 (no change)
stepsToNewHead = 5 - 2 = 3

Traverse 3 steps tracking prev/curr:
  start: prev=null, curr=[1]
  step 1 (stepsToNewHead=2): prev=[1], curr=[2]
  step 2 (stepsToNewHead=1): prev=[2], curr=[3]
  step 3 (stepsToNewHead=0): prev=[3], curr=[4]
  → prev=[3] (new tail), curr=[4] (new head)

Break and relink:
  [3].next = null       (cut: [1→2→3] is now the back section)
  [5].next = [1]        (link: [4→5→1→2→3])

  Before: [1] → [2] → [3] → [4] → [5] → null
  After:  [4] → [5] → [1] → [2] → [3] → null

Return curr = [4] ✓

Example 2: head = [1→2→3→4→5], k = 7

Pass 1: length = 5, tail = [5]
Reduce: k = 7 % 5 = 2 (same as Example 1!)
Result: [4→5→1→2→3] ✓
(rotating by 7 = rotating by 2 since 7 = 1 full cycle + 2)

Example 3: head = [1→2→3], k = 3

Pass 1: length = 3, tail = [3]
Reduce: k = 3 % 3 = 0 → return head immediately
Result: [1→2→3] ✓ (full rotation = no change)

Example 4: head = [1→2], k = 1

Pass 1: length=2, tail=[2]
Reduce: k = 1 % 2 = 1
stepsToNewHead = 2 - 1 = 1

Traverse 1 step:
  step 1: prev=[1], curr=[2]
  → prev=[1] (new tail), curr=[2] (new head)

Break and relink:
  [1].next = null
  [2].next = [1]

Return [2] → [1] ✓

State table (Example 1):
  stepsToNewHead | prev | curr
  ---------------|------|------
  start (3)      | null | [1]
       2         | [1]  | [2]
       1         | [2]  | [3]
       0         | [3]  | [4]  ← loop ends

  new tail = prev = [3]
  new head = curr = [4]

Visual of the circular link trick:
  Before break:
  [1] → [2] → [3]   [4] → [5] → [1]  (circular via tail.next=head)
                ↑null pending   ↑new head

  After prev.next=null:
  [4] → [5] → [1] → [2] → [3] → null ✓

Time Complexity: O(n) - one pass to find length/tail + one partial pass to find break point
Space Complexity: O(1) - only pointer variables used
*/

var rotateRight = function(head, k) {
    // Base cases: empty, single node, or no rotation needed
    if (!head || !head.next || k === 0) return head;
    
    // Pass 1: find length and tail node simultaneously
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    // tail now points to the last node

    // Eliminate full rotations (rotating by length = same list)
    k = k % length;
    if (k === 0) return head;  // No effective rotation needed

    // New head is (length - k) steps from original head
    let stepsToNewHead = length - k;
    let prev = null;
    let curr = head;

    // Traverse to find the break point
    while (stepsToNewHead--) {
        prev = curr;         // Track predecessor of new head
        curr = curr.next;
    }
    // curr = new head, prev = new tail

    prev.next = null;   // Cut: sever the list at new tail
    tail.next = head;   // Link: old tail connects back to old head
    return curr;        // Return new head
};