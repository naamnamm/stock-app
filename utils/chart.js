const moment = require('moment');

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

function formatChart(fetchObject) {
  const labelXandY = ['date', 'close'];
  const output = fetchObject.chart.map((obj) => {
    return Object.entries(obj)
      .filter((item) => {
        //console.log(item);
        if (labelXandY.includes(item[0])) {
          // item.move(0, 1);
          // console.log(item);
          return item;
        }
      })
      .flat()
      .filter((item, index) => {
        //console.log(item);
        return index % 2 != 0;
      })
      .map((item) => {
        //console.log(item);
        if (item.length === 10) {
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
  //console.log(array);
}

module.exports = formatChart;

//https://stackoverflow.com/questions/22477612/converting-array-of-objects-into-array-of-arrays
