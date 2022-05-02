class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int j = 0;
        for(int i = 0; i < nums.length; i++){
            if(nums[i] % 2 == 0){
                swap(nums, i, j);
                j++;
            }
        }
        
        return nums;
    }
    
    public void swap(int[] arr, int i, int j){
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}