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
    public ListNode swapNodes(ListNode head, int k) {
        
        ArrayList<Integer> ans = new ArrayList<>();
        
        ListNode current = head;
        
        while(current != null){
            ans.add(current.val);
            current = current.next;
        }
        
        int i = k-1;
        int j = ans.size()-k;
        
        int temp = ans.get(i);
        ans.set(i,ans.get(j));
        ans.set(j,temp);
        
        current = head;
        
        for(int l = 0 ; l < ans.size() ; l++){
            current.val = ans.get(l);
            current = current.next;
        }
        
        return head;
    }
}