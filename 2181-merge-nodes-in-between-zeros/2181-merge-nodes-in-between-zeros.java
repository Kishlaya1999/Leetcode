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
    public ListNode mergeNodes(ListNode head) {
        head = head.next;
        
        int sum = 0;
        ListNode newHead = null, tail = null;
        // ListNode current = head;
        
        while(head != null){
            
            if(head.val == 0){
                ListNode insert = new ListNode(sum);
                
                if(newHead == null){
                    newHead = insert;
                    tail = insert;
                }else{
                    tail.next = insert;
                    tail = tail.next;
                }
                
                sum = 0;
            }
            
            else{
                sum += head.val;
            }
            head = head.next;
        }
        
        return newHead;
        
    }
}