class Solution {
    public int mostWordsFound(String[] sentences) {
        int maxWord = 0;
        for(int i = 0; i < sentences.length; i++){
            int spaces = 0;
            String sentence = sentences[i];
            for(int j = 0; j < sentence.length(); j++){
                if(sentence.charAt(j) == ' '){
                    spaces++;
                }
            }
            int words = spaces + 1;
            maxWord = Math.max(words,maxWord);
        }
        return maxWord;
    }
}