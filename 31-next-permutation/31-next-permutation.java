class Solution {

    public void nextPermutation(int[] nums) {
//      For ex: nums[] = [6,8,7,4,3,2]
//                        0 1 2 3 4 5  
        int i = nums.length - 2;
//      Loop will run till it get increasing sequence in array from end   
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
//      i is the index of the point where increasing sequence is voilated i.e i = 0  since nums[0] >= nums[1] voilates for given array
        
//      i < 0 only if the array is in decreasing order hence no next premutation is possible so we have to return array in increasing order therefore it does't enters the condition and reverse the array and we get array in increasing order
        
        
        if (i >= 0) {
            int j = nums.length - 1;
//          Finding the index of the element just greater than the ith index number from the end   
            while(j >= 0 && nums[j] <= nums[i]){
                j--;
            }
//          j hold the index of just greater element than ith index number(from the end) i.e j=2 since nums[2] = 7 which is just greater than nums[0] = 6 from the end 

//          swapping ith and jth index numbers   
            swap(nums, i, j);
//          nums[] = [7,8,6,4,3,2]            
        }
        
//      reversing the number from i+1th till the end i.e from i=1 till end  
//      nums[] = [7,8,6,4,3,2]            
//                  1 2 3 4 5 
        reverse(nums, i + 1, nums.length - 1);
//      nums[] = [7,2,3,4,6,8]   (ANSWER)
    }

//  Function to swap two numbers in array 
    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

//  Function to reverse from ith to jth index in array   
    public void reverse(int[] nums, int i, int j) {
        while (i < j) {
            swap(nums, i, j);
            i++;
            j--;
        }
    }
}
