import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

import D3PieChart from '../D3PieChart/D3PieChart';


function HomePage() {
    

    // ********* Chart.js **********
    const chartRef = useRef(null);

    useEffect(() => {
        const dataSource = {
            datasets: [
                {
                    data: [30, 350, 90], // Initial data (will be updated)
                    backgroundColor: [
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                        '#c6381a',
                        '#bec61a',
                        '#1a2fc6',
                        '#c61ab1',
                    ],
                }
            ],
            labels: [
                'Eat out',
                'Rent',
                'Groceries'
            ]
        };

        function createChart() {
            // if (chartRef.current) { 
                const ctx = chartRef.current.getContext('2d'); // Get the canvas context
                new Chart(ctx, {
                    type: 'pie',
                    data: dataSource
                });
        }

        // Function to fetch budget data and update the chart
        function getBudget() {
            axios.get('http://localhost:3000/budget')
                .then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.myBudget.length; i++) {
                        dataSource.datasets[0].data[i] = res.data.myBudget[i].value;
                        dataSource.labels[i] = res.data.myBudget[i].label;
                    }
                    createChart(); // Create chart after updating data
                })
                .catch(error => {});
        }

        getBudget(); // Fetch budget data on component mount

    }, []); // Empty dependency array to run only once when component mounts
    

  


    return (
    <div role="main" className="container center">
        
        <section className="page-area">

            <article className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article className="text-box">
                <h2>Free</h2>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article className="text-box">
                <h2>Chart</h2>
                <p>
                    <canvas ref={chartRef} id="myChart" width="400" height="400"></canvas>
                </p>
            </article>

        </section>

        
  
        <h2>D3JS</h2>
        <D3PieChart />
        
    </div>

    );
  }
  
  export default HomePage;
  