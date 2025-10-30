let currentIndex = 0;
const totalThemes = themes.length;
let parent = document.querySelector('.parent');

function applyThemeToElement(element, theme) {
  element.querySelector('[data-section="header"]').innerHTML = theme.content.header;
  element.querySelector('[data-section="main"]').innerHTML = theme.content.main;
  element.querySelector('[data-section="side"]').innerHTML = theme.content.side;
  element.style.fontFamily = theme.font;
  element.style.background = theme.colors.background;
  element.style.color = theme.colors.text;
  element.querySelectorAll('a').forEach(a => a.style.color = theme.colors.link || theme.colors.text);
}

function slide(direction) {
  // Clone current panel
  const oldSlide = parent;
  const newSlide = parent.cloneNode(true);

  // Compute next index
  const nextIndex = direction === 'next'
    ? (currentIndex + 1) % totalThemes
    : (currentIndex - 1 + totalThemes) % totalThemes;

  // Apply theme to new slide
  applyThemeToElement(newSlide, themes[nextIndex]);

  newSlide.classList.add('slide');
  newSlide.style.transform = direction === 'next'
    ? 'translateX(100%)'
    : 'translateX(-100%)';

  document.querySelector('.viewport').appendChild(newSlide);

  // Trigger reflow
  void newSlide.offsetWidth;

  // Animate both slides
  oldSlide.style.transition = 'transform 0.8s ease-in-out';
  newSlide.style.transition = 'transform 0.8s ease-in-out';

  oldSlide.style.transform = direction === 'next'
    ? 'translateX(-100%)'
    : 'translateX(100%)';
  newSlide.style.transform = 'translateX(0)';

  // Cleanup after animation
  setTimeout(() => {
    oldSlide.remove();
    parent = newSlide;
    currentIndex = nextIndex;
  }, 800);
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', () => slide('next'));
document.getElementById('prevBtn').addEventListener('click', () => slide('prev'));

// Initial theme
applyThemeToElement(parent, themes[currentIndex]);
