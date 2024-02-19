// 1) Extract DATA from NREL based on the req.body
// 2) Store the specific data to assessment document with the user id recied via post request
// 3) Access that assessment in the user recent or history via user service.

// OR:
// 4) Make a post route for storing data to user document in user service. and make request from here

// Get flag icon link by country name
const flagIconLink = require("../utils/flagIconLink");
exports.postSolarPV = async (req, res) => {
  try {
    console.log(req.body);

    // TODO: Store data to user assessment model
    // TODO: GEt API KEY for NREL and SET a GET Request
    // TODO: Read iso code based on country
    // TODO: Prepare icon link and send in res to sepearete component

    // TODO: Get coordinated from assessment table and PV KW value and custom diplay it on map with pop for user history
    // Pass country name dynamically
    const flagIcon = flagIconLink("Svalbard and Jan Mayen");
    // Response
    res.status(200).json({
      status: "Success",
      data: { inputs: req.body, flagIcon: flagIcon, solarpv: "" },
    });
  } catch (err) {
    console.error(err);

    // Response
    res.status(400).json({
      status: "Failed",
      error: err,
    });
  }
};
