
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