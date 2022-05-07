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
        
        ListNode newListNode = head;
        ListNode current = head.next;
        // ListNode previous = null;
        int sum = 0;
        
        while(current != null){
            
            if(current.val == 0){
                newListNode.val = sum;
                if(current.next == null){
                    newListNode.next = null;
                    break;
                }
                newListNode.next = current;
                newListNode = current;
                sum = 0;
            }
            else{
                sum+=current.val;
            }
            
            // if(current.next == null){
            //     previous.next = null;
            //     break;
            // }
            // previous = current;
            current = current.next;
            
        }
        return head;
    }
}