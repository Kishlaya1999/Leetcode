class KthLargest {
    int k;
//  Creating the min priority Queue(Min heap)   
    private PriorityQueue<Integer> min_pq = new PriorityQueue<>();

    public KthLargest(int k, int[] nums) {
        this.k = k;         //Initializing the value of k
//      Adding only k elements to the min hep and if the size increases by k then pop the last added eleemnt   
        for (int i = 0; i < nums.length; i++) {
            min_pq.add(nums[i]);
            if (min_pq.size() > k) {
                min_pq.poll();
            }
        }
//      By doing this min heap will always contain k largest element and kth largest element will always on the top    
    }

    public int add(int val) {
        min_pq.add(val);
        if (min_pq.size() > k) {
            min_pq.poll();
        }
        return min_pq.peek();
    }
}
/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest obj = new KthLargest(k, nums);
 * int param_1 = obj.add(val);
 */
