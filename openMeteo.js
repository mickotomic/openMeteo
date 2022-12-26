import axios from "axios";
import fs from "fs";


async function weatherForecast(){
   
    try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=44.76&longitude=19.21&hourly=temperature_2m,apparent_temperature,snowfall",
            { headers: { "Accept-Encoding": "gzip,deflate,compress" }, });
        
        const time = response.data.hourly.time;
        const temperature = response.data.hourly.temperature_2m;
        const snowfall = response.data.hourly.snowfall;

        

        let string = "TIME;APPARENT TEMPERATURE;SNOWFALL\n";
        time.forEach((element, index) => {
            string += `${element};${temperature[index]};${snowfall[index] === 0 ? false : snowfall[index]}\n`;
          });
        //   console.log(string);
        
        return string;


   } catch (err) { 
        console.log("GRESKA");
    }
    
}
const weather1 = await weatherForecast();
fs.writeFileSync("Weather.csv", weather1);
        

//zadatak 4



 async function updateCsv() { 
     try {
         const readWeatherFromFile = fs.readFileSync("Weather.csv").toString();
         const current = await weatherForecast();



         if (readWeatherFromFile !== current) {
             fs.writeFileSync("Weather.csv", current);
             console.log("FAJL AZURIRAN");
         }
          else { 
             throw new Error("Nije prosao if");
         }
     }
     catch(err) { 
         console.log("FAJL NIJE AZURIRAN");
     }  
}
//zadatak5


weatherForecast();
setInterval(()=>updateCsv(),3600 );

