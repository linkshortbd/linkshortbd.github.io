// Function to fetch data from the JSON file and redirect
function redirectToLink() {
    // Get the `data` parameter from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('page');  // e.g., asjdh645

    if (urlCode) {
        // Fetch the JSON data
        fetch('resources/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const linkData = data[urlCode];  // Get the specific link data using the URL code

                if (linkData) {
                    // Set Open Graph metadata
                    document.getElementById('ogTitle').content = linkData.ogTitle;
                    document.getElementById('ogDescription').content = linkData.description;
                    document.getElementById('ogImage').content = linkData.ogImage;
                    document.getElementById('ogUrl').content = linkData.ogUrl;

                    // Redirect to the actual link after setting OG data
                    setTimeout(() => {
                        window.location.href = linkData.redirectLink;
                    }, 3000);  // 3-second delay before redirection
                } else {
                    alert('Invalid link');
                }
            })
            .catch(error => {
                console.error('Error fetching the JSON file:', error);
                alert('Failed to fetch data. Please try again later.');
            });
    } else {
        alert('No page parameter found in the URL.');
    }
}

// Call the function after page loads
window.onload = redirectToLink;
