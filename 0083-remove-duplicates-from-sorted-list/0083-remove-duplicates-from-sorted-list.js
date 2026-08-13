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
Approach: Single Pass Two-Pointer Deduplication

Intuition:
- The list is already SORTED, so duplicate values always appear
  consecutively — we don't need a Set or frequency map to track them
- We just need to detect when two adjacent nodes have the same value
  and skip the duplicate
- Use two pointers: 'prev' (last confirmed unique node) and 'curr'
  (node being examined)
- If prev.val == curr.val: curr is a duplicate → skip it (prev.next = curr.next)
- If prev.val != curr.val: curr is new unique → advance prev to curr
- Always advance curr regardless (we've examined it either way)
- Since we only delete duplicates (never the first occurrence), head
  always remains valid — no sentinel needed!

Key Idea:
- prev holds the last node we've committed to keeping
- curr scouts ahead looking for the next unique value
- When curr matches prev: rewire prev.next to skip curr
- When curr differs from prev: move prev up to curr (new unique found)
- curr always advances to the next node

Algorithm:
1. Base case: null list → return null
2. Initialize prev = head, curr = head.next
3. While curr != null:
   - If prev.val == curr.val (duplicate):
     * Skip curr: prev.next = curr.next
     * Don't advance prev (new curr.next might also be a duplicate!)
   - Else (new unique value):
     * Advance prev = curr
   - Always advance curr = curr.next
4. Return head (head is always the first unique node)

Example 1: head = [1 → 1 → 2 → 3 → 3]

Initial: prev=[1(1st)], curr=[1(2nd)]

  sentinel → [1] → [1] → [2] → [3] → [3] → null
              ↑prev  ↑curr

Step 1: prev.val=1, curr.val=1 → DUPLICATE
  prev.next = curr.next = [2]  (skip second [1])
  curr = curr.next = [2]
  [1] → [2] → [3] → [3]
   ↑prev  ↑curr

Step 2: prev.val=1, curr.val=2 → UNIQUE
  prev = curr = [2]
  curr = curr.next = [3]
  [1] → [2] → [3] → [3]
          ↑prev  ↑curr

Step 3: prev.val=2, curr.val=3 → UNIQUE
  prev = curr = [3(1st)]
  curr = curr.next = [3(2nd)]
  [1] → [2] → [3] → [3]
                ↑prev  ↑curr

Step 4: prev.val=3, curr.val=3 → DUPLICATE
  prev.next = curr.next = null  (skip second [3])
  curr = curr.next = null
  [1] → [2] → [3] → null
                ↑prev  curr=null

Loop ends: curr == null
Return head = [1 → 2 → 3] ✓

Example 2: head = [1 → 1 → 1 → 2] (multiple consecutive duplicates)

Initial: prev=[1(1st)], curr=[1(2nd)]

Step 1: 1 == 1 → DUPLICATE
  prev.next = [1(3rd)], curr = [1(3rd)]
  [1] → [1] → [2]
   ↑prev  ↑curr

Step 2: 1 == 1 → DUPLICATE (again! prev didn't move)
  prev.next = [2], curr = [2]
  [1] → [2]
   ↑prev  ↑curr

Step 3: 1 != 2 → UNIQUE
  prev = [2], curr = null
  [1] → [2]
          ↑prev  curr=null

Return [1 → 2] ✓
(Key: by NOT advancing prev after duplicates, we correctly handle
 chains of 3+ identical values)

Example 3: head = [1 → 2 → 3] (no duplicates, all unique)

Step 1: 1 != 2 → prev=[2], curr=[3]
Step 2: 2 != 3 → prev=[3], curr=null
Loop ends → Return [1 → 2 → 3] ✓ (unchanged)

State table (Example 1):
  Step | prev   | curr   | Action               | List state
  -----|--------|--------|----------------------|------------------
  init | [1(1)] | [1(2)] |  —                   | [1→1→2→3→3]
   1   | [1(1)] | [2]    | SKIP [1(2)]          | [1→2→3→3]
   2   | [2]    | [3(1)] | KEEP [2], prev→[2]   | [1→2→3→3]
   3   | [3(1)] | [3(2)] | KEEP [3], prev→[3]   | [1→2→3→3]
   4   | [3(1)] | null   | SKIP [3(2)]          | [1→2→3]

Why no sentinel needed here:
- We only DELETE duplicates, never the first occurrence of any value
- The head node is ALWAYS the first occurrence of its value → always kept
- So head never changes → safe to return head directly
- Compare with removeElements (where head itself might be deleted)
  → that needed a sentinel

Time Complexity: O(n) - single pass, each node visited exactly once
Space Complexity: O(1) - only two pointer variables
*/

var deleteDuplicates = function(head) {
    
    if(head == null) return null;  // Empty list, nothing to deduplicate

    let prev = head,        // Last confirmed unique node
        curr = head.next;   // Node currently being examined

    while(curr) {
      if(prev.val == curr.val) {
        // Duplicate found: skip curr by rewiring prev.next
        // Don't advance prev (next curr might also be duplicate!)
        prev.next = curr.next;
      } else {
        // New unique value found: commit curr by advancing prev
        prev = curr;
      }

      curr = curr.next;  // Always advance curr to next node
    }

    return head;  // Head is always valid (first unique node never deleted)
};