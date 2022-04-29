class Solution {
    public String restoreString(String s, int[] indices) {
        char[] ansArray = new char[indices.length];
        
        for(int i = 0; i < indices.length; i++){
            ansArray[indices[i]] = s.charAt(i);
        }
        String str = new String();
        return str.valueOf(ansArray);
    }
}