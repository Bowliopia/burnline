(function () {
const progressBar =
  document.getElementById('readProgress');

const storySection =
  document.querySelector('.reading-section');

function updateReadingProgress() {
  if (!progressBar || !storySection) return;

  const start =
    storySection.offsetTop;

  const scrollable =
    Math.max(
      1,
      storySection.offsetHeight -
      window.innerHeight
    );

  const travelled =
    window.scrollY - start;

  const progress =
    Math.max(
      0,
      Math.min(
        1,
        travelled / scrollable
      )
    );

  progressBar.style.width =
    `${progress * 100}%`;
}

window.addEventListener(
  'scroll',
  updateReadingProgress,
  { passive: true }
);

window.addEventListener(
  'resize',
  updateReadingProgress
);

updateReadingProgress();

const storyBody =
  document.querySelector(
    '[data-count-words]'
  );

const wordCount =
  document.getElementById('wordCount');

const readTime =
  document.getElementById('readTime');

if (
  storyBody &&
  wordCount &&
  readTime
) {
  const text =
    storyBody.innerText ||
    storyBody.textContent ||
    '';

  const words =
    (
      text.trim().match(/\S+/g) ||
      []
    ).length;

  const minutes =
    Math.max(
      1,
      Math.ceil(words / 225)
    );

  wordCount.textContent =
    `~ ${words.toLocaleString()} words`;

  readTime.textContent =
    `~ ${minutes} min read`;
}


})();
