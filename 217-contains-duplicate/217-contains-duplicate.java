class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashMap<Integer,Boolean> map = new HashMap<>();
        
        for(int i = 0; i < nums.length; i++){
            if(map.containsKey(nums[i]) == true){
                return true;
            }
            else{
                map.put(nums[i],true);
            }
        }
        
        return false;
        
    }
}