import React, { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { chart } from 'highcharts';
import { isArray } from 'lodash';

interface Props {
  title?: any;
  subtitle?: any;
  chartCategories?: string[];
  chartOptions?: Highcharts.Options;
  chartData: Highcharts.SeriesOptionsType[];
  chartLoading?: boolean;
  typeChart?: string;
}

const Chart = ({
  title,
  chartCategories,
  chartOptions,
  subtitle,
  chartData,
  chartLoading,
  typeChart,
}: Props) => {
  const chartRef = useRef<HighchartsReact.RefObject>();
  const [options, setOptions] = useState<Highcharts.Options>({
    ...chartOptions,
    lang: {
      loading:
        '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
    },
    chart: {
      style: {
        fontFamily: 'Inter',
      },
      events: {},
      plotBackgroundColor: '',
      plotBorderWidth: undefined,
      plotShadow: false,
      type: typeChart,
    },
    xAxis: {
      ...chartOptions?.xAxis,
      categories: chartCategories,
    },
    yAxis: isArray(chartOptions?.yAxis)
      ? chartOptions?.yAxis.map(item => ({
          ...item,
          title: { ...item.title, text: item?.title?.text || null },
        }))
      : {
          ...chartOptions?.yAxis,
          title: {
            text: chartOptions?.yAxis?.title?.text || null,
          },
        },
    title: {
      ...chartOptions?.title,
      text: title,
      align: chartOptions?.title?.align || 'left',
    },
    subtitle: {
      text: subtitle,
      align: 'left',
    },
    legend: {
      align: 'center',
      x: 0,
      verticalAlign: 'bottom',
      y: 0,
      floating: false,
      backgroundColor:
        Highcharts?.defaultOptions?.legend?.backgroundColor || // theme
        'rgba(255,255,255,0.25)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          format: '{point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    tooltip: {
      shared: true,
      backgroundColor: 'rgba(38, 38, 38, 0.82)',
      style: { color: 'white' },
      borderWidth: 0,
    },
    series: chartData,
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    setOptions(opt => ({
      ...opt,
      series: chartData,
      subtitle: { text: subtitle, align: 'left' },
      xAxis: { ...chartOptions?.xAxis, categories: chartCategories },
    }));
  }, [chartData, subtitle, chartCategories]);

  useEffect(() => {
    const chartObj = chartRef.current && chartRef?.current.chart;
    chartLoading ? chartObj?.showLoading() : chartObj?.hideLoading();
    // setTimeout(() => chartObj.hideLoading(), 2000);
  }, [chartLoading]);
  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
  );
};

export default Chart;
