/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/*
Approach: Floyd's Cycle Detection + Mathematical Proof (Optimal)

Intuition:
- Hash Set approach found the entry in O(n) space by remembering every node
- Can we find the cycle ENTRY with O(1) space using only two pointers?
- We already know Floyd's algorithm detects WHETHER a cycle exists
- The key question: after slow and fast meet inside the cycle, how do
  we find WHERE the cycle begins?
- Answer: pure math! The distances involved reveal a beautiful property
  that tells us exactly where to look

Mathematical Proof:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Define:
    x1 = distance from head to cycle entry
    x2 = distance from cycle entry to meeting point (where slow & fast first meet)
    x3 = distance from meeting point back to cycle entry
         (i.e. remaining cycle length after meeting point)

  Visual:
    head ──(x1)──► [cycle entry] ──(x2)──► [meeting point]
                        ▲                         │
                        └──────────(x3)───────────┘

  Distance traveled when they first meet:
    slow = x1 + x2               (entered cycle once, met at x2 into cycle)
    fast = x1 + x2 + x3 + x2    (went around the loop once more: x3 back
                                  to entry + x2 to meeting point again)

  Since fast travels exactly 2× the distance of slow:
    2 × (x1 + x2) = x1 + x2 + x3 + x2
    2x1 + 2x2     = x1 + 2x2 + x3
    2x1            = x1 + x3
    x1             = x3

  ∴ distance from head to cycle entry (x1)
    == distance from meeting point to cycle entry (x3)

  This means:
  - If we reset slow to head after the first meeting
  - And move BOTH slow and fast one step at a time
  - They will meet EXACTLY at the cycle entry node!
  (slow travels x1 from head, fast travels x3 from meeting point,
   and x1 == x3, so they arrive at cycle entry simultaneously)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Key Idea:
- Phase 1 (Detect): Move slow 1 step, fast 2 steps until they meet
  → meeting point is x2 into the cycle from entry
- Phase 2 (Locate): Reset slow to head, keep fast at meeting point
  Move both 1 step at a time → they meet at the cycle entry!
- Return the meeting node from Phase 2 (= cycle entry)

Algorithm:
1. Initialize slow = head, fast = head
2. Phase 1 - Detect cycle:
   - While fast && fast.next:
     * slow = slow.next, fast = fast.next.next
     * If slow == fast (meeting point found):
       → Enter Phase 2
3. Phase 2 - Find cycle entry:
   - Reset slow = head (fast stays at meeting point)
   - While slow != fast:
     * slow = slow.next, fast = fast.next (both move 1 step)
   - Return slow (= cycle entry node)
4. If loop exits naturally (fast or fast.next == null): return null

Example: head = [3→2→0→-4], cycle entry at node [2]

List structure:
  [3] → [2] → [0] → [-4]
   ↑head  ↑entry          |
          └────────────────┘

  x1 = 1 (head [3] to entry [2])
  x2 = 2 (entry [2] → [0] → [-4], meeting point at [-4])
  x3 = 1 ([-4] back to entry [2])
  Verify: x1 == x3 → 1 == 1 ✓

Phase 1 - Detect:
  Step | slow  | fast  | slow==fast?
  -----|-------|-------|------------
  init | [3]   | [3]   |     —
   1   | [2]   | [0]   |    No
   2   | [0]   | [2]   |    No
   3   | [-4]  | [-4]  |   YES ✓ → meeting point = [-4]

Phase 2 - Locate entry:
  Reset slow = head = [3], fast stays at [-4]

  Step | slow  | fast  | slow==fast?
  -----|-------|-------|------------
   1   | [2]   | [2]   |   YES ✓ → cycle entry = [2]!

  (slow traveled x1=1 step from head, fast traveled x3=1 step from [-4])

Return node(2) ✓

Example: head = [1→2→3→4→5], cycle entry at node [3]

  x1 = 2 ([1]→[2]→[3])
  Cycle: [3]→[4]→[5]→[3], length C = 3
  Meeting point (computed): x2 depends on when fast laps slow

Phase 1:
  init: slow=[1], fast=[1]
   1:   slow=[2], fast=[3]
   2:   slow=[3], fast=[5]
   3:   slow=[4], fast=[4] ← meeting point = [4]
         x2=1 (entry[3]→meeting[4]), x3=2 ([4]→[5]→[3])
         Verify: x1=2 == x3=2 ✓

Phase 2: slow=head=[1], fast=[4]
   1: slow=[2], fast=[5]
   2: slow=[3], fast=[3] ← MEET at [3] = cycle entry ✓

Example: no cycle [1→2→3→null]

Phase 1:
  fast=[1], fast.next=[2] ✓
   1: slow=[2], fast=[3]
   fast=[3], fast.next=null ✗ → loop exits
Return null ✓

Comparison:
  Approach              | Time   | Space | Notes
  ----------------------|--------|-------|---------------------------
  Hash Set              | O(n)   | O(n)  | Intuitive, direct
  Floyd's + Math (this) | O(n)   | O(1)  | Elegant, needs math proof
*/

var detectCycle = function(head) {
    let slow = head, fast = head;

    // Phase 1: Detect cycle using Floyd's algorithm
    while(fast && fast.next) {
      slow = slow.next;        // Tortoise: 1 step
      fast = fast.next.next;   // Hare: 2 steps

      if(slow == fast) {       // Meeting point found (inside cycle)

        // Phase 2: Find cycle entry using x1 == x3 property
        slow = head;           // Reset slow to head (fast stays at meeting point)

        while(slow != fast) {  // Both move 1 step until they meet
          slow = slow.next;
          fast = fast.next;
        }

        return slow;           // Meeting point = cycle entry node
      }
    }

    return null;  // fast reached null → no cycle exists
};