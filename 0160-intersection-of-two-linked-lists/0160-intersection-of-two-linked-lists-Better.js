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
Approach: Length Difference + Aligned Two-Pointer Traversal

Intuition:
- If two lists intersect, they MUST share the same tail (from the
  intersection node onward, they are literally the same chain)
- The problem with comparing node by node from both heads: the lists
  may have different lengths, so their "endings" are offset
- Key insight: if we could START both pointers at the same distance
  from the intersection, they would meet exactly at the intersection!
- How? Find the length difference, advance the longer list's pointer
  by that difference — now both pointers are equidistant from the end
- From this aligned starting position, move both one step at a time
  until they point to the same node (intersection) or both hit null

Key Idea:
- Compute lengths of both lists (lenA, lenB)
- Calculate diff = |lenA - lenB|
- Advance the pointer of the LONGER list by 'diff' steps
  (this aligns both pointers so they're equidistant from the tail)
- Move both pointers in sync until they meet (intersection) or
  both reach null (no intersection)

Algorithm:
1. Pass 1: Count lenA (traverse list A) and lenB (traverse list B)
2. Calculate diff = |lenA - lenB|
3. Reset currA = headA, currB = headB
4. Advance the pointer of the longer list by 'diff' steps
5. Move both pointers forward in sync:
   - If currA == currB (same node reference): return that node
   - Advance both: currA = currA.next, currB = currB.next
6. Return null if loop ends without intersection

Example: Lists intersect at node [8]

  List A (length=5): [4] → [1] → [8] → [4] → [5]
  List B (length=6): [5] → [6] → [1] → [8] → [4] → [5]
                                         ↑ same physical nodes from here

  Step 1 - Count lengths:
    lenA = 5, lenB = 6, diff = 1

  Step 2 - Advance longer list (B) by diff=1:
    currB = [6] (skip first node of B)

  Now both pointers are equidistant from the tail:
    currA: [4] → [1] → [8] → [4] → [5]
    currB: [6] → [1] → [8] → [4] → [5]
    (both have 5 nodes remaining to traverse)

  Step 3 - Move in sync:
  currA=[4], currB=[6]: [4] != [6] → advance both
  currA=[1], currB=[1]: [1(A)] != [1(B)] → advance both (different objects!)
  currA=[8], currB=[8]: [8] == [8] ✓ → return node(8)

  Return node(8) ✓

Example: No intersection

  List A (length=3): [2] → [6] → [4]
  List B (length=2): [1] → [5]

  diff = 3 - 2 = 1
  Advance currA by 1: currA = [6]

  Sync traversal:
    currA=[6], currB=[1]: [6] != [1] → advance
    currA=[4], currB=[5]: [4] != [5] → advance
    currA=null, currB=null → loop ends
  Return null ✓

Example: Equal length lists, intersection at first node

  List A (length=3): [8] → [4] → [5]
  List B (length=3): [8] → [4] → [5] (same nodes!)
                      ↑ intersect at [8]

  diff = 0, neither pointer is advanced
  Sync traversal:
    currA=[8], currB=[8]: [8] == [8] ✓ → return node(8) immediately

State table (main example):
  Step | currA | currB | currA == currB?
  -----|-------|-------|----------------
   1   |  [4]  |  [6]  |      No
   2   |  [1A] |  [1B] |      No  (same value, different objects!)
   3   |  [8]  |  [8]  |     YES ✓ → return node(8)

Time Complexity: O(m + n) - two passes to count + one aligned pass
Space Complexity: O(1) - only pointer and counter variables used

Comparison across all three approaches:
  Approach                  | Time      | Space | Passes
  --------------------------|-----------|-------|-------
  Hash Set                  | O(m + n)  | O(m)  |   2
  Length diff + align (this)| O(m + n)  | O(1)  |   3
  Two-pointer redirect ✓    | O(m + n)  | O(1)  |   1  ← most elegant
*/

var getIntersectionNode = function(headA, headB) {
    let lenA = 0, lenB = 0;  // Fix: use comma, not semicolon after lenA = 0
    let currA = headA, currB = headB;

    // Pass 1: Count length of list A
    while(currA) {
      lenA++;
      currA = currA.next;
    }

    // Pass 2: Count length of list B
    while(currB) {
      lenB++;
      currB = currB.next;
    }

    let diff = lenA > lenB ? lenA - lenB : lenB - lenA;  // |lenA - lenB|

    // Reset both pointers to their respective heads
    currA = headA;
    currB = headB;

    // Advance the pointer of the longer list by 'diff' steps to align them
    if(lenA > lenB) {
      for(let i = 0; i < diff; i++) {
        currA = currA.next;  // Skip first 'diff' nodes of longer list A
      }
    } else if(lenA < lenB) {
      for(let i = 0; i < diff; i++) {
        currB = currB.next;  // Skip first 'diff' nodes of longer list B
      }
    }

    // Move both pointers in sync until they meet or both reach null
    while(currA && currB) {
      if(currA == currB) return currA;  // Same node reference = intersection!

      currA = currA.next;
      currB = currB.next;
    }

    return null;  // No intersection found
};