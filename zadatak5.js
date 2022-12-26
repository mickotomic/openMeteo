import fs from "fs";

const fajl = fs.readFileSync("Weather.csv").toString();

const niz = fajl.split(/[;\n]/g);
//console.log(niz);
const time = [];
const temperature = [];
const snowfall = [];

for (let i = 3; i < niz.length; i+=3) { 
    time.push(niz[i]);
    temperature.push(niz[i + 1]);
    snowfall.push(niz[i + 2]);

}
// console.log(temperature);

function averageTemperature(time, temp) {
    let prosek = [];
    let count = 0;
    let splitTime = [];
    time.forEach((element) => {
        splitTime.push(element.split("T")[0])
    });

    for (let i = 0; i < temp.length; i++) {
        if (splitTime[i] === splitTime[i - 1] || i === 0) {
            count += Number(temp[i]);
        } else {
            prosek.push((count / 24).toFixed(2))
            count = Number(temp[i]);
        }
    }
  //  console.log(prosek);
    const min = Math.min(...prosek);
    //console.log(min);
    const index = prosek.indexOf(min.toString());
    const day = splitTime[index *24];
    console.log("Coldest day by average temperature is " + day);
} 

function averageTemperatureByHours(time, temp) {
    let prosek = [];
    let count = 0;
    let splitTime = [];
    time.forEach((element) => {
        splitTime.push(element.split("T")[0])
    });

    for (let i = 0; i < temp.length; i++) {
        if (splitTime[i] === splitTime[i - 1] || i === 0) {
            if (temp[i] < 0) {
                count++;
            }
        } else {
            prosek.push(count);
            if (temp[i] < 0) {
                count = 1;
            } else {
                count = 0;
            }
        }
    }
  //  console.log(prosek);
    const min = Math.max(...prosek);
    //console.log(min);
    const index = prosek.indexOf(min);

    const day = splitTime[index *24];
    console.log("Coldest day by total hours under zero is " + day);
} 

function averageTemperatureByContinuedHours(time, temp) {
    let prosek = [];
    let count = 0;
    let splitTime = [];
    time.forEach((element) => {
        splitTime.push(element.split("T")[0])
    });
    prosek.push(0);

    for (let i = 0; i < temp.length; i++) {
        if (splitTime[i] === splitTime[i - 1] || i === 0) {
            if (temp[i] < 0) {
                count++;
            } else {
                if (count > prosek[prosek.length - 1]) {
                    prosek[prosek.length - 1] = count;
                    count = 0;
                    
                }
            }
        } else{
            if (count > prosek[prosek.length - 1]) {
                prosek[prosek.length - 1] = count;
            }
            prosek.push(0);
            if (temp[i] < 0) {
                count = 1;
            } else {
                count = 0;
            }
        }
    }
  //  console.log(prosek);
    const min = Math.max(...prosek);
    //console.log(min);
    const index = prosek.indexOf(min);

    const day = splitTime[index *24];
    console.log("Coldest day by continued hours under zero is " + day);
} 
averageTemperatureByContinuedHours(time, temperature);

averageTemperatureByHours(time, temperature);

averageTemperature(time, temperature);