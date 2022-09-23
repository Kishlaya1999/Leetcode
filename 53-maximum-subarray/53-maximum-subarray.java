class Solution {
    public static int maxSubArray(int[] arr) {
		// write your code here
        
        // for()
        
        int max = Integer.MIN_VALUE;
        int sum = 0;
        int  n = arr.length;
        
        // // sum = 0;
        for(int i = 0 ; i < n ; i++ ){
            sum = sum + arr[i];
            if(sum > max) {
                max = sum;
            }
            if(sum < 0){
                sum = 0;
            }
        }
        // if(max < 0)
        //     return 0;
        
        return max;
	}
}