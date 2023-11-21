document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const imageContainer = document.getElementById('check'); // Assuming 'check' is the correct ID

  searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query !== '') {
      searchImages(query);
    }
  });

  async function searchImages(query) {
    try {
      // Replace 'YOUR_ACCESS_KEY' with your actual Unsplash access key
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=9`, {
        headers: {
          Authorization: 'Client-ID 92QXPpdSWaKDYLTFxMHVV49XchHDYqIL65t3AgoRzkU',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      displayImages(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  function displayImages(results) {
    imageContainer.innerHTML = ''; // Clear existing images

    results.forEach(result => {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('col-md-3', 'my-4', 'mx-4', 'text-center');

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');

      const img = document.createElement('img');
      img.src = result.urls.regular;
      img.alt = result.alt_description;

      // Set fixed dimensions for all images
      img.style.width = '400px';
      img.style.height = '350px';

      const downloadBtn = document.createElement('div');
      downloadBtn.classList.add('download-btn');
      const downloadButton = document.createElement('button');
      downloadButton.classList.add('mt-2');
      downloadButton.innerHTML = `<i class="bi bi-download"></i> Download`;

      downloadButton.addEventListener('click', function () {
        downloadImage(result.urls.regular);
      });

      downloadBtn.appendChild(downloadButton);
      imgContainer.appendChild(img);
      imgContainer.appendChild(downloadBtn);
      imageDiv.appendChild(imgContainer);
      imageContainer.appendChild(imageDiv);

      // Attach event listener to dynamically created image container
      imageDiv.addEventListener('mouseenter', function () {
        downloadBtn.style.opacity = 1;
        downloadBtn.style.transform = 'translate(-50%, -50%) scale(1.2)';
      });

      imageDiv.addEventListener('mouseleave', function () {
        downloadBtn.style.opacity = 0;
        downloadBtn.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  function downloadImage(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'downloaded_image.jpg'; // You can set the desired file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
