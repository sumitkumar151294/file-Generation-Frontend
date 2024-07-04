import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ChartMonthly = ({ data }) => {
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
        text: 'Pdf Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return parseInt(val, 10);
        },
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const monthlyData = processDataForMonthly(data);
    const categories = Object.keys(monthlyData).map(day => `${day}`);
    const seriesData = categories.map(day => monthlyData[day].length || 0);

    setChartOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        categories: categories,
      },
    }));
    setChartSeries([
      {
        name: 'Monthly Data',
        data: seriesData,
      },
    ]);
  }, [data]);

  return <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />;
};

const processDataForMonthly = (data) => {
  const groupedData = {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    groupedData[day] = [];
  }

  data?.forEach(document => {
    const timestamp = new Date(document.createdOn);
    const day = timestamp.getDate();
    if (!groupedData[day]) {
      groupedData[day] = [];
    }
    groupedData[day].push(document);
  });

  return groupedData;
};

export default ChartMonthly;
