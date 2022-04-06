class Solution {

    public int threeSumMulti(int[] arr, int target) {
        long ans = 0;
//      As  0 <= arr[i] <= 100 
//      count array is used for storing the frequency of element which lie b/w 0 - 100 which are 101 numbers   
        long count[] = new long[101];
        
//      Storing the ferquency of all the elements in arr in count array   
        for(int i = 0; i < arr.length; i++){
            count[arr[i]]++;
        }
        
        for(int i = 0 ; i <= 100; i++){
            for(int j = i; j <= 100; j++){
                int k = target - ( i + j);
                
                if(k<0 || k>100){
                    continue;
                }
                
                long freqI = count[i];
                long freqJ = count[j];
                long freqK = count[k];

//              if all the numbers are same nC3
//              nC3 = (n!/((n-3)! * 3!)) = ((n * (n-1) * (n-2))/6)
                if(i==j && j==k){
                    ans = ans + (freqI * (freqI-1) * (freqI-2))/6;
                }
                
//              if first two numbers are same
                if(i==j && j!=k){
                    ans = ans + (freqK * (freqI * (freqI - 1) / 2));
                }
                
//              if all the numbers are different 
                if(i < j && j < k){
                    ans = ans + (freqI * freqJ * freqK);
                }
            }
        }
        return (int)(ans % 1000000007);
    }
}
