/**
 * This script reads the iso2codes.json file
 * Parse the file  into Javascript Object
 * The by providing a country name and running a loop over the file
 * It extract iso2 code for that country and reuturn a flag icon link.
 *
 * *This free Flags icon service: https://flagpedia.net/download/api
 */

// File module
const fs = require("fs");

// Read json file
const coutriesISO2JSONFile = fs.readFileSync(
  `${__dirname}/iso2codes.json`,
  "utf-8"
);

// Parse json file to js object
const coutriesISO2 = JSON.parse(coutriesISO2JSONFile);

// Function to get ISO2 code by country name
module.exports = (countryName) => {
  for (const entry of coutriesISO2) {
    const iso2Code = entry[countryName];
    if (iso2Code) {
      /**
       * If want to return only iso2 code: return iso2Code.toLowerCase();
       *
       * Prepare a link for flag icon and return: https://flagcdn.com/48x36/kz.png
       */
      return `https://flagcdn.com/48x36/${iso2Code.toLowerCase()}.png`;
    }
  }
  return null; // Return null if country name is not found
};
