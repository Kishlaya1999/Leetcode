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
    public ListNode oddEvenList(ListNode head) {
        if(head == null || head.next == null){
            return head;
        }  
        
        ArrayList<Integer> odd = new ArrayList();
        ArrayList<Integer> even = new ArrayList();
        
        ListNode current = head;
        
        int index = 1;
        
        while(current != null){
            
            if(index % 2 != 0){
                odd.add(current.val);
            }
            else{
                even.add(current.val);
            }
            index++;
            current = current.next;
            
        }
        
        current = head;
        
        for(int i = 0; i < odd.size(); i++){
            current.val = odd.get(i);
            current = current.next;
        }
        
        for(int i = 0; i < even.size(); i++){
            current.val = even.get(i);
            current=current.next;
        }
        
        
        return head;
        
    }
}