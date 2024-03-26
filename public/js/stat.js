// 1

async function fetchVisitorsData() {
    try {
        const response = await axios.get('/api/visitors-data');

        const labels = response.data.map(item => item.date);
        const data = response.data.map(item => item.count);

        renderVisitorsChart(labels, data);
    } catch (error) {
        console.error('Ошибка получения данных о посетителях:', error);
    }
}

function renderVisitorsChart(labels, data) {
    const ctx = document.getElementById('visitorsChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Посетителей за день',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'linear',
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 16
                        }
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 16
                        }
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Количество посетителей за последние 7 дней',
                    font: {
                        size: 20
                    }

                },
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 20
                        }
                    }
                }
            }
        }
    });
}

fetchVisitorsData();

// 2

async function fetchTeaSalesData() {
    try {
        const response = await axios.get('/api/tea-sales-data');

        const labels = response.data.map(item => item.month);
        const data = response.data.map(item => item.sales);

        renderTeaSalesChart(labels, data);
    } catch (error) {
        console.error('Ошибка получения данных о продажах чая:', error);
    }
}

function renderTeaSalesChart(labels, data) {
    const ctx = document.getElementById('teaSalesChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Продажи чая за месяц',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 3000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Продажи чая за каждый месяц',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    position: 'bottom',
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 16
                        }
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 16
                        }
                    },
                },
            }
        }
    });
}

fetchTeaSalesData();

// 3

async function fetchSalesByPackagingData() {
    try {
        const response = await axios.get('/api/sales-by-packaging');
        return response.data;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
    }
}

async function createSalesByPackagingChart() {
    const data = await fetchSalesByPackagingData();
    const labels = data.map(item => item.packaging);
    const sales = data.map(item => item.sales);

    const ctx = document.getElementById('packagingSalesChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Продаж',
                data: sales,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                animateScale: true
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Продажи чая по виду упаковки',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 20
                        }
                    }
                }
            },
        }
    });
}

createSalesByPackagingChart();

// 4

async function fetchSalesByChannelsData() {
    try {
        const response = await axios.get('/api/sales-by-channels');
        return response.data;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
    }
}

async function createSalesByChannelsChart() {
    const data = await fetchSalesByChannelsData();
    const labels = data.map(item => item.channel);
    const sales = data.map(item => item.sales);

    const ctx = document.getElementById('salesByChannelsChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Продаж',
                data: sales,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 2000,
                easing: 'easeInOutQuad'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Продажи по каналам распространения',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 20
                        }
                    }
                }
            },
        }
    });
}

createSalesByChannelsChart();

// 5

async function fetchData() {
    try {
        const response = await axios.get('/api/tea-popularity-ratings'); // запрос к API на бэкенде
        return response.data;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
    }
}

async function createChart() {
    const data = await fetchData();

    const dates = data.map(item => item.date);
    const teaBlend1Ratings = data.map(item => item.teaBlend1);
    const teaBlend2Ratings = data.map(item => item.teaBlend2);
    const teaBlend3Ratings = data.map(item => item.teaBlend3);

    const ctx = document.getElementById('teaPopularityChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Рейтинг черного чая',
                    data: teaBlend1Ratings,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Рейтинг зелёного чая',
                    data: teaBlend2Ratings,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Рейтинг белого чая',
                    data: teaBlend3Ratings,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            animation: {
                duration: 2000,
                easing: 'easeInOutQuad'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Рейтинг чая',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 20
                        }
                    }
                }
            },
        }
    });
}

createChart();