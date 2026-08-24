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
var detectCycle = function(head) {
    if(!head) return head;

    let ans = new Set();
    let curr = head;
    while(curr) {
      if(ans.has(curr)) {
        return curr;
      }
      ans.add(curr);

      curr = curr.next;
    }
    return null;
};