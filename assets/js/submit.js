(function () {
const tabsShell = document.getElementById('guidelines-tabs');

const tabs = tabsShell
  ? Array.from(tabsShell.querySelectorAll('[role="tab"]'))
  : [];

const panels = tabsShell
  ? Array.from(tabsShell.querySelectorAll('[role="tabpanel"]'))
  : [];

function activateTab(tab, updateHash = true) {
  tabs.forEach((item) => {
    const selected = item === tab;

    item.setAttribute(
      'aria-selected',
      String(selected)
    );

    item.setAttribute(
      'tabindex',
      selected ? '0' : '-1'
    );
  });

  panels.forEach((panel) => {
    panel.hidden =
      panel.id !== tab.getAttribute('aria-controls');
  });

  if (updateHash) {
    const hash =
      tab.id === 'tab-art'
        ? '#art'
        : '#fiction';

    if (history.replaceState) {
      history.replaceState(null, '', hash);
    } else {
      window.location.hash = hash;
    }
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener(
    'click',
    () => activateTab(tab)
  );

  tab.addEventListener('keydown', (event) => {
    let nextIndex = null;

    if (
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown'
    ) {
      nextIndex =
        (index + 1) % tabs.length;
    } else if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowUp'
    ) {
      nextIndex =
        (index - 1 + tabs.length) %
        tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();

      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    }
  });
});

function selectFromHash() {
  const target =
    window.location.hash.toLowerCase() === '#art'
      ? document.getElementById('tab-art')
      : document.getElementById('tab-fiction');

  if (target) {
    activateTab(target, false);
  }
}

window.addEventListener(
  'hashchange',
  selectFromHash
);

selectFromHash();


})();
