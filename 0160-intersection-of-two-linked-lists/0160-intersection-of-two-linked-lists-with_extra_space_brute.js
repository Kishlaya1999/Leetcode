/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

/*
Approach: Hash Set of List A Nodes

Intuition:
- Two linked lists "intersect" when they share the SAME NODE in memory
  (not just equal values — the actual same node object, from that point
  the lists merge into one and share all subsequent nodes)
- The challenge: we can only move forward in a linked list, so we can't
  compare backwards from the tail
- Simplest idea: remember every node we've seen in list A, then check
  if any node in list B was already seen
- If list B ever visits a node that's in our Set, that's the intersection point!
- We check node REFERENCES (not values) since intersection means same
  physical node in memory

Key Idea:
- Pass 1: Traverse list A and store every node's reference in a Set
- Pass 2: Traverse list B and check each node against the Set
  * First node found in the Set = intersection node → return it
  * If we reach null without a match → no intersection → return null

Algorithm:
1. Initialize currA = headA, empty Set 'nodesInA'
2. Pass 1 - Populate Set:
   - Traverse list A, adding each node reference to nodesInA
3. Initialize currB = headB
4. Pass 2 - Find intersection:
   - Traverse list B, checking each node against nodesInA
   - If nodesInA.has(currB): return currB (intersection found!)
   - Advance currB = currB.next
5. Return null (no intersection)

Example 1: Lists intersect at node [8]

  List A: 4 → 1 → 8 → 4 → 5
                   ↑
  List B: 5 → 6 → 1 → 8 → 4 → 5
                       (same node as above)

  Wait — intersection is at the node where they MERGE, meaning from
  that node onward, both lists are literally the same chain:

  A: [4] → [1] ↘
                 [8] → [4] → [5]
  B: [5] → [6] → [1] ↗

  Pass 1 (build Set from A):
    nodesInA = {[4(A)], [1(A)], [8], [4], [5]}

  Pass 2 (scan B):
    currB=[5(B)]: nodesInA.has([5(B)])? No → advance
    currB=[6(B)]: nodesInA.has([6(B)])? No → advance
    currB=[1(B)]: nodesInA.has([1(B)])? No → advance
    currB=[8]:    nodesInA.has([8])?    YES ✓ → return [8]

  Return node(8) ✓

Example 2: No intersection

  List A: 2 → 6 → 4
  List B: 1 → 5

  Pass 1: nodesInA = {[2], [6], [4]}
  Pass 2:
    currB=[1]: not in Set → advance
    currB=[5]: not in Set → advance
    currB=null → loop ends
  Return null ✓

Example 3: Same value, different nodes (NOT intersection)

  List A: [1(obj1)] → [2(obj2)]
  List B: [1(obj3)] → [2(obj4)]

  - nodesInA = {obj1, obj2}
  - obj3 and obj4 are DIFFERENT objects even though values match
  - nodesInA.has(obj3)? No
  - nodesInA.has(obj4)? No
  - Return null ✓ (correct — different node objects, no intersection)

State table (Example 1, Pass 2):
  Step | currB node | In nodesInA? | Action
  -----|------------|--------------|------------------
   1   |   [5(B)]   |     No       | advance currB
   2   |   [6(B)]   |     No       | advance currB
   3   |   [1(B)]   |     No       | advance currB
   4   |    [8]     |    YES ✓     | return node(8)

Time Complexity: O(m + n) - one pass through each list
                  (m = length of list A, n = length of list B)
Space Complexity: O(m) - Set stores all nodes from list A

Optimized Alternative - Two Pointer Technique (O(1) Space):
- Use two pointers, one for each list
- When a pointer reaches the end of its list, redirect it to the
  HEAD of the OTHER list
- Both pointers will have traveled m+n total steps when they meet
  at the intersection (or both reach null if no intersection)

Comparison:
  Approach              | Time      | Space | Notes
  ----------------------|-----------|-------|---------------------------
  Hash Set (this) ✓     | O(m + n)  | O(m)  | Intuitive, two passes
  Two-pointer technique | O(m + n)  | O(1)  | Elegant, single traversal
*/

var getIntersectionNode = function (headA, headB) {

  let currA = headA;
  let nodesInA = new Set();  // Stores all node references from list A

  // Pass 1: Populate Set with every node in list A
  while (currA) {
    nodesInA.add(currA);    // Store node reference (not value!)
    currA = currA.next;
  }

  // Pass 2: Check each node in list B against the Set
  let currB = headB;
  while (currB) {
    if (nodesInA.has(currB)) {
      return currB;         // First match = intersection node
    }
    currB = currB.next;
  }

  return null;  // No intersection found
};