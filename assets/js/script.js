
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

  
  for (let button of buttons){
      button.addEventListener("click", function() {
          if (this.getAttribute("data-type") === "male") {
              gender = "male";
          }  else  {
              gender = "female";
          }    
      })
  }
})

function healthConditions () {
  if(document.getElementById('good-health').checked) {
    health = document.getElementById('good-health').value;
  }else if(document.getElementById('medium-health').checked) {
    health = document.getElementById('medium-health').value;
  }else if(document.getElementById('poor-health').checked) {
    health = document.getElementById('poor-health').value;
  }
}

function premiumProfile() {
  if(document.getElementById('increasing').checked) {
    premiumStyle = document.getElementById('increasing').value;
  }else if(document.getElementById('constant').checked) {
    premiumStyle = document.getElementById('constant').value;
  }else if(document.getElementById('decreasing').checked) {
    premiumStyle = document.getElementById('decreasing').value;
  }
}

function factors() {
  if (gender == "male") {
    genderFactor = 1.1;
  } else {
    genderFactor = 0.9;
  }
  let maritalStatus = document.getElementById("marital-status").value;
  if (maritalStatus == "married") {
    maritalFactor = 0.95;
  } else {
    maritalFactor = 1.05;
  }

  if (health == "good") {
    healthFactor = 0.7;
  } else if (health == "medium") {
    healthFactor = 1;
  } else {
    healthFactor = 1.3;
  }
}

function calculatePremium() {
  premiumProfile();
  healthConditions();
  let age = document.getElementById("age").value;
  let coverage = sliderAmount.value;
  let term = document.getElementById("term").value;
  let finalAge = parseFloat(age) + parseFloat(term);
  factors();
  let constant1 = 3 * genderFactor * maritalFactor * healthFactor;
  let constant2 = 3.5;

  // Weibull formula on final age
  let pSurvival = 2.718282**(-constant1*(finalAge/100)**(constant2));
  
  let expectedValueCoverage = coverage * (1-pSurvival);

  console.log(pSurvival);
  console.log(expectedValueCoverage);
}

