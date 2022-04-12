class Solution {
    public void gameOfLife(int[][] board) {
        int m = board.length;
        int n = board[0].length;
        
        int[][] arr = new int[m][n];
        
        for(int i = 0; i < board.length; i++){
            for(int j = 0; j < board[0].length; j++){
                int live = 0; 
//              Traversing all the neighbours of current index
                if(i-1 != -1 && j-1 != -1 && board[i-1][j-1] == 1)   live++;
                if(i-1 != -1 && board[i-1][j] == 1)    live++;
                if(i-1 != -1 && j+1 != n && board[i-1][j+1] == 1)  live++;
                if(j-1 != -1 && board[i][j-1] == 1) live++;
                if(j+1 != n && board[i][j+1] == 1)  live++;
                if(i+1 != m && j-1 != -1 && board[i+1][j-1] == 1) live++;
                if(i+1 != m && board[i+1][j] == 1)  live++;
                if(i+1 != m && j+1 != n && board[i+1][j+1] == 1)    live++;
                
//              assigning the value of current index accoring to the live count in other array  
                if(board[i][j] == 1 && live < 2)  arr[i][j] = 0;
                else if(board[i][j] == 1 && live == 2 || live == 3) arr[i][j] = 1;
                else if(board[i][j] == 1 && live > 3)   arr[i][j] = 0;
                else if(board[i][j] == 0 && live == 3)  arr[i][j] = 1;
            }
        }
        
//      Copying the value of final array in original array    
        for(int i = 0; i< board.length; i++){
            for(int j = 0; j< board[0].length; j++){
                board[i][j] = arr[i][j];
            }
        }
            
    }
    
}