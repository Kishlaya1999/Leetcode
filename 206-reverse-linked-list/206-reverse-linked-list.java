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
    public ListNode reverseList(ListNode head) {
        
        if(head == null){
            return head;
        }
        
        if(head.next == null){
            return head;
        }
        
        ListNode tail = head.next;
        ListNode newHead = reverseList(head.next);
        tail.next = head;
        head.next = null;
        
        return newHead;
        
    }
}