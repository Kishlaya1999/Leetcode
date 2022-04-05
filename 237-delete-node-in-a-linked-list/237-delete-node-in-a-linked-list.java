/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public void deleteNode(ListNode node) {
        // Replacing the node to be deleted with next node and also replacing next node with next of next node 
        
//      4->5->1->9->null
//      4->1->1->9->null
//      4->5->9->null
        node.val = node.next.val;
        node.next = node.next.next;
    }
}