class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        
        List<Integer> ans = new ArrayList<>();
        int rows = matrix.length, 
            cols = matrix[0].length;
        int colStart = 0,
            colEnd = matrix[0].length-1;
        int rowStart = 0,
            rowEnd = matrix.length-1;
        int count = 0;
        
        while(count < rows * cols){
            
            for(int i = colStart; i <= colEnd && count < rows * cols; i++){
                ans.add(matrix[rowStart][i]);
                count++;
            }
            rowStart++;
            
            for(int j = rowStart; j <= rowEnd && count < rows * cols; j++){
                ans.add(matrix[j][colEnd]);
                count++;
            }
            colEnd--;
            
            for(int k = colEnd; k >= colStart && count < rows * cols; k--){
                ans.add(matrix[rowEnd][k]);
                count++;
            }
            rowEnd--;
            
            for(int l = rowEnd; l >= rowStart && count < rows * cols; l--){
                ans.add(matrix[l][colStart]);
                count++;
            }
            colStart++;
            
        }
        return ans;
    }
}