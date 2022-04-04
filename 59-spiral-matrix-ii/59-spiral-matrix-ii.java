class Solution {
    public int[][] generateMatrix(int n) {
       
        int[][] matrix = new int[n][n];
       
        int count = 1;
        
        int colStart = 0,
            colEnd = matrix.length-1;
        int rowStart = 0,
            rowEnd = matrix.length-1;
       
        while(count <= n*n){
            
            for(int i = colStart; i <= colEnd; i++){
                matrix[rowStart][i] = count;
                count++;
            }
            rowStart++;
            
            for(int j = rowStart; j <= rowEnd; j++){
                matrix[j][colEnd] = count;
                count++;
            }
            colEnd--;
            
            for(int k = colEnd; k >= colStart; k--){
                matrix[rowEnd][k] = count;
                count++;
            }
            rowEnd--;
            
            for(int l = rowEnd; l >= rowStart; l--){
                matrix[l][colStart] = count;
                count++;
            }
            colStart++;
        }
        return matrix;
    }
}