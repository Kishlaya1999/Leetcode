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
    public boolean isPalindrome(ListNode head) {
        
        if(head == null){
            return true;
        }
        
        Stack<Integer> st = new Stack<Integer>();
        ListNode current = head;
        
        while(current != null){
            st.push(current.val);
            current = current.next;
        }
        
        current = head;
        
        while(current != null){
            
            if(st.pop() != current.val){
                return false;
            }
            current = current.next;
        }
        
        return true;
       
    }
    
    
    
}