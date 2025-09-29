// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
  // If first string is empty, it's always a subsequence
  if (str1.length === 0) return true;
  
  let i = 0; // pointer for str1
  let j = 0; // pointer for str2
  
  while (j < str2.length) {
    if (str1[i] === str2[j]) {
      i++;
      // If we've matched all characters in str1
      if (i === str1.length) return true;
    }
    j++;
  }
  
  return false;
}

module.exports = { isSubsequence };
