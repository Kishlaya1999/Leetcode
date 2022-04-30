class Solution {
    public int countPrefixes(String[] words, String s) {
        int count = 0;
        for(String str : words){
            if(str.length() > s.length()){
                continue;
            }
            
            if(s.startsWith(str)){
                count++;
            }
            
        }
        return count;
    }
}