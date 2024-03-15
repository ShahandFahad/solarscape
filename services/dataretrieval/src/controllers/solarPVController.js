const axios = require("axios");
// 1) Extract DATA from NREL based on the req.body
// 2) Store the specific data to assessment document with the user id recied via post request
// 3) Access that assessment in the user recent or history via user service.

// OR:
// 4) Make a post route for storing data to user document in user service. and make request from here

// Get flag icon link by country name
const flagIconLink = require("../utils/flagIconLink");
const CalcStats = require("../utils/stats");

/**
 
NREL API:
  https://developer.nrel.gov/api/pvwatts/v8.json?api_key=DEMO_KEY&lat=30&lon=69&azimuth=180&system_capacity=4&losses=14&array_type=1&module_type=0&gcr=0.4&dc_ac_ratio=1.2&inv_eff=96.0&radius=0&dataset=nsrdb&tilt=10&address=boulder,%20co&soiling=12|4|45|23|9|99|67|12.54|54|9|0|7.6&albedo=0.3&bifaciality=0.7


  Data Set: https://nsrdb.nrel.gov/about/what-is-the-nsrdb

   dcSystemSize: '4',
  systemLoss: '14.8',
  tiltAngel: '35',
  azimuthAngel: '180',
  coordinates: { lat: 30.3308401, lon: 71.247499 },
  user: { id: '65c911da1cb2d3b60af8fb77' }
*/
const solarpvdatastatic = {
  inputs: {
    lat: "30.3308401",
    lon: "71.247499",
    azimuth: "180",
    system_capacity: "4",
    losses: "14.8",
    array_type: "1",
    module_type: "0",
    gcr: "0.4",
    dc_ac_ratio: "1.2",
    inv_eff: "96.0",
    radius: "0",
    dataset: "nsrdb",
    tilt: "35",
    soiling: [12, 4, 45, 23, 9, 99, 67, 12.54, 54, 9, 0, 7.6],
    albedo: "0.3",
    bifaciality: "0.7",
  },
  errors: [],
  warnings: [],
  version: "8.2.1",
  ssc_info: {
    version: 280,
    build: "Linux 64 bit GNU/C++ Oct 18 2023 07:13:03",
    module: "pvwattsv8",
  },
  station_info: {
    lat: 30.35000038146973,
    lon: 71.25,
    elev: 0,
    tz: 5,
    location: "None",
    city: "",
    state: "",
    country: "Pakistan",
    solar_resource_file: "E7125N3035.csv",
    distance: 2141,
    weather_data_source: "NSRDB SUNY METEOSAT IODC tmy",
  },
  outputs: {
    ac_monthly: [
      404.8585984050898, 426.2624698594132, 347.8772615893587,
      452.9878653277227, 514.0748737532746, 35.11399116749989,
      190.5392141442812, 467.1802046300514, 269.9687231015196,
      492.6235872016569, 467.5483992745079, 442.6701231371835,
    ],
    poa_monthly: [
      135.3330439868619, 149.1764568968003, 119.8564707294905,
      164.0976907540511, 192.2975580322719, 15.20326755703053,
      69.56698620161072, 168.17305406451, 95.20322638235794, 178.0860185937159,
      163.8216345628137, 149.1365599424799,
    ],
    solrad_monthly: [
      4.365582064092319, 5.327730603457155, 3.866337765467436,
      5.469923025135036, 6.203147033299093, 0.5067755852343508,
      2.244096329084217, 5.424937227887421, 3.173440879411932,
      5.744710277216644, 5.460721152093789, 4.810856772338061,
    ],
    dc_monthly: [
      424.8041814508288, 446.606598583135, 366.5609465256955, 475.7643769866687,
      539.5837336238505, 42.55706961752669, 204.1116183887443,
      490.7885290521323, 285.5120791295746, 516.3253464265675,
      489.7708275877322, 463.7140577920059,
    ],
    ac_annual: 4511.705311591552,
    solrad_annual: 4.383188226226455,
    capacity_factor: 12.87587132303525,
  },
};
exports.postSolarPV = async (req, res) => {
  try {
    console.log("Request Body: ", req.body);
    const {
      dcSystemSize,
      systemLoss,
      tiltAngel,
      azimuthAngel,
      coordinates,
      user,
    } = req.body;

    console.log(
      parseFloat(dcSystemSize),
      parseFloat(systemLoss),
      parseFloat(tiltAngel),
      parseFloat(azimuthAngel),
      coordinates.lat,
      coordinates.lon,
      user.id
    );
    /**
     `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=DEMO_KEY&lat=${coordinates.lat}&lon=${coordinates.lon}&azimuth=${parseFloat(azimuthAngel)}&system_capacity=${parseFloat(dcSystemSize)}&losses=${parseFloat(systemLoss)}&array_type=1&module_type=0&gcr=0.4&dc_ac_ratio=1.2&inv_eff=96.0&radius=0&dataset=nsrdb&tilt=${parseFloat(tiltAngel)}&soiling=12|4|45|23|9|99|67|12.54|54|9|0|7.6&albedo=0.3&bifaciality=0.7`

https://developer.nrel.gov/api/pvwatts/v8.json?api_key=DEMO_KEY&lat=30&lon=69&azimuth=180&system_capacity=4&losses=14&array_type=1&module_type=0&gcr=0.4&dc_ac_ratio=1.2&inv_eff=96.0&radius=0&dataset=nsrdb&tilt=10&&soiling=12|4|45|23|9|99|67|12.54|54|9|0|7.6&albedo=0.3&bifaciality=0.7

     
     */
    // console.log("THE API:");
    // console.log(
    //   `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=DEMO_KEY&lat=${
    //     coordinates.lat
    //   }&lon=${coordinates.lon}&azimuth=${parseFloat(
    //     azimuthAngel
    //   )}&system_capacity=${parseFloat(dcSystemSize)}&losses=${parseFloat(
    //     systemLoss
    //   )}&array_type=1&module_type=0&gcr=0.4&dc_ac_ratio=1.2&inv_eff=96.0&radius=0&dataset=nsrdb&tilt=${parseFloat(
    //     tiltAngel
    //   )}&soiling=12|4|45|23|9|99|67|12.54|54|9|0|7.6&albedo=0.3&bifaciality=0.7`
    // );
    // console.log("THE API:");

    // Get the API KEY form .env file and load here
    const nrelpv = await axios.get(
      `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=${
        process.env.DEV_NREL_API_KEY
      }&lat=${coordinates.lat}&lon=${coordinates.lon}&azimuth=${parseFloat(
        azimuthAngel
      )}&system_capacity=${parseFloat(dcSystemSize)}&losses=${parseFloat(
        systemLoss
      )}&array_type=1&module_type=0&gcr=0.4&dc_ac_ratio=1.2&inv_eff=96.0&radius=0&dataset=nsrdb&tilt=${parseFloat(
        tiltAngel
      )}&soiling=12|4|45|23|9|99|67|12.54|54|9|0|7.6&albedo=0.3&bifaciality=0.7`
    );
    // console.log("NREL: ");
    // // console.log(nrelpv.data);
    const solarpvdata = nrelpv.data;

    // Pass country name dynamically
    const flagIcon = flagIconLink(solarpvdata.station_info.country);

    // TODO: Store data to user assessment model
    // TODO: GEt API KEY for NREL and SET a GET Request
    // TODO: Read iso code based on country
    // TODO: Prepare icon link and send in res to sepearete component

    // TODO: Get coordinated from assessment table and PV KW value and custom diplay it on map with pop for user history
    // Add flag icon to the results
    solarpvdata.station_info.flagIcon = flagIcon;

    // Calculte Data Stats and return with the response
    const dataStat = new CalcStats();
    const ac_mean = dataStat.mean(solarpvdata.outputs.ac_monthly).toFixed(2);
    const dc_mean = dataStat.mean(solarpvdata.outputs.dc_monthly).toFixed(2);
    const poa_mean = dataStat.mean(solarpvdata.outputs.poa_monthly).toFixed(2);
    const solrad_mean = dataStat
      .mean(solarpvdata.outputs.solrad_monthly)
      .toFixed(2);
    const dc_annual = dataStat
      .yearlySum(solarpvdata.outputs.dc_monthly)
      .toFixed(2);
    const poa_annual = dataStat
      .yearlySum(solarpvdata.outputs.poa_monthly)
      .toFixed(2);

    console.log("STATS: ");
    console.log(
      ac_mean,
      dc_mean,
      poa_mean,
      solrad_mean,
      dc_annual,
      typeof dc_annual
    );
    solarpvdata.data_stats = {
      dc_annual,
      poa_annual,
      ac_mean,
      dc_mean,
      poa_mean,
      solrad_mean,
    };

    // Make post request user service for storing user assessment history

    const userHistoryData = {
      user: req.body.user.id,
      coordinates: req.body.coordinates,
      country: solarpvdata.station_info.country, // station location
      countryFlag: flagIcon,
      ACAnnual: solarpvdata.outputs.ac_annual.toFixed(2),
      DCAnnual: parseFloat(dc_annual).toFixed(2), // self calculated
      solarRadiationAnnual: solarpvdata.outputs.solrad_annual.toFixed(2),
      capacityFactor: solarpvdata.outputs.capacity_factor.toFixed(2),
    };
    const userHistory = await axios.post(
      "http://localhost:8001/api/v1/user/store-assessment-history",
      userHistoryData
    );
    console.log("User History: ", userHistory.status);
    // Response
    res.status(200).json({
      status: "Success",
      // data: {
      //   solarpv: dummyOutput /*nrelpv.data*/,
      // },
      solarpvdata,
    });
  } catch (err) {
    console.error(err);

    // Response
    res.status(400).json({
      status: "Failed",
      name: err.name,
      message: err.message,
      error: err,
    });
  }
};
