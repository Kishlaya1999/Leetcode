/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {

    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        
        if(list1 == null && list2 != null){
            return list2;
        }
        if(list1 != null && list2 == null){
            return list1;
        }
        
        ListNode head = null, tail = null;
        ListNode current1 = list1, current2 = list2;

        while (current1 != null && current2 != null) {
            ListNode newNode = null;

            if (current1.val < current2.val) {
                newNode = new ListNode(current1.val);
                if (head == null) {
                    head = newNode;
                    tail = newNode;
                } else {
                    tail.next = newNode;
                    tail = tail.next;
                }
                current1 = current1.next;
            } else if (current1.val > current2.val) {
                newNode = new ListNode(current2.val);
                if (head == null) {
                    head = newNode;
                    tail = newNode;
                } else {
                    tail.next = newNode;
                    tail = tail.next;
                }
                current2 = current2.next;
            } else {
                newNode = new ListNode(current1.val);
                if (head == null) {
                    head = newNode;
                    tail = newNode;
                } else {
                    tail.next = newNode;
                    tail = tail.next;
                }
                current1 = current1.next;
            }
        }

        if (current1 == null && tail != null) {
            tail.next = current2;
        }

        if (current2 == null && tail != null) {
            tail.next = current1;
        }

        return head;
    }
}
