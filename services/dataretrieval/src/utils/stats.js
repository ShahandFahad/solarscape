const ac_monthly = [
  404.8585984050898, 426.2624698594132, 347.8772615893587, 452.9878653277227,
  514.0748737532746, 35.11399116749989, 190.5392141442812, 467.1802046300514,
  269.9687231015196, 492.6235872016569, 467.5483992745079, 442.6701231371835,
];
// Perform statitical calculation on the data
class CalcStats {
  // MEAN
  // Adding all numbers in the data set and then dividing by the number of values in the set
  mean(list) {
    return list.reduce((sum, value) => sum + value, 0) / list.length;
  }

  //   MEDIAN
  /**
   *
   * The formula for the median is:
   * If n is odd: The value of the (n+1)/2-th term
   * If n is even: The average of the n/2-th and the (n/2 + 1)-th terms
   *
   * Steps to calculate the median:
   * Order the values of a data set of size n from smallest to largest
   * If n is odd, the sample median is the value in position (n + 1)/2
   * If n is even, it is the average of the values in positions n/2 and n/2 + 1
   *
   *
   * The median is the middle number. It can be found by ordering all data points and picking out the one in the middle. If there are two middle numbers, take the mean of those two numbers.
   */

  // Median (assuming the array is already sorted)
  median(list) {
    const sortedList = [...list].sort((a, b) => a - b);
    const mid = Math.floor(sortedList.length / 2);
    return sortedList.length % 2 === 0
      ? (sortedList[mid - 1] + sortedList[mid]) / 2
      : sortedList[mid];
  }

  //   STANDARD DEVIATION

  /**
   * 
   * Formula
   * Step 1: Find the mean.
   * Step 2: Subtract the mean from each score.
   * Step 3: Square each deviation.
   * Step 4: Add the squared deviations.
   * Step 5: Divide the sum by the number of scores.
   * Step 6: Take the square root of the result from Step 5.

   */
  standardDeviation(list) {
    const mean = this.mean(list);
    return Math.sqrt(
      list.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
        list.length
    );
  }

  //   Yearly Sum for all the Sol Rad, POA, DC etc
  yearlySum(list) {
    return list.reduce((sum, value) => sum + value, 0);
  }
}

// Export
module.exports = CalcStats;

/*
/// Uncomment for monthly stats
/// Assuming ac_monthly has 12 values for each month
    const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ];

    Calculate monthly mean and median
    const monthlyStatistics = months.map((month, index) => {
    const start = index * (ac_monthly.length / 12);
    const end = (index + 1) * (ac_monthly.length / 12);
    const monthlyValues = ac_monthly.slice(start, end);

    const mean =
        monthlyValues.reduce((sum, value) => sum + value, 0) / monthlyValues.length;

    /// Median (assuming the array is already sorted)
    const median = (arr) => {
        const mid = Math.floor(arr.length / 2);
        return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
    };

    return {
        month,
        mean,
        median: median([...monthlyValues].sort((a, b) => a - b)),
    };
    });

    console.log(monthlyStatistics);
*/
