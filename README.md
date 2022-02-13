# CalcSure - Milestone Project 2

## Overview

CalcSure is a tool designed for insurance companies' websites. The tool allows users to insert their personal data and the parameters of the life insurance policy they would like to subscribe, in order to get a personalized quote based on their unique profile.
The output consists in a time series of the yearly premium they have to pay in order to get the insurance coverage amount requested.

![Responsive Mockup](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshorts/am-i-responsive.png)

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

![Color Scheme](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshorts/color-palette.png)

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

![Input Area](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshorts/input-area.png)

### Output Area
The output box is first presented in a condensed version with key data: number of payments, total payments and average yearly premium.

![Condensed Output](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshorts/condensed-output.png)

The user can also click on the "Show payment schedule" button below to show a table with the time series of all the payment along with the subtotal.

![Payment Schedule](https://github.com/MaxRan92/calcsure/blob/main/assets/docs/screenshorts/payment-schedule.png)

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

To run a backend Python file, type `python3 app.py`, if your Python file is named `app.py` of course.

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

In Gitpod you have superuser security privileges by default. Therefore you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

To log into the Heroku toolbelt CLI:

1. Log in to your Heroku account and go to *Account Settings* in the menu under your avatar.
2. Scroll down to the *API Key* and click *Reveal*
3. Copy the key
4. In Gitpod, from the terminal, run `heroku_config`
5. Paste in your API key when asked

You can now use the `heroku` CLI program - try running `heroku apps` to confirm it works. This API key is unique and private to you so do not share it. If you accidentally make it public then you can create a new one with _Regenerate API Key_.

------

## Release History

We continually tweak and adjust this template to help give you the best experience. Here is the version history:

**September 1 2021:** Remove `PGHOSTADDR` environment variable.

**July 19 2021:** Remove `font_fix` script now that the terminal font issue is fixed.

**July 2 2021:** Remove extensions that are not available in Open VSX.

**June 30 2021:** Combined the P4 and P5 templates into one file, added the uptime script. See the FAQ at the end of this file.

**June 10 2021:** Added: `font_fix` script and alias to fix the Terminal font issue

**May 10 2021:** Added `heroku_config` script to allow Heroku API key to be stored as an environment variable.

**April 7 2021:** Upgraded the template for VS Code instead of Theia.

**October 21 2020:** Versions of the HTMLHint, Prettier, Bootstrap4 CDN and Auto Close extensions updated. The Python extension needs to stay the same version for now.

**October 08 2020:** Additional large Gitpod files (`core.mongo*` and `core.python*`) are now hidden in the Explorer, and have been added to the `.gitignore` by default.

**September 22 2020:** Gitpod occasionally creates large `core.Microsoft` files. These are now hidden in the Explorer. A `.gitignore` file has been created to make sure these files will not be committed, along with other common files.

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

------

## FAQ about the uptime script

**Why have you added this script?**

It will help us to calculate how many running workspaces there are at any one time, which greatly helps us with cost and capacity planning. It will help us decide on the future direction of our cloud-based IDE strategy.

**How will this affect me?**

For everyday usage of Gitpod, it doesn’t have any effect at all. The script only captures the following data:

- An ID that is randomly generated each time the workspace is started.
- The current date and time
- The workspace status of “started” or “running”, which is sent every 5 minutes.

It is not possible for us or anyone else to trace the random ID back to an individual, and no personal data is being captured. It will not slow down the workspace or affect your work.

**So….?**

We want to tell you this so that we are being completely transparent about the data we collect and what we do with it.

**Can I opt out?**

Yes, you can. Since no personally identifiable information is being captured, we'd appreciate it if you let the script run; however if you are unhappy with the idea, simply run the following commands from the terminal window after creating the workspace, and this will remove the uptime script:

```
pkill uptime.sh
rm .vscode/uptime.sh
```

**Anything more?**

Yes! We'd strongly encourage you to look at the source code of the `uptime.sh` file so that you know what it's doing. As future software developers, it will be great practice to see how these shell scripts work.

---

Happy coding!


## Deployment

- The site is deployed on GitHub at the followin [link](https://maxran92.github.io/the-meatseed-fund/index.html)
- The deployment process is the following
  1. In the GitHub [repository](https://github.com/MaxRan92/the-meatseed-fund), navigate to the **Settings** tab
  2. Select **Pages** from the left hand navigation tab, then select **Source** > **Branch: main**
  3. Once the main branch has been selected and the **Save** button is clicked, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.   

The live link can be found [here](https://maxran92.github.io/the-meatseed-fund/index.html)
