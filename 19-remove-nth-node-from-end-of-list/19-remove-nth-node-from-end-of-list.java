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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int len = 1;
        ListNode current = head;
        
//      Calculating the length of the linked list   
        while(current.next != null){
            current = current.next;
            len++;
        }
        
//      lenght == n the first node will be deleted    
        if(len == n){
            head = head.next;
            return head;
        }
        
        
        int nthEnd = (len - n) + 1;
        ListNode previous = null;
        current = head;
        int i = 1;
        
//      Placing the pointer to appropriate position i.e current to nth from end and previous to current's previous 
        while(i < nthEnd){
            previous = current;
            current = current.next;
            i++;
        }
        previous.next = current.next;
        return head;
    }
}