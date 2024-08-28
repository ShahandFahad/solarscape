/**
 * This file generate 4 digit OTP via Math randon function
 *@function utility
 */

/**
 * Math.random() returns a number beterrn 0 and 1.
 * It is then added with 1000 and multiplied with 9000 to return a float,
 * Whih is then round up to greatest integer less than or equal to its numeric argument.
 *
 * @returns 4 unique digits
 */
const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

// Export
module.exports = generateOtp;
