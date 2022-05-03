class Solution {
    public int isPrefixOfWord(String sentence, String searchWord) {
        // split(" ") will seperate the words from the sentence and store it in words array
        String[] words = sentence.split(" "); 
        // For example: sentence = "this problem is an easy problem"
        // words[] = {"this","is","an","easy","problem"}
        
        
        for(int i = 0; i < words.length; i++){
            
            // Checking the current index word that it starts with searchWord or not if it starts then adding 1 (sentence is 1-indexed) to the index and returning it
            if(words[i].startsWith(searchWord)){
                return i+1;
            }
        }
        // if no such word exists which starts with searchWord then returning -1
        return -1;
    }
}