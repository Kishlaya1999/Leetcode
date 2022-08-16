class Solution {
    public int firstUniqChar(String s) {
        HashMap<Character,Integer> freq = new HashMap();
        
        for(int i = 0; i < s.length(); i++){
            char ch = s.charAt(i);
            // if(freq.containsKey(ch)){
            //     freq.put(ch,freq.get(ch) + 1);
            // }
            // else{
            //     freq.put(ch, 1);
            // }
            
            freq.put(ch,freq.getOrDefault(ch,0) + 1);
        }
        
        int index = -1;
        for(int i = 0; i < s.length(); i++){
            if(freq.get(s.charAt(i)) == 1){
                index = i;
                break;
            }
        }
        
        return index;
    }
}