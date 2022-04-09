class KthLargest {

    int k;
    // private PriorityQueue<Integer> max_pq = new PriorityQueue<>(Collections.reverseOrder());
    ArrayList<Integer> arr;
    
    public KthLargest(int k, int[] nums) {
        this.k = k;
        // this.nums = new nums[nums.length]; 
        arr = new ArrayList<Integer>();
        for(int i = 0; i < nums.length; i++){
            // this.nums[i] = nums[i];
            // max_pq.add(nums[i]);
            arr.add(nums[i]);
        }
    }
    
    public int add(int val){
        arr.add(val);
        Collections.sort(arr);
        return arr.get(arr.size()-k);
    }
    
    // public int add(int val) {
    //     max_pq.add(val);
    //     int ans = 0;
    //     int [] arr = new int[k];
    //     // ArrayList<Integer> arr = new ArrayList<>();
    //     for(int i = 0; i < k-1; i++){
    //         arr[i] = max_pq.poll();
    //         // if(i==k){
    //         //     ans = temp;
    //         // }
    //         // max_pq.add(temp);
    //     }
    //     for(int i =0 ; i< arr.length; i++){
    //         max_pq.add(arr[i]);
    //     }
    //     // int ans = max_pq.peek();
    //     // for(int i = 0; i < arr.size(); i++){
    //     //     max_pq.add(arr.get(i));
    //     // }
    //     return arr[arr.length-1];
    // }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest obj = new KthLargest(k, nums);
 * int param_1 = obj.add(val);
 */