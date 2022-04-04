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

    public ListNode swapNodes(ListNode head, int k) {
        //            len = 0          len = 1
        if (head == null || head.next == null) {
            return head;
        }

        //      Calculationg the length of linked list
        int len = 0;
        ListNode current = head;
        while (current != null) {
            current = current.next;
            len++;
        }

        int i = k;
        int j = (len - i) + 1;

        if (i == j) {
            return head;
        }

        ListNode jth = head, ith = head;// prevJ = null, prevI = null;
        int jCounter = 1, iCounter = 1;

        while (jCounter < j) {
            // prevJ = jth;
            jth = jth.next;
            jCounter++;
        }

        while (iCounter < i) {
            // prevI = ith;
            ith = ith.next;
            iCounter++;
        }
        
        int temp = ith.val;
        ith.val = jth.val;
        jth.val = temp;

        
//                              Swapping nodes
//         if (len == 2) {
//             if (j > i) {
//                 jth.next = ith;
//                 ith.next = null;
//                 head = jth;
//             } else {
//                 ith.next = jth;
//                 jth.next = null;
//                 head = ith;
//             }
            
//         } else {
//             if (i == 1 || j == 1) {
//                 if (i == 1) {
//                     jth.next = ith.next;
//                     ith.next = null;
//                     prevJ.next = ith;
//                     head = jth;
//                 } else {
//                     ith.next = jth.next;
//                     jth.next = null;
//                     prevI.next = jth;
//                     head = ith;
//                 }
//             } else if (Math.abs(i - j) > 1) { //Non-Consecutive , non head and non tail
//                 prevI.next = jth;
//                 prevJ.next = ith;
//                 ListNode temp = ith.next;
//                 ith.next = jth.next;
//                 jth.next = temp;
//             } else if (Math.abs(i - j) == 1) {
//                 if (j > i) {
//                     prevI.next = jth;
//                     ith.next = jth.next;
//                     jth.next = ith;
//                 } else {
//                     prevJ.next = ith;
//                     jth.next = ith.next;
//                     ith.next = jth;
//                 }
//             }
//         }

        return head;
    }
}
