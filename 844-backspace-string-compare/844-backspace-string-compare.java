class Solution {
    public boolean backspaceCompare(String s, String t) {
        return resultString(s).equals(resultString(t));
    }
    
    public String resultString(String str){
        
        Stack<Character> resultStack = new Stack<>();
        
        for(int i = 0; i < str.length(); i++){
            
            if(str.charAt(i) == '#'){
                if(!resultStack.isEmpty()){
                    resultStack.pop();
                }
                continue;
            }
            resultStack.push(str.charAt(i));
        }
        
        String s = "";
        
        while(!resultStack.isEmpty()){
            s += resultStack.pop();
        }
        
        return s;
    }
}