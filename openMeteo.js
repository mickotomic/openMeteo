import axios from "axios";
import fs from "fs";


const weatherForecast = async function(){
   
    try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=44.76&longitude=19.21&hourly=temperature_2m,apparent_temperature,snowfall",
            { headers: { "Accept-Encoding": "gzip,deflate,compress" }, });
        
        const time = response.data.hourly.time;
        const temperature = response.data.hourly.temperature_2m;
        const snowfall = response.data.hourly.snowfall;

        console.log(response);
        

        let string = "TIME;APPARENT TEMPERATURE;SNOWFALL\n";
        time.forEach((element, index) => {
            string += `${element};${temperature[index]};${snowfall[index] === 0 ? false : snowfall[index]}\n`;
          });
        
        fs.writeFileSync("Weather.csv", string);
        


   } catch (err) { 
        console.log("GRESKA");
   }
}
//zadatak 2



//  async function updateCsv() { 
//     try { 
//      let interval = setInterval(() => {
//             axios.get("https://api.open-meteo.com/v1/forecast?latitude=44.76&longitude=19.21&hourly=temperature_2m,apparent_temperature,snowfall&past_days=5",
//                 { headers: { "Accept-Encoding": "gzip,deflate,compress" }, });
            
//         });
            
        
//         const time = interval.data.hourly.time;
//             const temperature = interval.data.hourly.temperature_2m;
//             const snowfall = interval.data.hourly.snowfall;

//             console.log(interval);

//             let string1 = "TIME;APPARENT TEMPERATURE;SNOWFALL\n";
//         time.forEach((element, index) => {
//             string1 += `${element};${temperature[index]};${snowfall[index] === 0 ? false : snowfall[index]}\n`;
        
//         }, 1000);
        
//         if (weatherForecast() !== string1) {
            
            
//             fs.writeFileSync("Weather.csv", string1);
//         }
//         else { 
//             console.log("nije prosao uslov");
//         }
        
//     }
//     catch (err) {
//         console.log("UPDATE FAILED");
//     }
// }
weatherForecast();
//updateCsv();

