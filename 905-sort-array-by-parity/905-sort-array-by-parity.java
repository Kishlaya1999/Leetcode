class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int even = 0;
        int odd = nums.length - 1;
        
        while(even < odd){
            // if current element is even move even pointer forward 
            if(nums[even] % 2 == 0)
                even++;
            // if current element is odd move odd pointer backward 
            if(nums[odd] % 2 != 0)
                odd--;
            // if even pointer element is odd an odd point element is even then swap the elements and move even pointer forward and even pointer backward 
            if(nums[even] % 2 != 0 && nums[odd] % 2 == 0 && even < odd){
                swap(nums,even,odd);
                even++;
                odd--;
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