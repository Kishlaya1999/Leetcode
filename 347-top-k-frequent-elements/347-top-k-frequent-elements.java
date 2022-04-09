class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        
        if(k == nums.length){
            return nums;
        }
        
        HashMap<Integer,Integer> freq = new HashMap<>();
        for(int i = 0; i < nums.length; i++){
//      if arr[i] is present in the hashmap then it gets its previous frequency and add 1 to it
//      if arr[i] not present in the hashmap then it gets the default value i.e 0 and add 1 to it hence 1 occurance of arr[i] is added in the hashmap  
            freq.put(nums[i],freq.getOrDefault(nums[i],0)+1);
        }
        
//      Creating the min priority queue according to the value(Frequency of the map)
//      Priority Queue is of the type map entries i.e k->v pair   
        PriorityQueue <Map.Entry<Integer,Integer>> kFreq = new PriorityQueue <> ((a,b)-> a.getValue() - b.getValue());
        
//      Adding k elements in the priority queue and whenever the size of priority queue exceeds k we pop the pair and smallest frequency element is popped as it is min priority queue
        for(Map.Entry<Integer,Integer> entry : freq.entrySet()){
            kFreq.add(entry);
            if(kFreq.size()>k){
                kFreq.poll();
            }
        }
//      at the end only k element will left which would be the top k frequency element   
        int[] ans = new int[k];
        
//      Storing the k elements (which are also the top frequency elements) in array   
        for(int i = 0; i < k; i++){
            ans[i] = kFreq.poll().getKey();
        }
        
        return ans;
        
    }
}