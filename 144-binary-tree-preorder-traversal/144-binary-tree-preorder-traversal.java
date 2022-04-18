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
    
    List<Integer> preOrder = new ArrayList();
    
    public List<Integer> preorderTraversal(TreeNode root) {
        
        preOrderTree(root);
        
        return preOrder;
        
    }
    
    public void preOrderTree(TreeNode root){
        if(root == null){
            return;
        }
        
        preOrder.add(root.val);        
        preOrderTree(root.left);
        preOrderTree(root.right);
    }
}