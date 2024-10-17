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
