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
Approach: Iterative In-Place Pair Swapping with Sentinel

Intuition:
- We need to swap every two adjacent nodes (not their values — the
  actual nodes themselves)
- For each pair, three pointer rewirings are needed:
  1. The node BEFORE the pair must point to the second node (not first)
  2. The first node must point to whatever came after the second node
  3. The second node must point to the first node
- This "node before the pair" is why a sentinel is valuable — the very
  first pair also needs a predecessor!
- After swapping, the first node of the pair becomes the new "node before
  the next pair" — so we advance p to c (old first = new tail of swapped pair)

Key Idea:
- Use three pointers at all times:
  * p (prev): node just BEFORE the current pair (starts at sentinel)
  * c (curr): FIRST node of the current pair
  * n (next): SECOND node of the current pair
- For each pair (c, n), perform three rewirings IN ORDER:
  1. p.next = n       (predecessor now points to second node)
  2. c.next = n.next  (first node points past the pair)
  3. n.next = c       (second node points to first node)
- After swap: advance p=c, c=p.next, n=c&&c.next
- Sentinel handles the first pair uniformly (no special case for head)

Algorithm:
1. Base case: 0 or 1 nodes → return head (nothing to swap)
2. Create sentinel, sentinel.next = head
3. Initialize p=sentinel, c=head, n=head.next
4. While c AND n both exist (full pair available):
   - p.next = n      (step 1: bypass c, go straight to n)
   - c.next = n.next (step 2: c now points past the pair)
   - n.next = c      (step 3: n points back to c → swap complete)
   - Advance: p=c, c=p.next, n=c&&c.next
5. Return sentinel.next

Example: head = [1→2→3→4]

Initial: sentinel→[1]→[2]→[3]→[4]
  p=sentinel, c=[1], n=[2]

Iteration 1: swap pair ([1], [2])

  Before swap:
  sentinel → [1] → [2] → [3] → [4]
     ↑p        ↑c    ↑n

  Step 1: p.next = n   → sentinel.next = [2]
  sentinel → [2]   [1] → [2] → [3] → [4]  (p now skips to [2])

  Step 2: c.next = n.next → [1].next = [3]
  sentinel → [2]   [1] → [3] → [4]         ([1] now points past pair)

  Step 3: n.next = c → [2].next = [1]
  sentinel → [2] → [1] → [3] → [4]         (swap complete!)

  Advance: p=c=[1], c=p.next=[3], n=c&&c.next=[4]

  sentinel → [2] → [1] → [3] → [4]
                     ↑p    ↑c    ↑n

Iteration 2: swap pair ([3], [4])

  Step 1: p.next = n   → [1].next = [4]
  sentinel → [2] → [1] → [4]   [3] → [4]

  Step 2: c.next = n.next → [3].next = null
  sentinel → [2] → [1] → [4]   [3] → null

  Step 3: n.next = c → [4].next = [3]
  sentinel → [2] → [1] → [4] → [3] → null  (swap complete!)

  Advance: p=c=[3], c=p.next=null, n=null

  Loop condition: c=null → loop ends

Return sentinel.next = [2→1→4→3] ✓

Example 2: head = [1→2→3] (odd length)

Initial: p=sentinel, c=[1], n=[2]

Iteration 1: swap ([1], [2])
  sentinel → [2] → [1] → [3]
  Advance: p=[1], c=[3], n=[3]&&[3].next=null

Loop condition: n=null → loop ends (single node [3] left, no swap)
Return [2→1→3] ✓

State table (Example 1):
  Iter | p        | c   | n   | After rewire           | List state
  -----|----------|-----|-----|------------------------|------------------
  init | sentinel | [1] | [2] |  —                     | s→1→2→3→4
   1   | [1]      | [3] | [4] | s→2→1, [1]→3→4        | s→2→1→3→4
   2   | [3]      | null| null| [1]→4→3, [3]→null      | s→2→1→4→3

Why the order of rewiring matters (CRITICAL):
  The three steps MUST happen in this exact order:
  1. p.next = n      first (or we lose access to n via p)
  2. c.next = n.next (save n.next BEFORE n.next gets overwritten)
  3. n.next = c      last (finally close the swap)

  If we did step 3 before step 2:
    n.next = c → n points to c
    c.next = n.next → c.next = c (cycle! c would point to itself)

Time Complexity: O(n) - each node visited exactly once
Space Complexity: O(1) - only sentinel and three pointer variables
*/

var swapPairs = function (head) {
    // Base case: 0 or 1 nodes, nothing to swap
    if (!head || !head.next) return head;

    let sentinel = new ListNode();  // Dummy predecessor for uniform first-pair handling
    sentinel.next = head;

    let p = sentinel,     // Predecessor of current pair
        c = head,         // First node of current pair
        n = head.next;    // Second node of current pair

    while (c && n) {
        // Three rewirings to swap the pair (ORDER CRITICAL!)
        p.next = n;        // Step 1: predecessor skips to second node
        c.next = n.next;   // Step 2: first node points past the pair
        n.next = c;        // Step 3: second node points back to first

        // Advance all three pointers to the next pair
        p = c;             // Old first node is now tail of swapped pair
        c = p.next;        // Next pair's first node
        n = c && c.next;   // Next pair's second node (guard against c=null)
    }

    return sentinel.next;  // Skip sentinel, return new head
};