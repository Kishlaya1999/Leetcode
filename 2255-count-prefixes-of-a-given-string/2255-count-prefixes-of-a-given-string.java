class Solution {
    public int countPrefixes(String[] words, String s) {
        int count = 0;
        for(String str : words){
            if(str.length() > s.length()){
                continue;
            }
            
            int i = 0;
            for(i = 0; i < str.length(); i++){
                if(str.charAt(i) != s.charAt(i)) break;
            }
            
            if(i == str.length()) count++;
        }
        return count;
    }
}