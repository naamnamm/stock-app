function formatChart(fetchObject) {
  //console.log(fetchObject.chart);
  const filterKey = ['date', 'close'];
  const output = fetchObject.chart.map((obj) => {
    // const filterObjectByKey = () => {
    // return Object.entries(obj).reduce((item) => {
    //   if (item[0] === 'close') {
    //     return item;
    //   }
    // });
    return Object.entries(obj)
      .filter((item) => {
        if (filterKey.includes(item[0])) {
          return item;
        }
      })
      .flat()
      .slice(1, 4);
  });
  console.log(output);
}
//});
//});
// }
// return Object.entries(obj).reduce((r, e) => {
//   if (filterKey.includes(obj[e])) {
//     r[e] = obj[e];
//   }
//   return r;
// });

//return Object.entries(obj).filter((key) => key === 'close');
//return filterKey.includes(key);
//});
//Object.entries(obj).filter((key) => filterKey.includes(key));
//});

//const outout =

// const chartData = fetchObject.chart.map(item => {
//   return {item.date, item.chose}

// })
// return {
//   chartData
// };
//}

module.exports = formatChart;

//https://stackoverflow.com/questions/22477612/converting-array-of-objects-into-array-of-arrays
