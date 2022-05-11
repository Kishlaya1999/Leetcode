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
    public int pairSum(ListNode head) {
        
        ListNode slow = head, fast = head, originalTail = null;
        
        while(fast != null && fast.next != null){
            originalTail = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        originalTail.next = null;
        
        ListNode newHead = reverseList(slow);
        
        int maxSum = Integer.MIN_VALUE;
        
        while(head != null && newHead != null){
            
            maxSum = Math.max(maxSum, head.val + newHead.val);
            
            head = head.next;
            newHead = newHead.next;
        }
        
        return maxSum;
        
    }
    
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