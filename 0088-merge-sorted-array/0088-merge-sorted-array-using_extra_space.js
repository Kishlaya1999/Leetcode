/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

/* 
Apporach: Using extra Space

We would be copying the first m elements of nums1 array into a dummy array and use the 2 pointers to traverse to each array (nums1Copy and nums2) 

Which ever element of which ever array (p1th element of nums1Copy or p2 element of nums2) is smaller we would insert that element in nums1 and increase the smaller element pointer . 

Edge cases to handle : p1 pointer can get out of bound or p2 pointer can get out of bound

 */


var merge = function(nums1, m, nums2, n) {

    // Creating the new array which only contains the first m elements of nums1 array
    let nums1Copy = nums1.slice(0, m);
    // Pointers which we would be using for nums1Copy and nums2
    let p1 = 0, p2 = 0;

    // We would be using nums1Copy and nums2 and insert the elements in nums1 array for final output

    for (let i = 0 ; i < m + n ; i++) { 
      // (p2 gets out of bound || ( p1 is within the bound &&  comparing the nums1Copy[p1] and nums2[p2] ))

      // if p2 gets out of bound (i.e equals to n) then copy the rest of the nums1Copy element to nums1
      // if p1 is within the bound then only comparing the nums1Copy[p1] and nums2[p2] else copy the rest of the element of nums2 to nums1 

      if (p2 == n || (p1 < m && nums1Copy[p1] < nums2[p2])) {
        nums1[i] = nums1Copy[p1];
        p1++;
      } 
      else {
        nums1[i] = nums2[p2];
        p2++;
      }
        
    }

};