class Solution {
    public void sortColors(int[] nums) {
        
        int low = 0;
        int mid = 0;
        int high = nums.length - 1;
        
        while(mid <= high){
            
            if(nums[mid] == 0){
                swap(nums, mid, low);
                low++;
                mid++;
            }
            
            else if(nums[mid] == 1){
                mid++;
            }
            
            else if(nums[mid] == 2){
                swap(nums, mid, high);
                high--;
            }
             
        }
        
    }
    
    public void swap(int[] arr, int i, int j){
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        }
}