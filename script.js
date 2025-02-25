document.getElementById('imageUpload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to compressed image
        const compressedImage = canvas.toDataURL('image/jpeg', 0.7);

        // Display compressed image
        const compressedImgElement = document.getElementById('compressedImage');
        compressedImgElement.src = compressedImage;
        compressedImgElement.style.display = 'block';

        // Show download link
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = compressedImage;
        downloadLink.style.display = 'inline-block';

        // Update file info
        document.getElementById('fileInfo').textContent = `File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
      };
    };
    reader.readAsDataURL(file);
  }
});
