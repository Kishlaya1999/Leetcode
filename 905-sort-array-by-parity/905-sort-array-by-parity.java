class Solution {
    public int[] sortArrayByParity(int[] nums) {
        ArrayList<Integer> odd = new ArrayList();
        ArrayList<Integer> even = new ArrayList();

        for(int i : nums){
            if(i%2 == 0){
                even.add(i);
            }
            else{
                odd.add(i);
            }
        }
        int k = 0;
        for(int i = 0; i < even.size(); i++){
            nums[k++] = even.get(i);
        }
        
        for(int i = 0; i < odd.size(); i++){
            nums[k++] = odd.get(i);
        }
        
        return nums;
    }
}