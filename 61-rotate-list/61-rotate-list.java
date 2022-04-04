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

    public ListNode rotateRight(ListNode head, int k) {
        //      if k = 0 i.e we don't have to rotate the linked list hence returning the head without change
        //      if head == null then returning the head as it is
        if (head == null || k == 0) {
            return head;
        }

        //      calculating the length of the linked list and and at the same time finding the tail of the original linked list
        int len = 0;
        ListNode tail = null, current = head;
        while (current != null) {
            tail = current;
            current = current.next;
            len++;
        }

        if (len == 1 || len == k) {
            return head;
        }

        if (k > len) {
            k = k % len;
        }

        if (k > 0) {
            //      calculating index position of after rotation
            int newTailPos = len - (k + 1);

            //      finding the new tail after rotation of the linked list
            int i = 0;
            ListNode newTail = head;
            while (i < newTailPos) {
                newTail = newTail.next;
                i++;
            }

            //      Creating new head and initializing it with newTail's next node
            ListNode newHead = newTail.next;
            //      Joining the previous tail with previous head
            tail.next = head;
            //      Assigning the new tail's next as null
            newTail.next = null;

            return newHead;
        }
        else{
            return head;
        }
    }
}
