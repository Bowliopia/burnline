(function () {
  const loadMoreButton = document.getElementById('load-more');
  const loadMoreRow = loadMoreButton
    ? loadMoreButton.closest('.load-more')
    : null;

  if (!loadMoreButton) {
    return;
  }

  loadMoreButton.addEventListener(
    'click',
    () => {
      document
        .querySelectorAll('.story-card.is-hidden')
        .forEach((card) => {
          card.classList.remove('is-hidden');
        });

      if (loadMoreRow) {
        loadMoreRow.remove();
      }
    },
    { once: true }
  );

  if (
    document.querySelectorAll('.story-card.is-hidden').length === 0 &&
    loadMoreRow
  ) {
    loadMoreRow.remove();
  }
})();
