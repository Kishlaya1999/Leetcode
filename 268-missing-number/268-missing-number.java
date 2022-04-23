class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int actualSum = (n * (n+1))/2;
        int missingNumSum = 0;
        for(int i: nums){
            missingNumSum += i;
        }
        return actualSum - missingNumSum;
    }
}