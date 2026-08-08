/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {

  if(list1 == null) {
    return list2;
  } 
  if (list2 == null) {
    return list1;
  }

  let curr1 = list1, curr2 = list2;
  let head = null, curr = null;

  while (curr1 != null && curr2 != null) {

    if(curr1.val < curr2.val ){
      let newNode = new ListNode(curr1.val);
      if (head == null) {
        head = newNode;
        curr = head;
      } else {
        curr.next = newNode;
        curr = curr.next;
      }
      curr1 = curr1.next;
    } else {
      let newNode = new ListNode(curr2.val);
      if(head == null) {
        head = newNode;
        curr = head;
      } else {
        curr.next = newNode;
        curr = curr.next;
      } 
      curr2 = curr2.next;
    }
  }
  if (curr1 == null) {
    curr.next = curr2;
  }
  else {
    curr.next = curr1;
  }

  return head;
    
};