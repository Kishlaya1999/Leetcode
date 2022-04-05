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
    public ListNode removeElements(ListNode head, int val) {
        
        if(head == null){
            return head;
        }
        
//      if all the values of the linked list are equal to val   
        while(head != null && head.val == val){
            head = head.next;
        }
    
        ListNode previous = null;
        ListNode current = head;
        
        while(current != null){
            boolean entered = false;
            while(current != null && current.val == val){
                // previous.next = current.next;
                current = current.next;
                entered = true;
            }
            if(entered == true){
                previous.next = current;
            }
            
            previous = current;
            if(current!=null)
                current = current.next;
            // if(current != null && current.val == val && current.val == previous.val){
            //     current = current.next;
            //     previous = previous.next;
            // }
        }

        return head;
    }
}