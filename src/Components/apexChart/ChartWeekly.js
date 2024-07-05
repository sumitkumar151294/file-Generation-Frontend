import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ChartWeekly = ({ data }) => {
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
        formatter: (val) => `${val} items`,
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);

    const weeklyData = processDataForWeekly(data, startDate);
    const categories = Object.keys(weeklyData);
    const seriesData = categories.map(day => weeklyData[day].length || 0);

    setChartOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        categories: categories,
      },
    }));
    setChartSeries([
      {
        name: 'Weekly Data',
        data: seriesData,
      },
    ]);
  }, [data]);

  return <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />;
};

const processDataForWeekly = (data, startDate) => {
  const groupedData = {};
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const monthName = currentDate.toLocaleString('default', { month: 'short' });
    const dayOfMonth = currentDate.getDate();
    const dateString = `${dayOfMonth} ${monthName}`;

    groupedData[dateString] = [];
    currentDate.setDate(currentDate.getDate() + 1);
  }

  data?.forEach(document => {
    const timestamp = new Date(document.createdOn);
    const monthName = timestamp.toLocaleString('default', { month: 'short' });
    const dayOfMonth = timestamp.getDate();
    const dateString = `${dayOfMonth} ${monthName}`;

    if (groupedData[dateString]) {
      groupedData[dateString].push(document);
    }
  });

  return groupedData;
};

export default ChartWeekly;
