const axios = require("axios");
const flagIconLink = require("../utils/flagIconLink");
const CalcStats = require("../utils/stats");

// controller
exports.postSolarPV = async (req, res) => {
    try {

        const {
            dcSystemSize,
            systemLoss,
            tiltAngel,
            azimuthAngel,
            coordinates,
            user,
        } = req.body;

        // Get the API KEY form .env file and load here
        const nrelpv = await axios.get(
            `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=${process.env.DEV_NREL_API_KEY
            }&lat=${coordinates.lat}&lon=${coordinates.lon}&azimuth=${parseFloat(
                azimuthAngel
            )}&system_capacity=${parseFloat(dcSystemSize)}&losses=${parseFloat(
                systemLoss
            )}&array_type=1&module_type=0&gcr=0.4&dc_ac_ratio=1.2&inv_eff=96.0&radius=0&dataset=nsrdb&tilt=${parseFloat(
                tiltAngel
            )}&soiling=12|4|45|23|9|99|67|12.54|54|9|0|7.6&albedo=0.3&bifaciality=0.7`
        );

        // TODO: add await to this and then check
        const solarpvdata = nrelpv.data;

        // Pass country name dynamically
        const flagIcon = flagIconLink(solarpvdata.station_info.country);

        // Add flag icon to the results
        solarpvdata.station_info.flagIcon = flagIcon;

        // Calculte Data Stats
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

        // add data stats
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

        // store user assessment
        await axios.post(
            "http://localhost:8001/api/v1/user/store-assessment-history",
            userHistoryData
        );

        // Response
        res.status(200).json({
            status: "Success",
            solarpvdata,
        });

    } catch (err) {

        // Response
        res.status(400).json({
            status: "Failed",
            name: err.name,
            message: err.message,
            error: err,
        });
    }
};
