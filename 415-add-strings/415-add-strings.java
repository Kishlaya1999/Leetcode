class Solution {
    public String addStrings(String num1, String num2) {
        String str = "";
        int n1 = num1.length() - 1;
        int n2 = num2.length() - 1;
        int carry = 0;
        
        while(n1>=0 && n2>=0){
            
            int sum = (Character.getNumericValue(num1.charAt(n1)) + Character.getNumericValue(num2.charAt(n2))) + carry;
            carry = sum / 10;
            int insert = sum % 10;
            str += Integer.toString(insert);
            
            n1--;
            n2--;
        }
        
        while(n1>=0){
            int sum = Character.getNumericValue(num1.charAt(n1)) + carry;
            carry = sum / 10;
            int insert = sum % 10;
            str += Integer.toString(insert);
            
            n1--;
        }
        
        while(n2>=0){
            int sum = Character.getNumericValue(num2.charAt(n2)) + carry;
            carry = sum / 10;
            int insert = sum % 10;
            str += Integer.toString(insert);
            
            n2--;
        }
        
        if(carry == 1){
            str += "1";
        }
        
        String ans = reverse(str);
        
        return ans;
    }
    
    public String reverse(String str){
        
        char[] temparray = str.toCharArray();
        
        int i = 0;
        int j = temparray.length - 1;
        
        while(i<=j){
            char temp = temparray[i];
            temparray[i] = temparray[j];
            temparray[j] = temp;
            
            i++;
            j--;
        }
        
        str = String.valueOf(temparray);
        
        return str;
    }
}