/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        HashMap<ListNode, Integer> map = new HashMap<>();
        ListNode current = head;
        
        while(current != null){
            
            if(map.containsKey(current)){
                return true;
            }else{
                map.put(current, 1);
            }
            current = current.next;
        }
        
        return false;
    }
}