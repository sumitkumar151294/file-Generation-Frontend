import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = ({ data, chartType }) => {
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
        text: chartType === 'yearly' ? 'Count' : 'Pdf Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} ${chartType === 'yearly' ? 'items' : 'Pdfs'}`,
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    let processedData;
    switch (chartType) {
      case 'weekly':
        processedData = processDataForWeekly(data);
        break;
      case 'monthly':
        processedData = processDataForMonthly(data);
        break;
      case 'yearly':
        processedData = processDataForYearly(data);
        break;
      default:
        processedData = {};
    }

    const categories = Object.keys(processedData).map(day =>
      chartType === 'monthly' ? `${day}` : day
    );
    const seriesData = categories.map(day => processedData[day]?.length || 0);

    setChartOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        categories: categories,
      },
    }));
    setChartSeries([
      {
        name: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Data`,
        data: seriesData,
      },
    ]);
  }, [data, chartType]);

  return <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />;
};

const processDataForWeekly = (data) => {
  const groupedData = {};
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  let currentDate = new Date(startDate);
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

const processDataForYearly = (data) => {
  const groupedData = {};

  for (let month = 0; month < 12; month++) {
    groupedData[month] = [];
  }

  data?.forEach(document => {
    const timestamp = new Date(document.createdOn);
    const month = timestamp.getMonth();
    groupedData[month].push(document);
  });

  return groupedData;
};

export default ChartComponent;
