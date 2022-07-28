class Solution {
    public boolean isAnagram(String s, String t) {
        int arr[] = new int[256];
        for(int i = 0 ; i < s.length() ; i++ ){
            arr[s.charAt(i)]++;
        }
        for(int i = 0 ; i < t.length() ; i++ ){
            arr[t.charAt(i)]--;
        }
        for(int i = 0 ; i < 256 ; i++ ){
           if(arr[i]!=0){
               return false;
           }
        }
        return true;
    }
}