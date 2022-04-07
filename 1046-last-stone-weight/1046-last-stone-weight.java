class Solution {
    public int lastStoneWeight(int[] stones) {
        // if(stones.length == 0){
        //     return 0;
        // }
        // if(stones.length == 1){
        //     return stones[0];
        // }
        
        PriorityQueue<Integer> max_pq = new PriorityQueue<>(Collections.reverseOrder()); 
            
        for(int i = 0; i < stones.length; i++){
            max_pq.add(stones[i]);
        }
        
        while(max_pq.size() >1){
            
            int y = max_pq.poll();
            int x = max_pq.poll();
            
            if(x==y){
                continue;
            }
            else{
                max_pq.add(y-x);
            }
        }
        
        if(max_pq.size()==1){
            return max_pq.poll();
        }
        return 0;
    }
}