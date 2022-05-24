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
    public int deepestLeavesSum(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();

        int sum = 0;
        q.add(root);

        while(!q.isEmpty()){
            // qSize holds the no of nodes at each level
            int qSize = q.size();
            // changing the sum of the previous level to 0
            sum = 0;
            
            for(int i = 0; i < qSize; i++){
                if(q.peek().left != null){
                    q.add(q.peek().left);
                }
                if(q.peek().right != null){
                    q.add(q.peek().right);
                }
                // holds the sum of each level
                sum +=q.poll().val;
            }
    
        }
        
        // at this point it will hold the sum of last level
        return sum;
    }
}