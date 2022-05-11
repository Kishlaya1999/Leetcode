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
        // Finding the mid point of the linked list
        while(fast != null && fast.next != null){
            originalTail = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // dividing the list into two parts by placing null in last node of previous linked list
        originalTail.next = null;
        // reversing the second part of the linked list
        ListNode newHead = reverseList(slow);
        int maxSum = Integer.MIN_VALUE;
        
        // treversing over both linked list and finding the max sum
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