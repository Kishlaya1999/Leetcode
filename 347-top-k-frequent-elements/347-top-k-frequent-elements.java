class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        
        if(k == nums.length){
            return nums;
        }
        
        HashMap<Integer,Integer> freq = new HashMap<>();
        for(int i = 0; i < nums.length; i++){
            if(freq.containsKey(nums[i])){
                freq.put(nums[i],freq.get(nums[i])+1);
            }
            else{
                freq.put(nums[i],1);
            }
        }
        
//      Creating the max priority queue according to the value(Frequency of the map)
//      Priority Queue is of the type map entries i.e k->v pair   
        PriorityQueue <Map.Entry<Integer,Integer>> kFreq = new PriorityQueue <> ((a,b)->b.getValue() - a.getValue());
        
//      Adding all the entries of frequency map to max priority queue
        kFreq.addAll(freq.entrySet());
        
        int[] ans = new int[k];
        
//      Storing the top k elements (which are also the top frequency elements) in array   
        for(int i = 0; i < k; i++){
            ans[i] = kFreq.poll().getKey();
        }
        
        return ans;
        
    }
}