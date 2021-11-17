import React, { useEffect, useRef } from 'react'

import { Chart, registerables } from 'chart.js'

Chart.defaults.font.family = 'DM Sans'

const LineChart = ({data, labels}) => {
    
    const chartRef = useRef(null)

    useEffect(() => {

        const chartCtx = chartRef.current.getContext('2d')
            
        const lineChart = new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: data,
                    fill: true,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        displayColors: false,
                        titleFont: {
                            size: 16,
                        },
                        bodyFont: {
                            size: 14,
                        },
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || ''
        
                                if (label) {
                                    label += ': '
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                                }
                                return label
                            }
                        },
                    },
                },
                tension: .5,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + value
                            },
                            padding: 10,
                        },
                        grid: {
                            drawBorder: false,
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                }
            }
        }) 

        return () => {
            lineChart.destroy()
        }

    })

    Chart.register(...registerables)


    return (
        <canvas id='lineChart' ref={chartRef}/>
    )
}

export default LineChart