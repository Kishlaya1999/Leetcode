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
    
    public TreeNode convertBST(TreeNode root) {
        if(root == null){
            return root;
        }
        
        convertBSTHelper(root);
        
        return root;
    }
    
    public void convertBSTHelper(TreeNode root){
        
        if(root == null){
            return;
        }
        
        convertBSTHelper(root.right);
        sum = sum + root.val;
        root.val = sum;
        convertBSTHelper(root.left);
        
    }
}