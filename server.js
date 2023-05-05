const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 4000;

const dummyflightsData = [
    { source: "Delhi", destination: "Mumbai", date: "2023-05-25", price: 2500, flight_name: "Air India" },
    { source: "Delhi", destination: "Mumbai", date: "2023-05-25", price: 4500, flight_name: "Go Air" },
    { source: "Mumbai", destination: "Chennai", date: "2023-06-12", price: 3000, flight_name: "IndiGo" },
    { source: "Chennai", destination: "Kolkata", date: "2023-05-16", price: 3500, flight_name: "SpiceJet" },
    { source: "Kolkata", destination: "Bangalore", date: "2023-05-30", price: 4000, flight_name: "Vistara" },
    { source: "Bangalore", destination: "Hyderabad", date: "2023-06-09", price: 2500, flight_name: "GoAir" },
    { source: "Hyderabad", destination: "Ahmedabad", date: "2023-06-01", price: 3000, flight_name: "Air Asia" },
    { source: "Ahmedabad", destination: "Pune", date: "2023-05-25", price: 3500, flight_name: "Air India" },
    { source: "Pune", destination: "Jaipur", date: "2023-05-25", price: 4000, flight_name: "IndiGo" },
    { source: "Jaipur", destination: "Lucknow", date: "2023-05-25", price: 2500, flight_name: "SpiceJet" },
    { source: "Lucknow", destination: "Chandigarh", date: "2023-05-25", price: 3000, flight_name: "Vistara" }
  ];

  const htmlString = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Welcome to our website!</title>
    </head>
    <body>
      <h1>Welcome to our website!</h1>
      <p>Hello from the backend. Please find below the end points and how to query a flight detail.</p>
      <h2>Endpoints:</h2>
      <ul>
        <li><a href="/">/</a> - Home Page ( this )</li>
        <li><a href="/Delhi/Mumbai/2023-05-25">/Delhi/Mumbai/2023-05-25</a> - /source/destination/date (Tempalate)</li>
      </ul>
    </body>
  </html>
  `;

app.get('/' , (req , res)=>{
    res.send(htmlString)
});


app.get('/:source/:destination/:date' , (req , res)=>{
    const source = req.params.source;
    const destination = req.params.destination;
    const date = req.params.date;
    // console.log(source + ' ' + destination + ' ' + date)

    const filteredFlights = dummyflightsData.filter(flight => 
        flight.source === source && 
        flight.destination === destination &&
        flight.date === date
      );
      
      if (filteredFlights.length > 0) {
        const flightList = filteredFlights.map(flight => {
            return {
              flight_name: flight.flight_name,
              price: flight.price
            };
          });
        const data  = JSON.stringify(flightList , null, 2);
        res.send(data)
      } else {
        res.send("<h2>No flights found.</h2>");
      }
  
   
});




app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`); 
});