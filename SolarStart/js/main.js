/*jslint browser:true */
"use strict";

var addMonths = element => {
    let annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
    let months = document.getElementById(element).getElementsByTagName('input');

    for (let i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        annualUseKw += x;
    }

    dailyUseKw = annualUseKw / 365;
    return dailyUseKw;
}

var sunHours = () => {
    let hrs;
    let theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;

    switch(theZone) {
        case 1:
            hrs = 6;
            break;
        case 2: 
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    }

    return hrs;
}

let calculatePanel = () => {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value;
    let name = panelOptions[userChoice].text;
    let x = [power, name];

    return x;
}





var calculateSolar = () => {
    let dailyUseKw = Math.round(addMonths('mpc'));

    const sunHoursPerDay = sunHours();
    
    let minKwNeeds = dailyUseKw / sunHoursPerDay;

    let realKwNeeds = minKwNeeds * 1.25;

    let realWattNeeds = Math.round(realKwNeeds * 1000);

    let panelInfo = calculatePanel();
    let panelOutput = panelInfo[0];
    let panelName = panelInfo[1];

    let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);

    let feedback = "";
    feedback += `<p>Based on your average daily user of ${dailyUseKw} kWh, you will need to purchase ${panelsNeeded} ${panelName} to save 100% on your electrical bill</p>`
    feedback += `<h2>Additional Details</h2>`;
    feedback += `<p>Your average daily electricity consumption: ${dailyUseKw} kWh per day</p>`;
    feedback += `<p>Average sunshine hours per day: ${sunHoursPerDay} hours</p>`;
    feedback += `<p>Realistic watts needed per hour ${realWattNeeds} watts/hour</p>`
    feedback += `<p>The ${panelName} panel you selected generates about ${panelOutput} watts per hour</p>`

    document.getElementById('feedback').innerHTML = feedback;
}
