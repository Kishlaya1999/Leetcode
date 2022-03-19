class Solution {

    public void rotate(int[] nums, int k) {
        k = k % nums.length;   
//      Reversing whole array
        reverse(nums,0,nums.length-1);
//      Reversing first k elements
        reverse(nums,0,k-1);
//      Reversing rest of the element after k to length   
        reverse(nums,k,nums.length-1);
    }
    
    public void reverse(int[] nums,int start,int end){
        
        while(start<end){
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
        
    }
}
