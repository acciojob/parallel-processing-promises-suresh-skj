document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Create loading and error messages (only once)
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.innerText = "Loading...";
  loadingDiv.style.display = "none";
  output.appendChild(loadingDiv);

  const errorDiv = document.createElement("div");
  errorDiv.id = "error";
  errorDiv.style.color = "red";
  errorDiv.style.display = "none";
  output.appendChild(errorDiv);

  // Function to download a single image
  function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${url}`);
    });
  }

  // Function to download all images
  function downloadImages() {
    // ❗ Clear only images (preserve loading/error messages)
    const images = output.querySelectorAll("img");
    images.forEach((img) => img.remove());

    errorDiv.style.display = "none"; // Hide error
    loadingDiv.style.display = "block"; // Show loading

    const imageUrls = [
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/id/238/200/300",
      "https://picsum.photos/id/239/200/300",
    ];

    const promises = imageUrls.map(downloadImage);

    Promise.all(promises)
      .then((images) => {
        loadingDiv.style.display = "none"; // Hide loading

        // Append images
        images.forEach((img) => output.appendChild(img));
      })
      .catch((error) => {
        loadingDiv.style.display = "none"; // Hide loading
        errorDiv.innerText = error;
        errorDiv.style.display = "block"; // Show error message
      });
  }

  // Add event listener to the button
  document
    .getElementById("download-images-button")
    .addEventListener("click", downloadImages);
});
