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
        
        // HashMap<Integer,Integer> map = new HashMap<>();
        
        // freq.forEach((k1,v) -> map.put(v,k1));
        
        // int n = map.size();
        
        PriorityQueue <Map.Entry<Integer,Integer>> kFreq = new PriorityQueue <> ((a,b)->b.getValue() - a.getValue());
        
        kFreq.addAll(freq.entrySet());
        
        int[] ans = new int[k];
        
        for(int i = 0; i < k; i++){
            ans[i] = kFreq.poll().getKey();
        }
        
        return ans;
        
    }
}