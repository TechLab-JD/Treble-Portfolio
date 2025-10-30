let currentIndex = 0;
const totalThemes = themes.length;

function applyTheme(index) {
  const theme = themes[index];

  document.body.style.fontFamily = theme.font;
  document.body.style.background = theme.colors.background;
  document.body.style.color = theme.colors.text;

  document.querySelector('[data-section="header"]').textContent = theme.content.header;
  document.querySelector('[data-section="main"]').textContent = theme.content.main;
  document.querySelector('[data-section="side"]').textContent = theme.content.side;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalThemes) % totalThemes;
  applyTheme(currentIndex);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalThemes;
  applyTheme(currentIndex);
});

applyTheme(currentIndex);
