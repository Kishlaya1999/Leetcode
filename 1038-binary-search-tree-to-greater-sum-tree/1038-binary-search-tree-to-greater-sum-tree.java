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
    
    public int sum = 0;
    
    public TreeNode bstToGst(TreeNode root) {
        if(root == null){
            return root;
        }
        
        bstToGstHelper(root);
        
        return root;
    }
    
     public void bstToGstHelper(TreeNode root){
        
        if(root == null){
            return;
        }
        
        bstToGstHelper(root.right);
        sum = sum + root.val;
        root.val = sum;
        bstToGstHelper(root.left);
        
    }
}