/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode trimBST(TreeNode root, int low, int high) {
        if(root == null){
            return root;
        }
        
//      if current root value is less than low then all the values left hand side will also be less than low(since it is the BST) , so we pass the right subtree further and ignore the left subtree  
        if(root.val < low){
            return trimBST(root.right, low, high);
        }
        
//      if current root value is more than high then all the values right hand side will also be more than high(since it is the BST) , so we pass the left subtree further and ignore the right subtree  
        if(root.val > high){
            return trimBST(root.left, low, high);
        }
        
//      if the current root value is in the range then we check the left and right subtree one by one 
        root.left = trimBST(root.left, low, high);
        root.right = trimBST(root.right, low, high);
        return root;
    }
}