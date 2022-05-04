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
    public ListNode deleteDuplicates(ListNode head) {
        
        if(head == null) {
            return head;
        }
        
        HashMap<Integer,Integer> map = new HashMap<>();
        ListNode current = head;
        
        while(current != null){
            
            if(map.containsKey(current.val)){
                map.put(current.val, map.get(current.val) + 1);
            }
            else{
                map.put(current.val,1);
            }
            current = current.next;
            
        }
        
        current = head;
        ListNode newHead = null,tail = null;
        
        while(current != null){
            
            if(map.get(current.val) == 1){
                if(newHead == null){
                    newHead = current;
                    tail = current;
                }
                else{
                    tail.next = current;
                    tail = tail.next;
                    // tail.next = null;
                }
            }
            current = current.next;
        }
        if(tail != null){
            tail.next = null;
        }
        // tail.next = null;
        
        return newHead;
    
    }
}