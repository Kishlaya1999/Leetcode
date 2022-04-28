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
    
    // Lisked List => 1->2->3->4->x
    
    public ListNode swapPairs(ListNode head) {
        if(head == null || head.next == null){
            return head;
        }
        
        // Making nextNode point to 2
        ListNode nextNode = head.next;
        
        // we will get 4->3 from recursion and we will attact it to head
        // Linked list => 1->4->3
        head.next = swapPairs(head.next.next);
        // Pointing nextNode i.e 2 to head i.e 1
        // Linked list => 2->1->4->3
        nextNode.next = head;
        // Making 2 as head of the linked list
        head = nextNode;
    
        return head;
    }
}