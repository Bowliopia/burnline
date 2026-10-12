(function () {
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const modalClose = document.getElementById('modalClose');
const previousArt = document.getElementById('previousArt');
const nextArt = document.getElementById('nextArt');
const loadMoreButton = document.getElementById('loadMoreBtn');
const loadMoreRow = document.getElementById('load-more-row');

let galleryItems = [];
let currentIndex = 0;
let lastFocusedElement = null;

function getVisibleGalleryItems() {
  galleryItems = Array.from(
    document.querySelectorAll('.gallery-item:not(.is-hidden)')
  );
}

function updateModal(index) {
  if (!galleryItems.length) return;

  currentIndex =
    (index + galleryItems.length) % galleryItems.length;

  const item = galleryItems[currentIndex];
  const image = item.querySelector('img');

  modalImage.src = image.currentSrc || image.src;
  modalImage.alt =
    image.alt || 'Expanded Burnline artwork';

  modalTitle.textContent =
    item.dataset.title || 'Untitled artwork';

  modalArtist.textContent =
    item.dataset.artist
      ? `by ${item.dataset.artist}`
      : '';
}

function openModal(item) {
  getVisibleGalleryItems();

  const index = galleryItems.indexOf(item);

  if (index < 0) return;

  lastFocusedElement = document.activeElement;

  updateModal(index);

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  modalImage.src = '';

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus === 'function'
  ) {
    lastFocusedElement.focus();
  }
}

function bindGalleryItems() {
  document
    .querySelectorAll('.gallery-item')
    .forEach((item) => {
      if (item.dataset.bound === 'true') return;

      item.dataset.bound = 'true';

      item.addEventListener(
        'click',
        () => openModal(item)
      );

      item.addEventListener(
        'keydown',
        (event) => {
          if (
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault();
            openModal(item);
          }
        }
      );
    });
}

modalClose.addEventListener('click', closeModal);

previousArt.addEventListener(
  'click',
  () => updateModal(currentIndex - 1)
);

nextArt.addEventListener(
  'click',
  () => updateModal(currentIndex + 1)
);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('show')) return;

  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'ArrowLeft') {
    updateModal(currentIndex - 1);
  }

  if (event.key === 'ArrowRight') {
    updateModal(currentIndex + 1);
  }
});

if (loadMoreButton) {
  loadMoreButton.addEventListener(
    'click',
    () => {
      document
        .querySelectorAll(
          '#issueArtGrid .art-tile.is-hidden'
        )
        .forEach((item) => {
          item.classList.remove('is-hidden');
        });

      getVisibleGalleryItems();

      if (loadMoreRow) {
        loadMoreRow.remove();
      }
    },
    { once: true }
  );

  if (
    document.querySelectorAll(
      '#issueArtGrid .art-tile.is-hidden'
    ).length === 0 &&
    loadMoreRow
  ) {
    loadMoreRow.remove();
  }
}

bindGalleryItems();
getVisibleGalleryItems();


})();
