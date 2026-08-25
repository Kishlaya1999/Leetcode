/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    let sentinel = new ListNode();
    sentinel.next = head;
    let prev = sentinel, curr = head;

    for(let i = 1; i <= left - 1; i++) {
      prev = prev.next;
      curr = curr.next;
    }

    let leftPrev = prev;
    prev = null;
    front = curr;

    for(let i = 1; i <= right - left + 1; i++) {
      front = front.next;
      curr.next = prev;
      prev = curr;
      curr = front;
    }

    leftPrev.next.next = curr;
    leftPrev.next = prev;

    return sentinel.next;

};