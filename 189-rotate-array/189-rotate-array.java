class Solution {

    public void rotate(int[] nums, int k) {
        k = k % nums.length;
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
