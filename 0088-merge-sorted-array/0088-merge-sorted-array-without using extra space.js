/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

 /*
 Approach : Without using the extra space
 
 * Start from the end: Since nums1 has enough space at the end to accommodate all elements, we fill it backwards to avoid overwriting unprocessed elements

 * Use three pointers:

  -p1 tracks the last valid element in nums1 (position m-1)
  -p2 tracks the last element in nums2 (position n-1)
  -i tracks the current fill position in nums1 (position m+n-1)

 * Compare and place: At each step, compare nums1[p1] and nums2[p2], place the larger element at position i, and move the corresponding pointer backward

 * Early termination: If all nums2 elements are placed (p2 == -1), the remaining nums1 elements are already in correct position, so we stop
 * Handle edge cases: If p1 goes out of bounds, simply copy remaining nums2 elements
  */

  // Time Complexity = O(m + n)
  // Spcae Complexity = O(1)
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1,   //Pointer for nums1 array
    p2 = n - 1;     //Pointer for nums2 array


  // Traversing the nums1 array in reverse order and inserting the elements in nums1 directly but in reverse order
  for (let i = m + n - 1; i >= 0; i--) {
    // if p2 gets out of bound (from nums2 array) i.e -1 this time then we will just break the loop since rest of the p1 elements would already be in its correct position
    if (p2 == -1) break;

    // if p1 is within the bound then only comparing nums1[p1] and nums2[p2] and inserting the greater element in the nums1 ith position
    // if p1 gets out of bound i.e -1 then we just copy then nums2 array remaining elements to nums1 (else case would run in this situation)
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[i] = nums1[p1];
      p1--;

    }
    else {
      nums1[i] = nums2[p2];
      p2--;
    }
  }
};