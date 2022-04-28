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
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if(head == null || head.next == null || left == right){
            return head;
        }
        
        ListNode rightCurr = head,
                 rightNext = null;
        
        for(int i = 1; i < right; i++){
            rightCurr = rightCurr.next;
        }
        
        if(left == 1){
            ListNode leftHead = head;
            // if next node of rightCurrent Node is null then full                      Lisked list has to be reversed  
            if(rightCurr.next == null){
                return reverseList(head);
            }
            
            else{
                rightNext = rightCurr.next;
                rightCurr.next = null;
                ListNode newHead = reverseList(head);
                leftHead.next = rightNext;
                return newHead;
            }
        }
        
        ListNode leftPrev = null, leftCurr = head;
        
        for(int i = 1; i < left; i++){
            leftPrev = leftCurr;
            leftCurr = leftCurr.next;
        }
        
        if(rightCurr.next == null){
            ListNode newHead = reverseList(leftCurr);
            leftPrev.next = newHead;
            return head;
        }
        else{
            rightNext = rightCurr.next;
            rightCurr.next = null;
            ListNode newHead = reverseList(leftCurr);
            ListNode rightTail = leftPrev.next;
            leftPrev.next = newHead;
            rightTail.next = rightNext;
            return head;
        }
        
    }
    
//  Function for reversing the liked list   
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