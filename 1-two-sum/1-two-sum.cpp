class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> v;
        int f = 0;
        for(int i=0;i<nums.size();i++){
            for(int j=0;j<nums.size();j++){
                if(j==i)
                    continue;
                if((nums.at(i)+nums.at(j))==target && f == 0){
                    v.push_back(i);
                    v.push_back(j);
                    f = 1;
                }
            }
        }
        return v;
    }
};