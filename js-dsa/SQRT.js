function integerSquareRoot(NumberStr) {
  if (NumberStr === "0" || NumberStr === "1") return NumberStr;

  // Compare two numeric strings: returns 1 if a > b, -1 if a < b, 0 if equal
  function compare(a, b) {
    if (a.length !== b.length) {
      return a.length > b.length ? 1 : -1;
    }
    return a.localeCompare(b);
  }

  // Add two numeric strings
  function add(num1, num2) {
    let res = "";
    let i = num1.length - 1;
    let j = num2.length - 1;
    let carry = 0;
    while (i >= 0 || j >= 0 || carry > 0) {
      let sum = carry;
      if (i >= 0) sum += parseInt(num1[i--], 10);
      if (j >= 0) sum += parseInt(num2[j--], 10);
      res = (sum % 10) + res;
      carry = Math.floor(sum / 10);
    }
    return res;
  }

  // Multiply two numeric strings
  function multiply(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    let len1 = num1.length;
    let len2 = num2.length;
    let pos = new Array(len1 + len2).fill(0);

    for (let i = len1 - 1; i >= 0; i--) {
      for (let j = len2 - 1; j >= 0; j--) {
        let mul = parseInt(num1[i], 10) * parseInt(num2[j], 10);
        let p1 = i + j;
        let p2 = i + j + 1;
        let sum = mul + pos[p2];

        pos[p2] = sum % 10;
        pos[p1] += Math.floor(sum / 10);
      }
    }

    let resultStr = pos.join("").replace(/^0+/, "");
    return resultStr === "" ? "0" : resultStr;
  }

  // Divide a numeric string by 2 (integer division)
  function divideBy2(numStr) {
    let res = "";
    let carry = 0;
    for (let j = 0; j < numStr.length; j++) {
      let current = carry * 10 + parseInt(numStr[j], 10);
      res += Math.floor(current / 2);
      carry = current % 2;
    }
    return res.replace(/^0+/, "") || "0";
  }

  // Binary search range [1, NumberStr]
  let low = "1";
  let high = NumberStr;
  let ans = "0";

  while (compare(low, high) <= 0) {
    // Find mid = (low + high) / 2
    let sum = add(low, high);
    let mid = divideBy2(sum);

    let midSquared = multiply(mid, mid);

    // If mid * mid <= NumberStr
    if (compare(midSquared, NumberStr) <= 0) {
      ans = mid;
      // low = mid + 1
      low = add(mid, "1");
    } else {
      // high = mid - 1 (using simple approximation or subtraction, but here we can just use mid as upper bound or decrement via string arithmetic)
      // For safety in binary search, we can compute high by subtracting 1 from mid
      high = subtractOne(mid);
    }
  }

  return ans;
}

// Helper to subtract 1 from a numeric string
function subtractOne(numStr) {
  let arr = numStr.split("");
  let i = arr.length - 1;
  while (i >= 0) {
    if (arr[i] > "0") {
      arr[i] = String(Number(arr[i]) - 1);
      break;
    } else {
      arr[i] = "9";
      i--;
    }
  }
  let res = arr.join("").replace(/^0+/, "");
  return res === "" ? "0" : res;
}
