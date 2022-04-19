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
    int i = 0;
    
    public void recoverTree(TreeNode root) {
        
        inorderTree(root);
        
        Collections.sort(inorder);
        
        recover(root);
        
    }
    
    public void inorderTree(TreeNode root){
        
        if(root == null){
            return ;
        }
        
        inorderTree(root.left);
        inorder.add(root.val);
        inorderTree(root.right);
        
    }
    
    public void recover(TreeNode root){
        if(root == null){
            return;
        }
        
        recover(root.left);
        root.val = inorder.get(i++);
        recover(root.right);
    }
}