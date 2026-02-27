import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ActivityChart = () => {
  const chartRef = useRef(null);
  const [commitData, setCommitData] = useState([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [themeColor, setThemeColor] = useState('#6366f1');

  // Generate dynamic labels for the last 6 months
  const chartLabels = useMemo(() => {
    const months = [];
    const date = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
      months.push(d.toLocaleString('default', { month: 'short' }));
    }
    return months;
  }, []);

  useEffect(() => {
    const updateThemeColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--text-link').trim();
      if (color) {
        setThemeColor(color);
        // Manually update chart if it exists
        if (chartRef.current) {
          const chart = chartRef.current;
          chart.data.datasets[0].borderColor = color;
          chart.data.datasets[1].backgroundColor = color;
          chart.update();
        }
      }
    };

    // Initial set
    updateThemeColor();

    // We can also listen for theme changes if needed, but the current 
    // App.js logic updates the DOM immediately which this will pick up on re-render.
    // To be extra safe, we'll use a MutationObserver to detect theme changes on the html tag
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

    const fetchGithubActivity = async () => {
      try {
        const now = new Date();
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        const query = `
          query {
            user(login: "bamsemats") {
              contributionsCollection(
                from: "${sixMonthsAgo.toISOString()}"
                to: "${now.toISOString()}"
              ) {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;

        // Point to our local serverless proxy
        const response = await fetch("/api/github", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Proxy fetch failed");
        }

        const result = await response.json();
        
        if (result.errors || !result.data) {
          throw new Error(result.errors ? result.errors[0].message : "No data");
        }

        const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks;
        const days = weeks.flatMap(week => week.contributionDays);
        const counts = new Array(6).fill(0);

        days.forEach(day => {
          const date = new Date(day.date);
          const monthDiff = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
          if (monthDiff >= 0 && monthDiff < 6) {
            const index = 5 - monthDiff;
            counts[index] += day.contributionCount;
          }
        });

        setCommitData(counts);
        setTotalCommits(counts.reduce((a, b) => a + b, 0));
        setLoading(false);

      } catch (error) {
        console.warn("GitHub Proxy Error, using fallback:", error);
        // Fallback mock data if proxy is unavailable or token is missing in local dev
        const mockData = [12, 45, 28, 64, 42, 58];
        setCommitData(mockData);
        setTotalCommits(mockData.reduce((a, b) => a + b, 0));
        setLoading(false);
      }
    };

    fetchGithubActivity();

    // Clean up observer
    return () => observer.disconnect();
  }, []);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        type: 'line',
        label: 'Trend',
        data: commitData,
        borderColor: themeColor,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, themeColor); 
          gradient.addColorStop(1, 'transparent');
          return gradient;
        },
      },
      {
        type: 'bar',
        label: 'Commits',
        data: commitData,
        backgroundColor: themeColor,
        borderRadius: 6,
        hoverBackgroundColor: themeColor,
        barThickness: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      y: { display: false, beginAtZero: true },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: 'rgba(128, 128, 128, 0.5)',
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div className="activity-chart-wrapper">
      <div className="chart-header">
        <span className="chart-title">GitHub Activity</span>
        <span className="chart-stat">{loading ? '...' : `${totalCommits} Commits`}</span>
      </div>
      <div style={{ height: '80px', width: '240px' }}>
        <Chart ref={chartRef} type='bar' data={data} options={options} />
      </div>
    </div>
  );
};

export default ActivityChart;
