// Assignment Code
/*
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
*/


const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const nums = "0123456789";
const specs = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

var buttons = document.getElementsByClassName("btn");

var displayForm = document.getElementById("password");

buttons[1].onclick = function () {
  document.getElementById("hidden").style.display = "block";
}

buttons[0].onclick = function () {
  event.preventDefault();

  var choices = [chars];
  const errorMsg = document.getElementById("error-message");
  errorMsg.textContent = "";


  const userForm = document.forms["user-form"];

  const charsLength = userForm["num"].value;
  const lCase = userForm["low"].checked;
  const uCase = userForm["up"].checked;
  const numsYN = userForm["numeric"].checked;
  const specsYN = userForm["spec"].checked;

  if (!lCase && !uCase || charsLength < 8 || charsLength > 128) {
    errorMsg.textContent = "characters must be between 8 and 128 inclusive. Check atleast 1 of lowercase or uppercase";
    return;
  }

  if (numsYN) {
    choices[choices.length] = nums;
  }
  if (specsYN) {
    choices[choices.length] = specs;
  }

  var pwString;

  function drawPassword() {

    function generatePw() {
      pwString = "";

      for (var i = 0; i < charsLength; i++) {

        const r = Math.floor(Math.random() * choices.length);
        const n = Math.floor(Math.random() * choices[r].length);
        pwString += choices[r][n];

      }
      return pwString;
    }

    var z = true;
    while (z) {
      const pwString = generatePw();

      if (lCase && uCase) {
        if (pwString === pwString.toUpperCase() || pwString === pwString.toLowerCase()) {
          continue;
        }
      }
      
      if (numsYN) {
        if(validate(nums)){
          z=false;
        }
      }

      if (specsYN) {
        if(validate(specs)){
          z=false;
        }
      }

      if (!numsYN && !specsYN) {
        z = false;
      }

      function validate(x) {
        for (var i = 0; i < x.length; i++) {
          if (pwString.includes(x[i])) {
            return true;
          }
        }
        return false;
      }
    }




  }

  drawPassword();

  console.log(pwString);

  if (!lCase) {
    pwString = pwString.toUpperCase();
  }

  if (!uCase) {
    pwString = pwString.toLowerCase();
  }

  document.getElementById("hidden").style.display = "none";
  displayForm.value = pwString;
}
//


