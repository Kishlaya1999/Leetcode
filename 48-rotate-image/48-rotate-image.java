class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        
        //Finding the transpose of a matirx
        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                if(i < j){
                    swap(matrix,i,j);
                }
            }
        }
        
        // Reversing each row of the matrix
        for(int i = 0; i < n; i++){
            reverse(matrix[i]);
        }
        
        // The resultant matrix after treanspose and reversing each row will be rotated in clockwise direciton
    }
    
//  Reverse function   
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
    
//  Swap function   
    public void swap(int[][] matrix, int i, int j){
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
    
    
}