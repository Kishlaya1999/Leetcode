class Solution {
    public boolean isPrefixString(String s, String[] words) {
        String str="";
        
        for(String arrayStr : words){
            
            str += arrayStr;
            if(str.equals(s)){
                return true;
            }
        }
        return false;
    }
}