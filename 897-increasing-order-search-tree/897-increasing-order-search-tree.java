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
 * }*/

class Solution {
    
    List<Integer> inorder = new ArrayList();
    
    public TreeNode increasingBST(TreeNode root) {
        if(root == null){
            return root;
        }
        
        inorderBST(root);
        
        TreeNode newRoot = null, current = null;
        
//      looping throught the inorder ArrayList and creating Increasing Order Search Tree    
        for(int i : inorder){
            
            if(newRoot == null){
                newRoot = new TreeNode(i);
                current = newRoot;
            }
            else{
                TreeNode temp = new TreeNode(i);
                current.right = temp;
                current = current.right;
            }
            
        }
        
        return newRoot;
    }
    
//  Function for creating the arraylist of inorder traversal   
    public void inorderBST(TreeNode root){
        
        if(root == null) {
            return;
        }
        
        inorderBST(root.left);
        inorder.add(root.val);
        inorderBST(root.right);
        
    }
    
}