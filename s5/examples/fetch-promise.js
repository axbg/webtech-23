const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Example API

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log('API response:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
