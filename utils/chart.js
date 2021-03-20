const moment = require('moment');

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

function formatChart(fetchObject) {
  const labelXandY = ['date', 'close'];
  const output = fetchObject.chart.map((obj) => {
    return Object.entries(obj)
      .filter((item) => {
        if (labelXandY.includes(item[0])) {
          return item;
        }
      })
      .flat()
      .filter((item, index) => {
        return index % 2 != 0;
      })
      .map((item) => {
        //debugger;
        if (item.length === 10 && moment(item, 'YYYY/MM/DD').isValid()) {
          return moment(item).format('MMM DD');
        }
        return item;
      });
  });

  output.map((item) => {
    item.move(0, 1);
    return item;
  });

  output.unshift(labelXandY);
  return output;
}

module.exports = formatChart;

//&& moment(item, 'YYYY/MM/DD', true).isValid()
//https://stackoverflow.com/questions/22477612/converting-array-of-objects-into-array-of-arrays
