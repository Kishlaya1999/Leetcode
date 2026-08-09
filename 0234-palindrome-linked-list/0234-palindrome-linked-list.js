/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

/*
Approach: Find Middle + Reverse Second Half + Compare

Intuition:
- A palindrome reads the same forwards and backwards
- Simple approach: collect all values into an array, use two pointers
  to compare from both ends — but that's O(n) extra space
- Can we do it with O(1) space? Key insight: we only need to compare
  the first half with the second half IN REVERSE
- If we reverse the second half of the list in-place, we can then
  compare it against the first half node by node
- This combines two techniques we already know:
  1. Floyd's slow/fast pointer to find the middle
  2. In-place linked list reversal

Key Idea:
- Phase 1: Find the middle node using slow/fast pointers
- Phase 2: Reverse the second half of the list in-place (from mid to end)
- Phase 3: Compare the first half (from head) with reversed second half
           node by node — any mismatch means NOT a palindrome
- If all values match → it IS a palindrome

Algorithm:
1. Base case: null list is trivially a palindrome
2. Phase 1 - Find middle:
   - Use slow (1 step) and fast (2 steps) pointers
   - When fast reaches end, slow is at the middle
3. Phase 2 - Reverse second half:
   - Start from midNode (where slow stopped)
   - Use three-pointer reversal (prev, curr, front)
   - After loop, prev is the new head of reversed second half
4. Phase 3 - Compare both halves:
   - curr traverses from head (first half)
   - endNode traverses from prev (reversed second half)
   - If any values differ, return false
5. If comparison completes without mismatch, return true

Example 1: 1 → 2 → 2 → 1 (even length, IS palindrome)

Phase 1 - Find middle:
  slow/fast both start at [1]
  Step 1: slow=[2], fast=[2(3rd)]
  Step 2: slow=[2(3rd)], fast=null → loop ends
  midNode = [2(3rd)]

  [1] → [2] → [2] → [1]
                ↑mid

Phase 2 - Reverse from mid to end:
  Start: prev=null, curr=[2(3rd)]

  Step 1: front=[1], curr.next=null, prev=[2(3rd)], curr=[1]
  Step 2: front=null, curr.next=[2(3rd)], prev=[1], curr=null
  Loop ends: prev=[1] → [2] → null

  endNode = [1] → [2] → null

Phase 3 - Compare:
  curr=head=[1], endNode=[1]

  Step 1: curr.val=1, endNode.val=1 ✓ → advance both
  Step 2: curr.val=2, endNode.val=2 ✓ → advance both
  endNode=null → loop ends
  Return true ✓

Example 2: 1 → 2 → 3 → 2 → 1 (odd length, IS palindrome)

Phase 1 - Find middle:
  Step 1: slow=[2], fast=[3]
  Step 2: slow=[3], fast=[1(last)]
  fast.next=null → loop ends
  midNode = [3] (exact middle)

  [1] → [2] → [3] → [2] → [1]
                ↑mid

Phase 2 - Reverse from [3] to end:
  After reversal: prev=[1] → [2] → [3] → null
  endNode = [1] → [2] → [3] → null

Phase 3 - Compare:
  Step 1: curr.val=1, endNode.val=1 ✓
  Step 2: curr.val=2, endNode.val=2 ✓
  Step 3: curr.val=3, endNode.val=3 ✓
  endNode=null → loop ends
  Return true ✓

Example 3: 1 → 2 → 3 (NOT palindrome)

Phase 1: midNode = [3]
Phase 2: reversed second half = [3] → null (just [3])
Phase 3:
  Step 1: curr.val=1, endNode.val=3 ✗ → return false ✓

State table for Phase 3 (Example 1):
  Step | curr (1st half) | endNode (reversed 2nd) | Match?
  -----|-----------------|------------------------|-------
   1   |    val = 1      |       val = 1          |  ✓
   2   |    val = 2      |       val = 2          |  ✓
   3   | endNode = null  |         —              | loop ends → true

Time Complexity: O(n) - three linear passes (find mid + reverse + compare)
Space Complexity: O(1) - only pointer variables, reversal done in-place

Note on list mutation:
- This approach modifies the list structure (second half gets reversed)
- If preserving the original list is required, reverse the second half
  back after comparison (same reversal logic applied again)

Alternative (Simpler but O(n) space):
var isPalindrome = function(head) {
    let vals = [];
    let curr = head;
    while (curr) { vals.push(curr.val); curr = curr.next; }
    let l = 0, r = vals.length - 1;
    while (l < r) {
        if (vals[l] !== vals[r]) return false;
        l++; r--;
    }
    return true;
};

Comparison:
  Approach                    | Time   | Space | Modifies list?
  ----------------------------|--------|-------|---------------
  Array + two pointers        | O(n)   | O(n)  | No
  Reverse second half (this)✓ | O(n)   | O(1)  | Yes
*/

var isPalindrome = function(head) {
    if(head == null) {
      return true;
    }

    // Phase 1: Find middle node using slow/fast pointers
    let fast = head, slow = head;
    while (fast && fast.next) {
      slow = slow.next;        // Tortoise: 1 step
      fast = fast.next.next;   // Hare: 2 steps
    }
    // slow is now at the middle node

    // Phase 2: Reverse the second half in-place (from mid to end)
    let midNode = slow;
    let prev = null, curr = midNode, front = null;
    while (curr) {
      front = curr.next;     // Save next node
      curr.next = prev;      // Reverse the link
      prev = curr;           // Advance prev
      curr = front;          // Advance curr
    }
    // prev is now the head of the reversed second half

    // Phase 3: Compare first half and reversed second half node by node
    let endNode = prev;  // Start of reversed second half
    curr = head;         // Start of first half

    while(endNode) {
      if(curr.val != endNode.val) return false;  // Mismatch found

      endNode = endNode.next;
      curr = curr.next; 
    }

    return true;  // All values matched → palindrome
};