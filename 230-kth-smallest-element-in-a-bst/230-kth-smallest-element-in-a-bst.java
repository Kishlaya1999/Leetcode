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
    
    List<Integer> inorder = new ArrayList();
    
    public int kthSmallest(TreeNode root, int k) {
        
        inorderBST(root);
        
        return inorder.get(k-1);
        
    }
    
    public void inorderBST(TreeNode root){
        if(root == null){
            return ;
        }
        
        inorderBST(root.left);
        inorder.add(root.val);
        inorderBST(root.right);
    }
}