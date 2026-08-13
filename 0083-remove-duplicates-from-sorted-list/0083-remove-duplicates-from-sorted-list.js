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
Approach: Single Pointer In-Place Deduplication (Cleaner Version)

Intuition:
- Previous approach used two pointers (prev and curr) to compare
  adjacent nodes — but do we actually need two pointers?
- Key observation: since we never delete the CURRENT node (only its
  duplicate successor), we can compare curr with curr.next directly
  using just ONE pointer!
- curr "looks ahead" at curr.next rather than looking back at prev
- This simplifies the code significantly without changing the logic:
  * curr.val == curr.next.val → skip curr.next (curr.next = curr.next.next)
  * curr.val != curr.next.val → advance curr forward
- Loop condition `curr && curr.next` ensures both nodes are valid
  before any comparison or access

Key Idea:
- Single pointer 'curr' starts at head
- At each step, compare curr.val with curr.next.val:
  * DUPLICATE (equal): skip curr.next by rewiring curr.next = curr.next.next
    DON'T advance curr (new curr.next might also match!)
  * UNIQUE (different): safely advance curr = curr.next
- Loop ends when curr or curr.next is null (nothing left to compare)

Algorithm:
1. Initialize curr = head
2. While curr != null AND curr.next != null:
   - If curr.val == curr.next.val (duplicate ahead):
     * Skip: curr.next = curr.next.next
   - Else (next is unique):
     * Advance: curr = curr.next
3. Return head

Example 1: head = [1 → 1 → 2 → 3 → 3]

Initial: curr = [1(1st)]
  [1] → [1] → [2] → [3] → [3]
   ↑curr

Step 1: curr=[1], curr.next=[1] → 1 == 1 DUPLICATE
  curr.next = curr.next.next = [2]
  [1] → [2] → [3] → [3]   (DON'T advance curr)
   ↑curr

Step 2: curr=[1], curr.next=[2] → 1 != 2 UNIQUE
  curr = curr.next = [2]
  [1] → [2] → [3] → [3]
          ↑curr

Step 3: curr=[2], curr.next=[3(1st)] → 2 != 3 UNIQUE
  curr = curr.next = [3(1st)]
  [1] → [2] → [3] → [3]
                ↑curr

Step 4: curr=[3(1st)], curr.next=[3(2nd)] → 3 == 3 DUPLICATE
  curr.next = curr.next.next = null
  [1] → [2] → [3] → null   (DON'T advance curr)
                ↑curr

Step 5: curr=[3], curr.next=null → loop condition fails
Loop ends
Return [1 → 2 → 3] ✓

Example 2: head = [1 → 1 → 1 → 2] (triple duplicate)

Initial: curr = [1(1st)]

Step 1: curr=[1(1st)], curr.next=[1(2nd)] → DUPLICATE
  curr.next = [1(3rd)]
  [1] → [1] → [2]
   ↑curr

Step 2: curr=[1(1st)], curr.next=[1(3rd)] → DUPLICATE
  curr.next = [2]
  [1] → [2]
   ↑curr

Step 3: curr=[1], curr.next=[2] → UNIQUE
  curr = [2]

Step 4: curr=[2], curr.next=null → loop ends
Return [1 → 2] ✓

State table (Example 1):
  Step | curr   | curr.next | Equal? | Action           | List state
  -----|--------|-----------|--------|------------------|-------------
  init | [1(1)] |  [1(2)]   |  YES   | skip [1(2)]      | [1→1→2→3→3]
   1   | [1(1)] |   [2]     |  NO    | advance curr     | [1→2→3→3]
   2   |  [2]   |  [3(1)]   |  NO    | advance curr     | [1→2→3→3]
   3   | [3(1)] |  [3(2)]   |  YES   | skip [3(2)]      | [1→2→3→3]
   4   | [3(1)] |   null    |   —    | loop ends        | [1→2→3]

Comparison with previous two-pointer approach:
  Approach             | Pointers | Logic
  ---------------------|----------|------------------------------------------
  prev + curr (before) |    2     | compare prev.val with curr.val (look back)
  curr only (this) ✓   |    1     | compare curr.val with curr.next.val (look ahead)
  Both achieve identical results — this version is simply more concise

Time Complexity: O(n) - single pass, each node visited exactly once
Space Complexity: O(1) - only one pointer variable
*/

var deleteDuplicates = function(head) {

  let curr = head;  // Single pointer, starts at head

  while (curr && curr.next) {  // Need both curr and curr.next to be valid
    if(curr.val == curr.next.val) {
      // Duplicate ahead: skip curr.next (don't advance — recheck new curr.next!)
      curr.next = curr.next.next;
    } else {
      // Next is unique: safe to move forward
      curr = curr.next;
    }
  }

  return head;  // Head always valid (first occurrence never deleted)
};