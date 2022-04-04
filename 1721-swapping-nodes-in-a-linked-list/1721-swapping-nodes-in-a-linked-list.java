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
        ListNode kBeg = null, ith = head, jth = head ;
        
        while(--k>0){
            ith = ith.next;
        }
        
        kBeg = ith;
        ith = ith.next;
        
        while(ith != null){
            ith = ith.next;
            jth = jth.next;
        }
        
        int temp = jth.val;
        jth.val = kBeg.val;
        kBeg.val = temp;
        
        return head;
    }
}