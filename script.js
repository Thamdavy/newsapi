const apikey = "3fefb41a92bb4f45b80e7f252760ff6a";

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        // Added a timestamp to avoid caching issues
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}&timestamp=${new Date().getTime()}`;

        // Show loading text
        blogContainer.innerHTML = "<p>Loading news...</p>";

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.articles || []; // Ensure articles exist
    } catch (error) {
        console.error("Error fetching random news:", error);
        blogContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous content

    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No news available at the moment.</p>";
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        // Image with fallback
        const img = document.createElement("img");
        img.src = article.urlToImage || "default-image.jpg"; 
        img.alt = article.title || "News Image";

        // Title with fallback
        const title = document.createElement("h2");
        title.textContent = article.title || "No Title Available";

        // Description with fallback
        const description = document.createElement("p");
        description.textContent = article.description || "No description available.";

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

// Fetch and display news on page load
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying news:", error);
    }
})();
