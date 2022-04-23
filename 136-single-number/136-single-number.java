import java.util.*;

class Solution {

    public int singleNumber(int[] nums) {
        int result = 0;
        for (int i : nums) {
            result = result ^ i;
            //A^A^B = B => A^A = 0 =>  0^B = B at the end the number which comes only once will remain all the other number will become zero
        }
        //4^2^4^2^1 = 1
        return result;
    }
}
