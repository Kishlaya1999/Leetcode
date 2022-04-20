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
class BSTIterator {
    
    // TreeNode root;
    private int i = 0;
    private List<Integer> in = new ArrayList();
    
    private void inorder(TreeNode root){
        if(root == null){
            return ;
        }
        
        inorder(root.left);
        in.add(root.val);
        inorder(root.right);
    }

    public BSTIterator(TreeNode root) {
        // this.root = root;
        // BSTIterator bSTIterator = new BSTIterator();
        inorder(root);
    }
    
    public int next() {
        return in.get(i++);
    }
    
    public boolean hasNext() {
        // return root.right != null;
        if(i<in.size()){
            return true;
        }
        return false;
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator obj = new BSTIterator(root);
 * int param_1 = obj.next();
 * boolean param_2 = obj.hasNext();
 */