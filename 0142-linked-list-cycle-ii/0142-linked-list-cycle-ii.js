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
Approach: Hash Set of Visited Nodes

Intuition:
- Previously for hasCycle we just needed a YES/NO answer
- Now we need to find the EXACT NODE where the cycle begins
- The cycle entry node is the first node we visit TWICE during traversal
- A Set of visited node references solves this directly:
  * Traverse node by node, storing each reference in the Set
  * The moment we encounter a node already in the Set — that's the
    cycle entry node! (first node visited twice = where cycle begins)
  * If we reach null, there's no cycle → return null

Key Idea:
- Traverse the list maintaining a Set of visited node references
- BEFORE adding curr to the Set, check if it's already there:
  * If YES: curr is the cycle entry node → return curr
  * If NO: add curr to Set, advance to next node
- Return null if traversal reaches the end (no cycle)

Algorithm:
1. Base case: null head → return null
2. Initialize empty Set 'ans', curr = head
3. While curr != null:
   - If Set already has curr: return curr (cycle entry found!)
   - Add curr to Set
   - Advance curr = curr.next
4. Return null (no cycle)

Example 1: head = [3→2→0→-4], cycle entry at node [2]

List structure:
  [3] → [2] → [0] → [-4]
          ↑               |
          └───────────────┘ (cycle back to [2])

  Step | curr  | Set has curr? | Action
  -----|-------|---------------|---------------------------
   1   |  [3]  |      No       | add [3], advance
   2   |  [2]  |      No       | add [2], advance
   3   |  [0]  |      No       | add [0], advance
   4   | [-4]  |      No       | add [-4], advance
   5   |  [2]  |     YES ✓     | return [2] (cycle entry!)

Return node(2) ✓

Example 2: head = [1→2], cycle entry at node [1]

List structure:
  [1] → [2]
   ↑         |
   └─────────┘

  Step | curr  | Set has curr? | Action
  -----|-------|---------------|---------------------------
   1   |  [1]  |      No       | add [1], advance
   2   |  [2]  |      No       | add [2], advance
   3   |  [1]  |     YES ✓     | return [1]

Return node(1) ✓

Example 3: head = [1→2→3] (no cycle)

  Step | curr  | Set has curr? | Action
  -----|-------|---------------|---------------------------
   1   |  [1]  |      No       | add [1], advance
   2   |  [2]  |      No       | add [2], advance
   3   |  [3]  |      No       | add [3], advance
   4   |  null |      —        | loop ends
Return null ✓

Time Complexity: O(n) - visits each node at most twice before finding cycle entry
Space Complexity: O(n) - Set stores up to n node references

Optimized Alternative - Floyd's + Math (O(1) Space):
Finding the cycle ENTRY using Floyd's algorithm requires a mathematical insight:
- Phase 1: Use slow/fast pointers to DETECT the cycle (they meet inside it)
- Phase 2: After meeting, place one pointer at head, keep other at meeting point
  Both move 1 step at a time — they meet EXACTLY at the cycle entry node!

Why Phase 2 works (math):
- Let D = distance from head to cycle entry
- Let C = cycle length
- Let M = distance from cycle entry to meeting point
- When they meet: slow traveled (D + M), fast traveled (D + M + C)
  Fast = 2 × Slow → D + M + C = 2(D + M) → C = D + M → D = C - M
- From meeting point, the cycle entry is (C - M) steps ahead
- From head, the cycle entry is D = (C - M) steps ahead
- So both pointers travel the same distance to reach cycle entry!

var detectCycle = function(head) {
    let slow = head, fast = head;
    
    // Phase 1: Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;  // Meeting point found
    }
    
    // No cycle detected
    if (!fast || !fast.next) return null;
    
    // Phase 2: Find cycle entry
    slow = head;  // Reset slow to head
    while (slow !== fast) {
        slow = slow.next;   // Both move 1 step
        fast = fast.next;   // They meet at cycle entry
    }
    return slow;  // Cycle entry node
};

Comparison:
  Approach          | Time   | Space | Notes
  ------------------|--------|-------|---------------------------
  Hash Set (this) ✓ | O(n)   | O(n)  | Intuitive, direct
  Floyd's + Math    | O(n)   | O(1)  | Clever, needs math insight
*/

var detectCycle = function(head) {
    if(!head) return null;  // Empty list has no cycle

    let ans = new Set();    // Stores visited node references
    let curr = head;
    
    while(curr) {
      // First revisited node = cycle entry point
      if(ans.has(curr)) {
        return curr;
      }
      ans.add(curr);        // Mark as visited
      curr = curr.next;
    }
    
    return null;  // Reached end → no cycle
};