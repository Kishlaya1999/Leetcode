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

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
//      When length of one of the linked list in 0    
        if(l1 == null){
            return l2;
        }else if(l2 == null){
            return l1;
        }
        
        ListNode c1 = l1;
        ListNode c2 = l2;
        ListNode head = null,tail = null;
        int carry = 0;
        
//      When length of the both the linked list are same   
        while(c1!=null && c2!=null){
            
            int sum = c1.val + c2.val + carry;
            int insert = sum % 10;
            carry = sum / 10;
            ListNode newNode = new ListNode(insert);
            
            if(head == null){
                head = newNode;
                tail = newNode;
            }else{
                tail.next = newNode;
                tail = tail.next;
            }
            
            c1 = c1.next;
            c2 = c2.next;
        }
        
//      When length of the first linked list is greater thean the second   
        while(c1 != null){
            
            int sum = c1.val + carry;
            int insert = sum % 10;
            carry = sum / 10;
            ListNode newNode = new ListNode(insert);
            
            tail.next = newNode;
            tail = tail.next;
            
            c1 = c1.next;
        }
        
//      When length of the second linked list is greater thean the first   
        while(c2 != null){
         
            int sum = c2.val + carry;
            int insert = sum % 10;
            carry = sum / 10;
            ListNode newNode = new ListNode(insert);
            
            tail.next = newNode;
            tail = tail.next;
            
            c2 = c2.next;
            
        }
        
//      After all the operations there might be a carray left    
        if(carry == 1){
            ListNode newNode = new ListNode(1);
            tail.next = newNode;
        }

        return head;
    }
}
