import java.util.*;

class Solution {
    public int singleNumber(int[] nums) {
        HashMap<Integer,Integer> freq = new HashMap<>();
        
        for(int i = 0 ; i< nums.length; i++ ){
            freq.put(nums[i] , freq.getOrDefault(nums[i] , 0) + 1);
        }
        
        for(int i = 0; i < nums.length ; i++){
            if(freq.get(nums[i]) == 1){
                return nums[i];
            }
        }
        return Integer.MIN_VALUE;
    }
}