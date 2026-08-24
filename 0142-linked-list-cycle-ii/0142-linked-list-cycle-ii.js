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
  let x1 -> length from head to start of Cycle
  let x2 -> length from start of cycle to point where slow and fast meets for the first time
  let x3 -> lenght of point where slow and fast meets for the first time to start of the Cycle

  When slow and fast meets for the first time then slow travels = x1 + x2 (dist covered by slow)
  while fast travels = x1 + x2 + x3 + x2 (Dist. covered by fast)

  fast covers 2x distance than slow 

  so we can write above eq as 

  2 * (x1 + x2) = x1 + x2 + x3 + x2
  2 * x1 + 2 * x2 = x1 + 2 * x2 + x3
  2 * x1 = x1 + x3
  x1 = x3 

  i.e 
  length from head to start of Cycle == lenght of point where slow and fast meets for the first time to start of the Cycle

  that's why when the slow and fast meets for the first time and we assign slow to head and move both by 1 node they meet at start of the cycle

*/  
var detectCycle = function(head) {
    let slow = head, fast = head;

    while(fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if(slow == fast) {
        slow = head;

        while(slow != fast) {
          slow = slow.next;
          fast = fast.next;
        }

        return slow;
      }
    }

    return null;
};