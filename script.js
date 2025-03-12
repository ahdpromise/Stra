document.addEventListener('DOMContentLoaded', function() {
    const dataContainer = document.getElementById('dataContainer');
    const searchInput = document.getElementById('searchInput');
    const sortButton = document.getElementById('sortButton');
    let data = [];
    let ascendingOrder = true;

    // Fetch data from the provided URL
    fetch('https://offenedaten-koeln.de/dataset/tankstellen-koeln/resource/eb6b7d1e-cc42-4d8c-9b16-7a0f0e7c1f1a/download/tankstellen.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData.features.map(feature => feature.attributes);
            displayData(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display data
    function displayData(data) {
        dataContainer.innerHTML = '';
        data.forEach(item => {
            const dataItem = document.createElement('div');
            dataItem.className = 'dataItem';
            dataItem.textContent = `ID: ${item.objectid}, Adresse: ${item.adresse}`;
            dataContainer.appendChild(dataItem);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = data.filter(item => item.adresse.toLowerCase().includes(searchTerm));
        displayData(filteredData);
    });

    // Sort functionality
    sortButton.addEventListener('click', function() {
        const sortedData = data.slice().sort((a, b) => {
            const streetA = a.adresse.split(' ')[0].toLowerCase();
            const streetB = b.adresse.split(' ')[0].toLowerCase();
            return ascendingOrder ? streetA.localeCompare(streetB) : streetB.localeCompare(streetA);
        });
        ascendingOrder = !ascendingOrder;
        sortButton.textContent = `Sortieren (${ascendingOrder ? 'aufsteigend' : 'absteigend'})`;
        displayData(sortedData);
    });
});