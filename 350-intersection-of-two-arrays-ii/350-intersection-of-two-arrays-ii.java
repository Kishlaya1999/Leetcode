class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        ArrayList<Integer> ansArray = new ArrayList<Integer>();
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        int i=0,j=0,k=0;
        while(i<nums1.length && j<nums2.length){
            
            if(nums1[i] < nums2[j])
                i++;
            else if(nums1[i] > nums2[j])
                j++;
            else{
                ansArray.add(nums1[i]);
                i++;
                j++;
            }
        }
        int[] ans = new int[ansArray.size()];
        for(int t = 0 ; t < ansArray.size() ; t++){
            ans[t] = ansArray.get(t);
        }
        return ans;
    }
}