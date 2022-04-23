BFS is much better here, rather than a DFS approach.
​
Sure, the solution here is short in terms of lines of code and looks nice, but it's far from optimal.
​
If you have a tree where say the root's left subtree has a depth of 500 and the right subtree has a depth of 1, the code is going to traverse all the way down the 500 left subtree first before finally traversing the right subtree with a measly depth of 1 and figuring out "d'oh!" that's the min depth.
​
With BFS, instead of traversing 501 nodes to figure out the min depth, you could've just traversed two. Now imagine if the left subtree comprised of tens of thousands of nodes ...
​
​
public int minDepth(TreeNode root) {
if(root == null) return 0;
int depth = 1;
Queue<TreeNode> q = new LinkedList<TreeNode>();
q.offer(root);                          //same as add
while(!q.isEmpty()){
int size = q.size();
// for each level
for(int i=0;i<size;i++){
TreeNode node = q.poll();
if(node.left == null && node.right == null){
return depth;
}
if(node.left != null){
q.offer(node.left);
}
if(node.right != null){
q.offer(node.right);
}
}
depth++;
}
return depth;
}