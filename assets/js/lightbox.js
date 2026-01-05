// Lightbox functionality for images
(function() {
  'use strict';

  let currentImageIndex = 0;
  let imagesList = [];

  // Create lightbox overlay element
  function createLightboxOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button class="lightbox-prev" aria-label="Previous image">&lt;</button>
      <img class="lightbox-image" src="" alt="">
      <button class="lightbox-next" aria-label="Next image">&gt;</button>
      <button class="lightbox-close" aria-label="Close">&times;</button>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  // Show image at specific index
  function showImage(index) {
    const lightboxImage = document.querySelector('.lightbox-image');
    if (imagesList.length > 0) {
      currentImageIndex = (index + imagesList.length) % imagesList.length;
      lightboxImage.src = imagesList[currentImageIndex].src;
      lightboxImage.alt = imagesList[currentImageIndex].alt;
    }
  }

  // Navigate to previous image
  function prevImage() {
    showImage(currentImageIndex - 1);
  }

  // Navigate to next image
  function nextImage() {
    showImage(currentImageIndex + 1);
  }

  // Close lightbox
  function closeLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Initialize lightbox
  function initLightbox() {
    const overlay = createLightboxOverlay();
    const lightboxImage = overlay.querySelector('.lightbox-image');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');
    const closeBtn = overlay.querySelector('.lightbox-close');

    // Find all images with alt="mhkarami97"
    const images = document.querySelectorAll('.article-post img');
    imagesList = Array.from(images);

    images.forEach(function(img, index) {
      // Add clickable class for hover effect
      img.classList.add('clickable-image');

      // Add click event to open lightbox
      img.addEventListener('click', function(e) {
        e.preventDefault();
        currentImageIndex = index;
        showImage(currentImageIndex);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Previous button click
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      prevImage();
    });

    // Next button click
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      nextImage();
    });

    // Close button click
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeLightbox();
    });

    // Close lightbox when clicking on overlay
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (overlay.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
