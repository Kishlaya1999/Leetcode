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
Approach: Two-Pointer In-Place Odd-Even Segregation

Intuition:
- We need to group all odd-indexed nodes first, then all even-indexed nodes
  (indices are 1-based: node 1, 3, 5... are odd; node 2, 4, 6... are even)
- Brute force: collect odd-indexed values, then even-indexed values,
  rebuild list — but that's O(n) extra space
- Better idea: relink the existing nodes IN-PLACE by maintaining two
  separate chains (odd chain and even chain) and weaving through the list
- Key insight: odd nodes are always 2 steps apart (1→3→5...) and so
  are even nodes (2→4→6...) — we can skip-connect them simultaneously
- At the end, attach the even chain after the odd chain

Key Idea:
- Maintain three pointers:
  * odd: current tail of the odd-indexed chain
  * even: current tail of the even-indexed chain
  * evenStart: fixed pointer to head of even chain (node 2), needed to
    attach even chain after odd chain at the end
- In each iteration, connect odd to odd's next-next, and even to even's
  next-next, then advance both pointers
- Loop until either odd.next or even.next is null (no more nodes to process)
- Finally: odd.next = evenStart (join the two chains)

Algorithm:
1. Base case: 0 or 1 nodes → return head as-is
2. Initialize:
   - odd = head (node 1, first odd)
   - even = head.next (node 2, first even)
   - evenStart = head.next (save even chain head for later joining)
3. While odd.next AND even.next both exist:
   - odd.next = odd.next.next   (skip even node, connect to next odd)
   - even.next = even.next.next (skip odd node, connect to next even)
   - odd = odd.next             (advance odd tail)
   - even = even.next           (advance even tail)
4. odd.next = evenStart          (attach even chain after odd chain)
5. Return head

Example 1: head = [1 → 2 → 3 → 4 → 5] (odd length)

Initial:
  odd=[ 1], even=[2], evenStart=[2]
  [1] → [2] → [3] → [4] → [5]
   ↑odd   ↑even

Iteration 1: odd.next=[2] ✓, even.next=[3] ✓
  odd.next  = odd.next.next  = [3]  → [1] → [3]
  even.next = even.next.next = [4]  → [2] → [4]
  odd  = odd.next  = [3]
  even = even.next = [4]

  [1] → [3] → [4] → [5]
          ↑odd   ↑even
  (odd chain:  1→3, even chain: 2→4)

Iteration 2: odd.next=[4] ✓, even.next=[5] ✓
  odd.next  = odd.next.next  = [5]  → [3] → [5]
  even.next = even.next.next = null → [4] → null
  odd  = odd.next  = [5]
  even = even.next = null

  [1] → [3] → [5]   [2] → [4] → null
                ↑odd              ↑even

Iteration 3: even.next = null ✗ → loop ends

Join: odd.next = evenStart → [5].next = [2]
Result: [1] → [3] → [5] → [2] → [4] ✓

Example 2: head = [1 → 2 → 3 → 4] (even length)

Initial:
  odd=[1], even=[2], evenStart=[2]

Iteration 1: odd.next=[2] ✓, even.next=[3] ✓
  odd.next=[3], even.next=[4]
  odd=[3], even=[4]
  Chains: 1→3, 2→4

Iteration 2: odd.next=[4] ✓, even.next=null ✗ → loop ends

Join: [3].next = evenStart = [2]
Result: [1] → [3] → [2] → [4] ✓

State table (Example 1):
  Iter | odd | even | odd chain | even chain
  -----|-----|------|-----------|------------
  init | [1] | [2]  |    1      |    2
   1   | [3] | [4]  |   1→3     |   2→4
   2   | [5] | null |  1→3→5    |  2→4→null
  Join: [5].next = evenStart[2] → 1→3→5→2→4

Why we save evenStart before the loop:
- During relinking, odd.next and even.next get overwritten each iteration
- Without evenStart, we'd lose the reference to where the even chain begins
- evenStart = head.next locks in the even chain's head BEFORE any rewiring

Why the loop condition is `odd.next && even.next`:
- odd.next: ensures there's a next odd node to connect to
- even.next: ensures there's a next even node to connect to
- If either is null, no more relinking needed — remaining nodes are
  already correctly positioned at the tails of their chains

Time Complexity: O(n) - single pass through the list
Space Complexity: O(1) - only three pointer variables, in-place relinking
*/

var oddEvenList = function(head) {
    // Base case: 0 or 1 nodes are trivially segregated
    if(!head || !head.next) {
      return head;
    } 

    let odd = head,           // Tail of odd-indexed chain
        even = head.next;     // Tail of even-indexed chain
    let evenStart = head.next; // Fixed anchor to even chain's head (for final join)

    while (odd.next && even.next) {
      odd.next = odd.next.next;    // Skip even node, link odd to next odd
      even.next = even.next.next;  // Skip odd node, link even to next even
      odd = odd.next;              // Advance odd tail
      even = even.next;            // Advance even tail
    }

    odd.next = evenStart;  // Attach entire even chain after odd chain
    return head;           // Head (node 1) is always the start of odd chain
};