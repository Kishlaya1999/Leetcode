//Brute Force solution using hashmap
Time Complexity : O(n)
Space Complexity : O(n)
​
​
Optimized Solution using XOR operator
​
public int singleNumber(int[] nums) {
int result = 0;
for(int i : nums) {
result = result ^ i;    //A^A^B = B => A^A = 0 =>  0^B = B at the end the number which comes only once will remain all the other number will become zero
}
return result;
}