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
var reverseList = function(head) {
    if(head == null || head.next == null) {
      return head;
    }

    let current = head;
    let previous = null, front = null;

    while (current != null) {
      front = current.next;
      current.next = previous;
      previous = current;
      current = front;
    }

    head = previous;

    return head;
};