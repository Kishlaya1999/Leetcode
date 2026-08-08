/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

/*
Approach: Iterative In-Place Merge with Dummy Node (Optimal)

Intuition:
- Previous approach created brand new nodes for each element (O(m+n) space)
- Can we do better? Both lists already have nodes with the correct values —
  we just need to RELINK their 'next' pointers in sorted order
- Challenge with in-place relinking: we need to track the head of the
  result list separately, which adds complexity
- Elegant trick: use a DUMMY (sentinel) node as a fake head
  * The dummy node is a placeholder we prepend before the actual result
  * 'curr' starts at dummy and builds the merged list forward
  * At the end, dummy.next is the actual head of the merged list
  * This eliminates the need to special-case the first node!

Key Idea:
- Create a dummy node as the starting anchor of the result list
- Use 'curr' pointer to track the tail of the result list (starts at dummy)
- Always attach the smaller node directly (no new node creation!)
- When one list is exhausted, attach the rest of the other list directly
- Return dummy.next (skipping the dummy node itself)

Algorithm:
1. Create dummyNode (sentinel) and set curr = dummyNode
2. While both lists are non-null:
   - If list1.val < list2.val:
     * Relink: curr.next = list1 (attach list1's node directly)
     * Advance curr and list1 forward
   - Else:
     * Relink: curr.next = list2 (attach list2's node directly)
     * Advance curr and list2 forward
3. Attach remaining nodes of whichever list isn't exhausted
4. Return dummyNode.next (actual head, skipping the dummy)

Example: list1 = 1 → 2 → 4, list2 = 1 → 3 → 4

Initial:
  dummyNode(0) → null
  curr = dummyNode
  list1: [1] → [2] → [4]
  list2: [1] → [3] → [4]

Step 1: list1.val=1, list2.val=1 → 1 < 1? No → attach list2
  curr.next = list2(1), curr = list2(1)
  list2 → 3
  dummy(0) → [1(L2)]
                ↑curr

Step 2: list1.val=1, list2.val=3 → 1 < 3? Yes → attach list1
  curr.next = list1(1), curr = list1(1)
  list1 → 2
  dummy(0) → [1(L2)] → [1(L1)]
                          ↑curr

Step 3: list1.val=2, list2.val=3 → 2 < 3? Yes → attach list1
  curr.next = list1(2), curr = list1(2)
  list1 → 4
  dummy(0) → [1(L2)] → [1(L1)] → [2(L1)]
                                     ↑curr

Step 4: list1.val=4, list2.val=3 → 4 < 3? No → attach list2
  curr.next = list2(3), curr = list2(3)
  list2 → 4
  dummy(0) → [1(L2)] → [1(L1)] → [2(L1)] → [3(L2)]
                                               ↑curr

Step 5: list1.val=4, list2.val=4 → 4 < 4? No → attach list2
  curr.next = list2(4), curr = list2(4)
  list2 → null
  dummy(0) → [1] → [1] → [2] → [3] → [4(L2)]
                                         ↑curr

Loop ends: list2 == null
  list1 != null → curr.next = list1(4)
  dummy(0) → [1] → [1] → [2] → [3] → [4] → [4]

Return dummyNode.next = node(1)
Result: 1 → 1 → 2 → 3 → 4 → 4 ✓

State table:
  Step | list1 | list2 | Attached  | curr points to
  -----|-------|-------|-----------|----------------
  init |   1   |   1   |     —     | dummy(0)
   1   |   1   |   3   |  list2(1) | node(1) L2
   2   |   2   |   3   |  list1(1) | node(1) L1
   3   |   4   |   3   |  list1(2) | node(2) L1
   4   |   4   |   4   |  list2(3) | node(3) L2
   5   |   4   |  null |  list2(4) | node(4) L2
  tail |  null |  null |  list1(4) | node(4) L1

Why the dummy node is elegant:
- Without dummy: need special case to initialize head on first iteration
- With dummy: curr.next = firstNode works uniformly on every iteration
  (no if/else needed to set head vs append to tail)
- dummy.next always points to the actual result head after the loop

Time Complexity: O(m + n) - each node from both lists visited exactly once
Space Complexity: O(1) - only relinks existing nodes, just one dummy node created

Comparison with Previous Approach:
  Approach               | Time      | Space    | New nodes created?
  ------------------------|-----------|----------|-------------------
  New node creation       | O(m + n)  | O(m + n) | Yes (every element)
  In-place + dummy node ✓ | O(m + n)  | O(1)     | No (reuses existing)
*/

var mergeTwoLists = function(list1, list2) {
    let dummyNode = new ListNode();  // Sentinel node to simplify head tracking
    let curr = dummyNode;            // curr tracks the tail of the result list

    // Merge while both lists have remaining nodes
    while(list1 != null && list2 != null) {
      if(list1.val < list2.val) {
        curr.next = list1;    // Relink: attach list1's node directly
        curr = curr.next;     // Advance result tail
        list1 = list1.next;   // Advance list1 pointer
      } else {
        curr.next = list2;    // Relink: attach list2's node directly
        curr = curr.next;     // Advance result tail
        list2 = list2.next;   // Advance list2 pointer
      }
    }

    // Attach remaining nodes of whichever list isn't exhausted
    if(list1 == null) {
      curr.next = list2;  // list1 exhausted, attach rest of list2
    } else {
      curr.next = list1;  // list2 exhausted, attach rest of list1
    }

    return dummyNode.next;  // Skip dummy node, return actual merged head
};