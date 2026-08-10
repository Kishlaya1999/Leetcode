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
Approach: Two-Pointer Redirect Technique (Optimal)

Intuition:
- Previous approach needed 3 passes (count lenA, count lenB, aligned traversal)
- Can we align both pointers WITHOUT knowing the lengths?
- Key mathematical insight:
  * Let list A have length a + c (a = nodes before intersection, c = common tail)
  * Let list B have length b + c (b = nodes before intersection, c = common tail)
  * If pointer t1 travels A then redirects to B: it covers a + c + b steps to intersection
  * If pointer t2 travels B then redirects to A: it covers b + c + a steps to intersection
  * a + c + b == b + c + a (same total distance!)
  * So both pointers reach the intersection at the EXACT SAME TIME!
- If there's NO intersection: both pointers reach null simultaneously
  (they travel a+c+b+c and b+c+a+c... but c=0, so both travel a+b
  and meet at null at the same time)

Key Idea:
- Use two pointers t1 (starts at headA) and t2 (starts at headB)
- Move both forward one step at a time
- When a pointer reaches null, redirect it to the HEAD OF THE OTHER LIST
- They will meet at the intersection node (or both become null if no intersection)
- The redirect essentially compensates for the length difference without
  explicitly calculating it!

Algorithm:
1. Initialize t1 = headA, t2 = headB
2. While t1 != t2:
   - Advance both: t1 = t1.next, t2 = t2.next
   - If t1 == t2 (both null or same node): return t1
   - If t1 == null: redirect to headB
   - If t2 == null: redirect to headA
3. Return t1 (loop exits when t1 == t2, either intersection or null)

Example 1: Lists intersect at node [8]

  List A (len=4): [4] → [1] → [8] → [4]
  List B (len=5): [5] → [6] → [1] → [8] → [4]
                                      ↑ intersection

  a=2 (nodes before [8] in A), b=3 (nodes before [8] in B), c=2 (common tail)
  t1 travels: A(4 nodes) + redirect + B until [8] = 2+c + b = 2+2+3 = 7 steps
  t2 travels: B(5 nodes) + redirect + A until [8] = 3+c + a = 3+2+2 = 7 steps
  Both reach [8] after same number of steps ✓

  Step | t1        | t2        | t1==t2?
  -----|-----------|-----------|--------
  init | [4(A)]    | [5(B)]    |  No
   1   | [1(A)]    | [6(B)]    |  No
   2   | [8]       | [1(B)]    |  No
   3   | [4(tail)] | [8]       |  No
   4   | null→headB| [4(tail)] |  No (t1 redirected to headB)
   5   | [5(B)]    | null→headA|  No (t2 redirected to headA)
   6   | [6(B)]    | [4(A)]    |  No
   7   | [1(B)]    | [1(A)]    |  No
   8   | [8]       | [8]       |  YES ✓ → return node(8)

Example 2: No intersection

  List A (len=3): [2] → [6] → [4]
  List B (len=2): [1] → [5]

  a=3, b=2, c=0 (no common tail)
  t1 travels: 3 + 2 = 5 steps before hitting null (after redirect)
  t2 travels: 2 + 3 = 5 steps before hitting null (after redirect)
  Both become null at the same time!

  Step | t1      | t2      | t1==t2?
  -----|---------|---------|--------
  init | [2]     | [1]     |  No
   1   | [6]     | [5]     |  No
   2   | [4]     | null→hA |  No (t2 redirected to headA)
   3   | null→hB | [2]     |  No (t1 redirected to headB)
   4   | [1]     | [6]     |  No
   5   | [5]     | [4]     |  No
   6   | null    | null    |  YES (both null) → return null ✓

Why the check `if(t1 == t2) return t1` inside the loop:
- After advancing both pointers, we check immediately before the
  null redirect check
- This catches the case where BOTH become null at the same step
  (no intersection) and returns null correctly
- Without this inner check, we'd redirect both to the other head
  and keep looping indefinitely!

Time Complexity: O(m + n) - each pointer travels at most m+n steps
Space Complexity: O(1) - only two pointer variables used

Comparison across all approaches:
  Approach                   | Time      | Space | Passes
  ---------------------------|-----------|-------|-------
  Hash Set                   | O(m + n)  | O(m)  |   2
  Length diff + align        | O(m + n)  | O(1)  |   3
  Two-pointer redirect (this)✓| O(m + n) | O(1)  |   1  ← most elegant
*/

var getIntersectionNode = function(headA, headB) {
    
    let t1 = headA, t2 = headB;  // t1 starts at A, t2 starts at B

    while(t1 != t2) {
      t1 = t1.next;   // Advance t1
      t2 = t2.next;   // Advance t2

      // Check immediately after advancing (catches both-null case)
      if(t1 == t2) return t1;

      // Redirect to other list's head when current list is exhausted
      if(t1 == null) t1 = headB;  // t1 finished A, now traverse B
      if(t2 == null) t2 = headA;  // t2 finished B, now traverse A
    }
  
  return t1;  // Either intersection node or null (if t1==t2 from the start)
};