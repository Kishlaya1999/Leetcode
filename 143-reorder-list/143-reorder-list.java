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
    public void reorderList(ListNode head) {
        
        ArrayList<Integer> list = new ArrayList<>();
        Stack<Integer> st = new Stack<>();
        ListNode current = head;
        
        while(current != null){
            list.add(current.val);
            st.push(current.val);
            current = current.next;
        }
        
        ArrayList<Integer> reorder = new ArrayList<>();
        int k = 0;
        
        for(int i = 0; i < list.size(); i++ ){
            
            if(i % 2 == 0){
                reorder.add(list.get(k++));
            } 
            else{
                reorder.add(st.pop());
            }
            
        }
        
        current = head;
        k = 0;
        while(current != null){
            current.val = reorder.get(k++);
            current = current.next;
        }
    }
}