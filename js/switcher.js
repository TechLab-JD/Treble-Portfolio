let currentIndex = 0;
const totalThemes = themes.length;
const parent = document.querySelector('.parent');

function applyTheme(index) {
  const theme = themes[index];

  document.body.style.fontFamily = theme.font;
  document.body.style.background = theme.colors.background;
  document.body.style.color = theme.colors.text;

  document.querySelector('[data-section="header"]').innerHTML = theme.content.header;
  document.querySelector('[data-section="main"]').innerHTML = theme.content.main;
  document.querySelector('[data-section="side"]').innerHTML = theme.content.side;

  document.querySelectorAll('a').forEach(link => {
    link.style.color = theme.colors.link || theme.colors.text;
  });
}

// Slide animation function
function slide(direction) {
  const className = direction === 'next' ? 'slide-next' : 'slide-prev';
  parent.classList.add(className);

  setTimeout(() => {
    parent.classList.remove('slide-next', 'slide-prev');

    currentIndex = direction === 'next'
      ? (currentIndex + 1) % totalThemes
      : (currentIndex - 1 + totalThemes) % totalThemes;

    applyTheme(currentIndex);

    // Position off-screen for new slide
    parent.style.transition = 'none';
    parent.style.transform = direction === 'next'
      ? 'translateX(100%)'
      : 'translateX(-100%)';
    parent.style.opacity = 0;

    // Force reflow
    void parent.offsetWidth;

    // Animate back to center
    parent.style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
    parent.style.transform = 'translateX(0)';
    parent.style.opacity = 1;
  }, 800);
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', () => slide('next'));
document.getElementById('prevBtn').addEventListener('click', () => slide('prev'));

// Initial theme
applyTheme(currentIndex);
