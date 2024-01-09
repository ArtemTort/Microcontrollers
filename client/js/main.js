// script.js

const tableBody = document.getElementById('table-body');
const downloadButton = document.querySelector('.download-button');

// Генерация значений x и y для гиперболы
const xData = [];
const yData = [];

for (let i = 1; i <= 30; i++) {
    xData.push(i);
    yData.push(1 / i);

    const row = document.createElement('tr');
    const xCell = document.createElement('td');
    const yCell = document.createElement('td');

    xCell.textContent = i;
    yCell.textContent = (1 / i).toFixed(2);

    row.appendChild(xCell);
    row.appendChild(yCell);
    tableBody.appendChild(row);
}

// Создаем график
const trace = {
    x: xData,
    y: yData,
    type: 'scatter',
    mode: 'markers+lines',
    name: 'Гипербола'
};

const layout = {
    title: 'График гиперболы',
    xaxis: { title: 'X' },
    yaxis: { title: 'Y' }
};

Plotly.newPlot('plot', [trace], layout);

// Добавляем обработчик события для кнопки
downloadButton.addEventListener('click', () => {
  const tableData = Array.from(tableBody.querySelectorAll('tr')).map(row => {
    return Array.from(row.children).map(cell => cell.textContent).join('\t');
  }).join('\n');

  const blob = new Blob([tableData], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'table_data.txt');
});
