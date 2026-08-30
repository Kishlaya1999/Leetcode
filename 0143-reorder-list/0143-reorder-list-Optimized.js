/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */

/*
Approach: Find Middle + Reverse Second Half + Merge Two Halves

Intuition:
- The reordered pattern is: L0→Ln→L1→Ln-1→L2→Ln-2→...
- We're interleaving the first half with the REVERSED second half
- This breaks down into three subproblems we already know how to solve:
  1. Find the middle (split into two halves)
  2. Reverse the second half
  3. Merge the two halves by alternating nodes

- Why split + reverse?
  * Original: [1→2→3→4→5]
  * First half:  [1→2→3], Second half: [4→5]
  * Reverse second: [5→4]
  * Interleave: 1→5→2→4→3 ✓
  * The "last node" we need is just the "first node of reversed second half"!

Key Idea:
- Phase 1 (Find Middle): Floyd's slow/fast pointers
  * fast starts at head.next (so slow lands at END of first half for even lists)
  * When fast can't move 2 steps, slow = end of first half
  * Cut: slow.next = null (separates the two halves)
- Phase 2 (Reverse Second Half): Standard three-pointer reversal
- Phase 3 (Merge): Interleave first and (reversed) second half
  * For each step: save temp1=first.next, temp2=second.next
  * first.next = second (insert second node after first)
  * second.next = temp1 (insert rest of first half after second)
  * Advance: first=temp1, second=temp2

Why fast starts at head.next (not head):
  Even list [1→2→3→4]:
    fast=head:      slow ends at [2] (middle LEFT) → halves: [1,2] and [3,4] ✓
    fast=head.next: slow ends at [2] (same result here)
  Odd list [1→2→3→4→5]:
    fast=head:      slow ends at [3] (exact middle) → halves: [1,2,3] [4,5]
    fast=head.next: slow ends at [2] → halves: [1,2] [3,4,5]
  Using head.next ensures first half ≤ second half in length, so
  the merge loop (driven by second) terminates correctly

Algorithm:
1. Base case: 0 or 1 nodes → return as-is
2. Phase 1 - Find middle and split:
   - slow=head, fast=head.next
   - Move until fast or fast.next is null
   - second = slow.next, slow.next = null (cut into two halves)
3. Phase 2 - Reverse second half:
   - Standard reversal: prev=null, current=second
   - After loop: prev = reversed second half head
4. Phase 3 - Merge (interleave) two halves:
   - first=head, second=prev
   - While second exists:
     * Save temp1=first.next, temp2=second.next
     * first.next=second, second.next=temp1
     * Advance first=temp1, second=temp2

Example: head = [1→2→3→4→5]

Phase 1 - Find middle:
  slow=[1], fast=head.next=[2]

  Iter 1: fast=[4], slow=[2]   (fast moves 2, slow moves 1)
  Iter 2: fast=null? No, fast=[4], fast.next=[5]
          fast=[5].next=null → loop condition fails? Let's retrace:

  Actually:
  Iter 1: fast.next=[3]✓, fast=[4], slow=[2]
  Iter 2: fast.next=[5]✓, fast=null (5.next=null)... 

  Let me retrace carefully:
  start: slow=[1], fast=[2]
  Iter 1: fast=[2]&&fast.next=[3] ✓ → fast=[4], slow=[2]
  Iter 2: fast=[4]&&fast.next=[5] ✓ → fast=null(5.next), slow=[3]
  Iter 3: fast=null ✗ → loop ends

  slow=[3] = end of first half
  second=[4], slow.next=null

  First half:  [1]→[2]→[3]→null
  Second half: [4]→[5]→null

Phase 2 - Reverse [4→5]:
  i=1: front=[5], [4].next=null, prev=[4], current=[5]
  i=2: front=null, [5].next=[4], prev=[5], current=null
  Reversed: [5]→[4]→null, prev=[5]

Phase 3 - Merge [1→2→3] with [5→4]:
  first=[1], second=[5]

  Iter 1:
    temp1 = first.next = [2]
    temp2 = second.next = [4]
    first.next = second → [1].next = [5]
    second.next = temp1 → [5].next = [2]
    first=[2], second=[4]
    List so far: [1]→[5]→[2]→[3]→null

  Iter 2:
    temp1 = first.next = [3]
    temp2 = second.next = null
    first.next = second → [2].next = [4]
    second.next = temp1 → [4].next = [3]
    first=[3], second=null
    List so far: [1]→[5]→[2]→[4]→[3]→null

  second=null → loop ends

Final: [1→5→2→4→3] ✓

State table (Phase 3):
  Iter | first | second | temp1 | temp2 | List segment added
  -----|-------|--------|-------|-------|-------------------
   1   |  [1]  |  [5]   |  [2]  |  [4]  | [1]→[5]→[2]
   2   |  [2]  |  [4]   |  [3]  | null  | [2]→[4]→[3]

Example even list: [1→2→3→4]

Phase 1: slow=[1],fast=[2]
  Iter1: fast=[4],slow=[2] (fast.next=[3]✓, fast.next.next=[4])

  Wait, let me retrace:
  start: slow=[1], fast=[2]
  Iter1: fast=[2]&&fast.next=[3]✓ → fast=[4], slow=[2]
  Iter2: fast=[4]&&fast.next=null✗ → loop ends
  slow=[2], second=[3], slow.next=null
  First: [1→2], Second: [3→4]

Phase 2: Reverse [3→4] → [4→3]

Phase 3: Merge [1→2] with [4→3]
  Iter1: [1]→[4]→[2], first=[2], second=[3]
  Iter2: [2]→[3], first=null, second=null
  Result: [1→4→2→3] ✓

Time Complexity: O(n) - three linear passes (find mid + reverse + merge)
Space Complexity: O(1) - all operations done in-place with pointer variables
*/

var reorderList = function(head) {
    
    if(!head || !head.next) {
      return head;
    }

    // Phase 1: Find middle using slow/fast pointers, then split
    let slow = head, fast = head.next;
    while(fast && fast.next) {
      fast = fast.next.next;   // Fast: 2 steps
      slow = slow.next;        // Slow: 1 step
    }
    // slow = end of first half
    let second = slow.next;    // Start of second half
    slow.next = null;          // Cut: separate first and second halves

    // Phase 2: Reverse the second half in-place
    let prev = null, current = second, front = null;
    while (current) {
      front = current.next;    // Save next
      current.next = prev;     // Reverse link
      prev = current;          // Advance prev
      current = front;         // Advance current
    }
    // prev = head of reversed second half

    // Phase 3: Merge (interleave) first half and reversed second half
    let first = head;
    second = prev;
    while (second) {
      let temp1 = first.next;   // Save rest of first half
      let temp2 = second.next;  // Save rest of second half
      first.next = second;      // Insert second node after first
      second.next = temp1;      // Connect second to rest of first half
      first = temp1;            // Advance first pointer
      second = temp2;           // Advance second pointer
    }
};