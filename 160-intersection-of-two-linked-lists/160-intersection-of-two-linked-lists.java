/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        
        ListNode currentB = headB;
        ListNode currentA = headA;

        while(currentA != null){
            currentB = headB;
            
            while(currentB != null){
                
                if(currentB == currentA){
                    return currentB;
                }
                currentB = currentB.next;
            }
            currentA = currentA.next;
            
        }
        return null;
    }
}