async function fetchData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Example API

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();
