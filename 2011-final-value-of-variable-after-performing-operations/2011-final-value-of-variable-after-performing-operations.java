class Solution {
    public int finalValueAfterOperations(String[] operations) {
        int x = 0;
        for(int i = 0; i < operations.length; i++){
            if(operations[i].equals("++X") || operations[i].equals("X++")){
                x++;
            }
            else{
                x--;
            }
        }
        return x;
    }
}