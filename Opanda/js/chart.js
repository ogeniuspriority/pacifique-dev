google.charts.load('current', {
  packages: ['corechart'],
});
google.charts.setOnLoadCallback(drawChart);

const drawChart = () => {
  const chartData = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ]);

  const options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: {
      position: 'bottom',
    },
  };

  const chart = new google.visualization.LineChart(
    document.getElementById('chart_area')
  );

  chart.draw(chartData, options);
};
