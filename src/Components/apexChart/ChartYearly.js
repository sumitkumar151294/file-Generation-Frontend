import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ChartYearly = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Pdfs`,
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const yearlyData = processDataForYearly(data);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const categories = months;
    const seriesData = categories.map((month, index) => yearlyData[index].length || 0);

    setChartOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        categories: categories,
      },
    }));
    setChartSeries([
      {
        name: 'Yearly Data',
        data: seriesData,
      },
    ]);
  }, [data]);

  return <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />;
};

const processDataForYearly = (data) => {
  const groupedData = {};

  // Initialize groupedData with empty arrays for all months (0-11)
  for (let month = 0; month < 12; month++) {
    groupedData[month] = [];
  }

  data?.forEach(document => {
    const timestamp = new Date(document.createdOn);
    const month = timestamp.getMonth(); // 0 for January, 11 for December
    groupedData[month].push(document);
  });

  return groupedData;
};

export default ChartYearly;
