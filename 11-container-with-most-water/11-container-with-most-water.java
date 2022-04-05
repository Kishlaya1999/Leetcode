class Solution {
    public int maxArea(int[] height) {
        int l = 0;
        int r = height.length - 1;
        int ans = Integer.MIN_VALUE;
        
        while(l < r){
            ans = Math.max((r - l) * Math.min( height[l], height[r] ),ans );
            if(height[l] < height[r]){
                l++;
            }else{
                r--;
            }
        }
        return ans;
    }
}