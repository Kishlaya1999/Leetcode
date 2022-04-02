class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        
//      Creating an array of m+n size   
        int[] arr = new int[m+n];
        int i = 0, j = 0, k = 0;
        
//      till one of the array is finished   
        while(i < m && j < n){
            
//          if nums1 ith element is smaller than nums2 jth element
            if(nums1[i] < nums2[j]){
                arr[k] = nums1[i];
                k++;
                i++;
            }
            
//          if nums1 ith element is smaller than nums2 jth element   
            else if(nums1[i] > nums2[j]){
                arr[k] = nums2[j];
                k++;
                j++;
            }
            
//          if nums1 ith element is equal to nums2 jth element   
            else{
                arr[k] = nums1[i];
                k++;
                i++;
                
                arr[k] = nums2[j];
                k++;
                j++;
            }
            
        }
        
//      if nums2 elements are finished and only nums1 element are left then copy left element of nums1 in arr   
        while(i < m){
            arr[k] = nums1[i];
            k++;
            i++;
        }
        
//      if nums1 elements are finished and only nums2 element are left then copy left element of nums2 in arr   

        while(j < n){
            arr[k] = nums2[j];
            k++;
            j++;
        }
        
//      Copying all the elements of arr in nums1   
        for(i = 0 ; i < arr.length ; i++){
            nums1[i] = arr[i];
        }
    }
}