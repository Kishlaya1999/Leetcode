class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        
        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                if(i < j){
                    swap(matrix,i,j);
                }
            }
        }
        
        for(int i = 0; i < n; i++){
            reverse(matrix[i]);
        }
    }
    
    public void reverse(int[] arr){
        int i = 0;
        int j = arr.length - 1;
        
        while(i<j){
            
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
             
            i++;
            j--;
        }
    }
    
    public void swap(int[][] matrix, int i, int j){
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
    
    
}