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
Approach: Hash Set of Visited Nodes

Intuition:
- A cycle exists when traversal leads us back to a node we've already seen
- The most direct way to detect "have I been here before?" is to simply
  remember every node we visit
- Use a Set to store node REFERENCES (not values — different nodes can
  share the same value, but each node object is unique in memory)
- If we ever encounter a node already in our Set, we've found a cycle
- If we reach null, the list has a proper end — no cycle exists

Key Idea:
- Traverse the list node by node, storing each node's reference in a Set
- Before adding a node, check if it's already in the Set:
  * If YES: we've revisited a node → cycle detected → return true
  * If NO: add it to the Set and move forward
- If curr reaches null: traversal completed without revisiting → return false

Algorithm:
1. Base case: null list or single node with no next → no cycle possible
2. Initialize empty Set 'seenNodes', curr = head
3. While curr != null:
   - If seenNodes already has curr (same node reference): return true
   - Else: add curr to seenNodes, advance curr = curr.next
4. Loop exits → curr == null → no cycle → return false

Example 1: 3 → 2 → 0 → -4 → (back to 2) [HAS CYCLE]

List structure:
  [3] → [2] → [0] → [-4]
         ↑               |
         └───────────────┘

  Step | curr  | seenNodes has curr? | Action
  -----|-------|---------------------|---------------------------
   1   |  [3]  |     No              | add [3], curr → [2]
   2   |  [2]  |     No              | add [2], curr → [0]
   3   |  [0]  |     No              | add [0], curr → [-4]
   4   | [-4]  |     No              | add [-4], curr → [2]
   5   |  [2]  |    YES ✓            | return true (cycle found!)

Example 2: 1 → 2 → 3 → null [NO CYCLE]

  Step | curr  | seenNodes has curr? | Action
  -----|-------|---------------------|---------------------------
   1   |  [1]  |     No              | add [1], curr → [2]
   2   |  [2]  |     No              | add [2], curr → [3]
   3   |  [3]  |     No              | add [3], curr → null
   4   |  null |     —               | loop exits → return false ✓

Example 3: head = null
  - head == null → return false immediately ✓

Example 4: head = [1] → null (single node)
  - head.next == null → return false immediately ✓

Why node REFERENCES and not values matter:
  Consider: [1] → [1] → [1] (no cycle, but all values are 1)
  - Storing values in the Set would incorrectly detect a "cycle" at step 2
  - Storing node references (the actual objects) correctly identifies
    these as three distinct nodes → no cycle detected ✓

Time Complexity: O(n) - visits each node at most once before detecting
                  a cycle or reaching null
Space Complexity: O(n) - Set stores up to n node references in the
                   worst case (no cycle, entire list stored)

Comparison with Floyd's Cycle Detection:
  Approach              | Time   | Space  | Notes
  ----------------------|--------|--------|-----------------------------
  Hash Set (this) ✓     | O(n)   | O(n)   | Intuitive, easy to understand
  Floyd's Tortoise/Hare | O(n)   | O(1)   | No extra space, two pointers
*/

var hasCycle = function(head) {

  // Base case: null list or single node cannot have a cycle
  if(head == null || head.next == null) {
    return false;
  }

  let seenNodes = new Set();  // Stores references to visited nodes
  let curr = head;
  
  while(curr) {
    // If we've seen this exact node before, we've found a cycle
    if(seenNodes.has(curr)) return true;

    seenNodes.add(curr);  // Mark current node as visited
    curr = curr.next;     // Move to next node
  }

  // curr reached null → list has a proper end → no cycle
  return false;
};