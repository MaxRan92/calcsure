# CalcSure - Milestone Project 2

## Overview

CalcSure is a tool designed for insurance companies' websites. The tool allows users to insert their personal data and the parameters of the life insurance policy they would like to subscribe, in order to get a personalized quote based on their unique profile.
The output consists in a time series of the yearly premium they have to pay in order to get the insurance coverage amount requested.

![Responsive Mockup](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshots/am-i-responsive.png)

## Author
Massimo Ranalli

## Site Aims
- Create a marketing oriented tool that helps users to have an indicative life insurance plan without human intervention from consultants.
- Include several parameters about personal characteristics and desired insurance profile to calculate a personalized premium plan.
- Present key summary data as first output, with the possibility to analize the year-over-year payments required.

## UX

### Site Structure
The site is organized in a single page, that can be divided in two sections:
- Input section, in which the user can insert the data required.
- Output section, in which the user can receive its insurance quote and examine the payment plan.

### Design
The website is designed in a simple and clear way: the user can easily insert his parameters in few seconds and he is not discouraged by useless complexity.
Once the user requests the quote, the transition to focus on the output area is smooth.
The color scheme consists mainly in Yale Blue - commonly used for banking/insurance fields - , Platinum for backgrounds and Mikado Yellow to highlight website objects interactivity.

![Color Scheme](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshots/color-palette.png)

## Features 

In the following paragraphs you will find the description of the different section of the site, in order to understand how the Site Aims were put to practice.

### Input Area

  - In the Personal Information box, the user can insert his data, such as:
    1. Age, between 18 and 60 years old
    2. Gender
    3. Marital Status
    4. Health Conditions (Good, Medium, Poor)

  - In the Customize your insurance plan box, the user can insert the following contract parameters:
    1. Coverage amount: the sum to receive if the insured death event occurs
    2. Coverage term: the term, in years, of the insurance policy
    3. Premium profile: the user can pick constant payments, increasing payments and decreasing payments. With increasing premium profile, the first premium is 50% of the average premium and increases to reach a last premium equal to 150% of the average premium. The opposite is true for decreasing premium profile.

  - Once the user has selected all the required data (if something is missing, an error will appear), he can click to the Calculate your plan button do see the proposed insurance plan.

![Input Area](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshots/input-area.png)

### Output Area
The output box is first presented in a condensed version with key data: number of payments, total payments and average yearly premium.

![Condensed Output](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshots/condensed-output.png)

The user can also click on the "Show payment schedule" button below to show a table with the time series of all the payment along with the subtotal.

![Payment Schedule](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshots/payment-schedule.png)

## Calculations
The input parameters are inserted in a probability function that calculates the likelihood that the insured event will occur. Below you may find a description of the probability function and how it is used to generate the premium schedule.

### Weibull Distribution
The Weibull Distribution is a continuous probability distribution widely used in survival analysis and many other fields. [Discover More](https://en.wikipedia.org/wiki/Weibull_distribution)
For the purpose of this project, below you may find its forumla, which returns the survival probability at age **t**. 

![Weibull Function](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshots/weibull-function.png)

Where:
  -  **e** is the Euler's Number
  -  **t** is the user age at the insurance term
  -  **a** is equal to the product of the starting constant 3 multiplied in sequence by:
     - 1.1 if the user is male, 0.9 if the user is female
     - 1.05 if the user is married, 0.95 if the user is not married
     - 0.7 if the user is in good health conditions, 1 if the user is in medium health conditions, 1.3 if the user is in bad health conditions
  - **b** is a constant equal to 3.5

The rationale is the following:
  - Statistically, females tendsto live longer than men
  - Statistically, married people tend to live more than not married people
  - Statistically, people in a healthy condition live longer than people with poor health 

Below you may find the distribution function results for a *married female in good health* and for a *not married man with poor health*.  

![Weibull Distribution Example](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshots/weibull-graph.png)

**IMPORTANT**: the parameters of the function are identified in a rough and qualitative way. They are not the result of real actuarial table: their implementation would require a database that is not in the scope and capabilities of this project.

### From the probability distribution to the premium plan

  - Given *t* = the user current age, *F(t)* returns the probability *p* that the user will survive at the end of the insurance contract. Hence, *(1 - p)* is the probability that the user will not survive and the coverage will be paid from the insurance. By multiplying this last probability to the coverage amount in USD, we obtain the **expected value of the coverage**.
  - The **expected value of the coverage** is multiplied by a mark-up of 10% (which represents the average profit of the insurance) and divided by the term of the policy, to obtain the **average yearly premium**. 
  - The **average yearly premium** is then multiplied by a last factor that returns the premium at each datestamp following the premium profile selected (inreasing, decreasing or constant in time): in this way, the **payment schedule is populated**. 


## Testing 

### Validator Testing 
- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/) 
- CSS
  - No errors were found when passing through the official [Jigsaw validator](https://jigsaw.w3.org/css-validator/)
- JS
  - No errors were found when passing through the official [JSHint validator](https://jshint.com/)

### Cross Browser Testing
The site is correctly shown on Firefox, Chrome, Edge and Safari web browsers.

### Cross Device Testing
The responsiveness has been largely tested. The CSS code contemplates several breakpoints to adapt to various screen sizes, from ultrawide to several smartphone models (Samsung Galaxy S III included, with its 360px width). For this purpose, Chrome emulator has been used.
The various input object where made responsive with the display flex method. You may find more details [here](https://codepen.io/taniarascia/pen/rOLEGe/).

### Lighthouse Grades
All the pages received 100/100 on Accessibility, Best Practices and SEO requirements, both in mobile and desktop view.
Performance scores are close to 100 and, in any case, over 90.

### Unfixed Bugs
No unfixed bugs has been discovered as of today.

## Deployment

- The site is deployed on GitHub at the following [link](https://maxran92.github.io/calcsure/)
- The deployment process is the following
  1. In the GitHub [repository](https://github.com/MaxRan92/calcsure), navigate to the **Settings** tab
  2. Select **Pages** from the left hand navigation tab, then select **Source** > **Branch: main**
  3. Once the main branch has been selected and the **Save** button is clicked, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.   

The live link can be found [here](https://maxran92.github.io/calcsure/)

## Credits 

### Acknowledgements
I would like to thank again my mentor [Malia Havlicek](https://github.com/maliahavlicek), especially for her advices concerning how to organize JavaScript code following the separation of concerns principle.

### Content
- As a finance graduate, the idea along with its mathematical rationale was mainly sourced by my past studies.
- Regarding the content design, I browsed online [similar services](https://www.policybazaar.com/life-insurance/life-insurance-calculator/) and they gave me good inspiration -  

### Media
- The logo is made with [GraphicSprings](https://www.graphicsprings.com/)
- The icons in the footer are taken from [Font Awesome](https://fontawesome.com/)
- The icon on the web page tab are made with [Favicon](https://favicon.io/)  
