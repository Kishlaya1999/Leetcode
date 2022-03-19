class Solution {

    public void rotate(int[] nums, int k) {
        k = k % nums.length;   //If k is larger than nums.length 
        //For ex: if nums.length = 7 and number of rotation we have to do is 8
//         then in 7th rotation it would be same as without rotaion i.e 8th rotation would be equivalent to 1 rotation therefore k%nums.length
        int[] tempArr = new int[k];
        int p = 0;
        for (int i = nums.length - k; i < nums.length; i++) {
            tempArr[p++] = nums[i];
        }
        for (int i = nums.length - 1; i >= k; i--) {
            nums[i] = nums[i - k];
        }
        for (int i = 0; i < tempArr.length; i++) {
            nums[i] = tempArr[i];
        }
    }
}
