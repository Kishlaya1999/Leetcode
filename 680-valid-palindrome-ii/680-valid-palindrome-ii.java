class Solution {

    public boolean validPalindrome(String s) {
        int low = 0;
        int high = s.length() - 1;

//      for ex: abcbxa    
        while(low < high){
            if(s.charAt(low) != s.charAt(high)){
//      if one of them is true then it means we can delete one char and string becomes palendrome
//                              bcb            ||       cbx
                return isPalindrome(s, low, high-1) || isPalindrome(s, low+1, high);
            }
            low++;
            high--;
        }
//      if it is reaches here it means it never had entered the if condition hence string is palendrome 
        return true;
    }
    
//  Function for checking palendrome   
    public boolean isPalindrome(String s, int i, int j){
        
        while(i < j){
            if(s.charAt(i) != s.charAt(j)){
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
