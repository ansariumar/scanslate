
const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');

let startX, startY, isDragging = false, activeCanvas, selectionBox;
let croppedImages = [];

// Handle file input change
fileInput.addEventListener('change', (event) => {
    console.log("here")
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const img = new Image();
    const fileReader = new FileReader();

    // Read and display the image
    fileReader.onload = function(e) {
      img.src = e.target.result;
      img.onload = () => displayImageOnCanvas(img);
    };
    fileReader.readAsDataURL(files[i]);
  }
});

function displayImageOnCanvas(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const width = 300;
  const aspectRatio = image.width / image.height;
  const height = width / aspectRatio;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrapper');
  imageWrapper.style.position = "relative";

  // Selection box for cropping
  selectionBox = document.createElement('div');
  selectionBox.classList.add('selection-box');
  imageWrapper.appendChild(selectionBox);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove-btn');
  removeBtn.onclick = () => imageWrapper.remove();

  imageWrapper.appendChild(canvas);
  imageWrapper.appendChild(removeBtn);
  imageContainer.appendChild(imageWrapper);

  // Add mouse event listeners for selection
  canvas.addEventListener('mousedown', (e) => handleMouseDown(e, canvas));
  canvas.addEventListener('mousemove', (e) => handleMouseMove(e));
  canvas.addEventListener('mouseup', (e) => handleMouseUp(e, canvas));
}

function handleMouseDown(e, canvas) {
  startX = e.offsetX;
  startY = e.offsetY;
  activeCanvas = canvas;
  selectionBox.style.display = 'block';
  selectionBox.style.left = `${startX + canvas.offsetLeft}px`;
  selectionBox.style.top = `${startY + canvas.offsetTop}px`;
  isDragging = true;
}

function handleMouseMove(e) {
  if (!isDragging || !activeCanvas) return;
  const currentX = e.offsetX;
  const currentY = e.offsetY;

  selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
  selectionBox.style.height = `${Math.abs(currentY - startY)}px`;
  selectionBox.style.left = `${Math.min(currentX, startX) + activeCanvas.offsetLeft}px`;
  selectionBox.style.top = `${Math.min(currentY, startY) + activeCanvas.offsetTop}px`;
}

function handleMouseUp(e, canvas) {
  if (!isDragging) return;
  isDragging = false;
  selectionBox.style.display = 'none';

  const endX = e.offsetX;
  const endY = e.offsetY;

  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  const ctx = canvas.getContext('2d');
  const croppedImage = ctx.getImageData(
    Math.min(startX, endX),
    Math.min(startY, endY),
    width,
    height
  );

  // Create a new canvas to store the cropped image
  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');
  croppedCanvas.width = width;
  croppedCanvas.height = height;
  croppedCtx.putImageData(croppedImage, 0, 0);

  // Store the cropped image data as base64
  const croppedBase64 = croppedCanvas.toDataURL();
  croppedImages.push(croppedBase64);
  console.log('Cropped Image Data:', croppedBase64); // You can store or send it to the backend as needed
}
