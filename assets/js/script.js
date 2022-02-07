
/*code inspired by https://www.w3schools.com/howto/howto_js_rangeslider.asp */
var sliderAmount = document.getElementById("coverage");
var outputAmount = document.getElementById("coverage-value");
outputAmount.innerHTML = sliderAmount.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderAmount.oninput = function() {
  outputAmount.innerHTML = this.value;
}

var sliderTerm = document.getElementById("term");
var outputTerm = document.getElementById("coverage-term");
outputTerm.innerHTML = sliderTerm.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderTerm.oninput = function() {
  outputTerm.innerHTML = this.value;
}


// Wait for the DOM to finish loading before running the calculation
// Add event listener to the submit button
document.addEventListener("DOMContentLoaded", function() {
  let submit = document.getElementById("submit-button");
  
  submit.addEventListener("click", calculatePremium);
   
  let buttons = document.getElementsByTagName("button");
  let gender = [];

  for (let button of buttons){
      button.addEventListener("click", function() {
          if (this.getAttribute("data-type") === "male") {
              gender = this.value;
          }  else  {
              gender = this.value;
          }    
      })
  }
  console.log(gender);
})


function calculatePremium() {
  let age = document.getElementById("age").value;
  console.log(age);
  console.log(gender);
}


