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
    public ListNode partition(ListNode head, int x) {
        ArrayList<Integer> less = new ArrayList();
        ArrayList<Integer> more = new ArrayList();

        ListNode current = head;
        
        while(current != null){
            if(current.val < x){
                less.add(current.val);
            }else{
                more.add(current.val);
            }
            current = current.next;
        }
        
        current = head;
        
        for(int i = 0; i < less.size(); i++){
            current.val = less.get(i);
            current = current.next;
        }
        
        for(int i = 0; i < more.size(); i++){
            current.val = more.get(i);
            current = current.next;
        }
        
        return head;
    }
}