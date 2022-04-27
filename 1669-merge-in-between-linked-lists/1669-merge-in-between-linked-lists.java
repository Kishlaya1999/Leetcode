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
    public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {
        
        ListNode previousA = list1,currentB = list1, list2tail = list2;
        
        for(int i = 0; i < a-1 ; i++){
            previousA = previousA.next;
        }
        
        for(int i = 0; i <= b; i++){
            currentB = currentB.next;
        }
        
        while(list2tail != null && list2tail.next != null){
            list2tail = list2tail.next;
        }
        
        previousA.next = list2;
        list2tail.next = currentB;
        
        return list1;
    }
}