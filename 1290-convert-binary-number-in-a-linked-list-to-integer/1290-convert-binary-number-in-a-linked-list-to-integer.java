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
    public int getDecimalValue(ListNode head) {
        ArrayList<Integer> binary = new ArrayList();
        ListNode current = head;
        
        while(current!= null){
            binary.add(current.val);
            current = current.next;
        }
        
        int p = 0, ans = 0;
        
        for(int i = binary.size()-1; i >= 0; i--){
            ans += Math.pow(2,p++) * binary.get(i);
        }
        
        return ans;
    }
}