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
    
    List<Integer> postOrder = new ArrayList();

    
    public List<Integer> postorderTraversal(TreeNode root) {
        
        postOrderTree(root);
        
        return postOrder;
        
    }
    
    public void postOrderTree(TreeNode root){
        if(root == null){
            return;
        }
        
        postOrderTree(root.left);
        postOrderTree(root.right);
        postOrder.add(root.val);        

    }
}