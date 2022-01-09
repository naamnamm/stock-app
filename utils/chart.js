const moment = require('moment');

// create a function to format date
const formatDate = (date) => moment(date).format('MMM DD');

// manipulate the object to get chart data
function formatChart(fetchObject) {
  const formattedData = [['date', 'close']];

  fetchObject.chart.forEach(({ date, close }) => {
    formattedData.push([formatDate(date), close]);
  });

  return formattedData;
}

module.exports = formatChart;


