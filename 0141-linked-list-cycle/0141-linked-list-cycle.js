/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

/*
Approach: Floyd's Cycle Detection (Tortoise and Hare)

Intuition:
- A cycle exists when some node's 'next' pointer points back to a
  previously visited node, creating an infinite loop
- Naive approach: use a Set to store visited nodes — if we visit
  a node we've seen before, there's a cycle (O(n) space)
- Can we detect a cycle without extra space?
- Key insight: imagine two runners on a circular track — if there's
  a loop, the faster runner will eventually LAP the slower one and
  they'll meet at the same point!
- If there's NO loop, the fast runner simply reaches the end (null)
  and we know there's no cycle

Key Idea:
- Use two pointers: slow (1 step) and fast (2 steps)
- If there's NO cycle: fast will reach null → return false
- If there IS a cycle: fast will eventually "lap" slow and they
  will point to the EXACT SAME NODE → return true
- The check `slow == fast` compares node REFERENCES (same node in
  memory), not values (different nodes can have the same value)

Algorithm:
1. Base case: if head is null or single node (no next), no cycle possible
2. Initialize slow = head, fast = head
3. While fast != null AND fast.next != null:
   - Advance slow one step: slow = slow.next
   - Advance fast two steps: fast = fast.next.next
   - If slow == fast (same node reference): cycle detected! return true
4. Loop exits naturally → fast reached null → no cycle → return false

Example 1: 3 → 2 → 0 → -4 → (back to 2) [HAS CYCLE]

List structure:
  [3] → [2] → [0] → [-4]
         ↑              |
         └──────────────┘

  Step | slow | fast | slow == fast?
  -----|------|------|-------------
  init |  3   |  3   |      —
   1   |  2   |  0   |     No
   2   |  0   | -4   |     No
   3   | -4   |  0   |     No
   4   |  2   | -4   |     No
   5   |  0   |  2   |     No
   6   | -4   | -4   |    YES ✓ → return true

Example 2: 1 → 2 → 3 → 4 → null [NO CYCLE]

  Step | slow | fast | fast.next | Condition
  -----|------|------|-----------|------------------
  init |  1   |  1   |     2     | both at head
   1   |  2   |  3   |     4     | continue
   2   |  3   |  null|     —     | fast==null → loop ends
  Return false ✓

Example 3: head = null (edge case)
- head == null → return false immediately ✓

Example 4: head = [1] → null (single node, edge case)
- head.next == null → return false immediately ✓

Why slow and fast will ALWAYS meet (math behind it):
- Let the cycle length be C and the distance to cycle entry be D
- When slow enters the cycle, fast is already D steps ahead inside it
- Relative speed of fast w.r.t. slow = 2 - 1 = 1 step per iteration
- So fast "gains" 1 step on slow per iteration
- Since fast gains on slow by 1 step each time within a cycle of
  length C, they MUST meet within C iterations of slow entering the cycle

Time Complexity: O(n) - in the worst case, fast pointer traverses
                  the entire list before catching slow in the cycle
Space Complexity: O(1) - only two pointer variables, no extra data structure

Comparison with Hash Set Approach:
  Approach              | Time   | Space  | Notes
  ----------------------|--------|--------|---------------------------
  Hash Set (visited)    | O(n)   | O(n)   | Store all visited nodes
  Floyd's Detection ✓   | O(n)   | O(1)   | No extra storage needed
*/

var hasCycle = function(head) {
    // Base case: null list or single node cannot have a cycle
    if(head == null || head.next == null) {
      return false;
    }

    let slow = head, fast = head;  // Both start at head

    while(fast != null && fast.next != null) {
      slow = slow.next;        // Tortoise: 1 step
      fast = fast.next.next;   // Hare: 2 steps

      // Same node reference means they've met inside the cycle
      if(slow == fast) return true;
    }

    // fast reached null → list has an end → no cycle
    return false;
};