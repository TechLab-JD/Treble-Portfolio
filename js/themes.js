const themes = [
  {
    font: "'Rockwell', serif",
    colors: { background: "#0a0a0a", text: "#fff", link: "#fff" },
    content: {
      header: `
      <h1>Samual B Hodgkinson</h1>
      <h3>Illustrations</h3>
      <a href="#"> >About</a>
      <a href="#"> >Contact</a>               
      `,
      main: "Image Panel 1",
      side: "Details about Panel 1"
    }
  },
  {
    font: "'Merriweather', serif",
    colors: { background: "#838383ff", text: "#111", link: "#111" },
    content: {
      header: `
      <h1>Samual B Hodgkinson</h1>
      <h3>Design</h3>
      <a href="#">About</a>
      <a href="#">Contact</a>                  
      `,
      main: "Image Panel 2",
      side: "Details about Panel 2"
    }
  },
  {
    font: "'Consolas', serif",
    colors: { background: "#585757ff", text: "#111", link: "#111" },
    content: {
      header: `
      <h1>Samual B Hodgkinson</h1>
      <h3>UI/UX</h3>
      <a href="#">About</a>
      <a href="#">Contact</a>       
      `,
      main: "Image Panel 3",
      side: "Details about Panel 3"
    }
  }  
];


let current = 0;
const total = themes.length;
const parent = document.querySelector('.parent');

function applyTheme(index) {
  const t = themes[index];
  document.body.style.fontFamily = t.font;
  document.body.style.background = t.colors.background;
  document.body.style.color = t.colors.text;

  document.querySelector('[data-section="main"]').innerHTML = t.content.main;
  document.querySelector('[data-section="side"]').innerHTML = t.content.side;

  document.querySelectorAll('a').forEach(a => {
    a.style.color = t.colors.link || t.colors.text;
  });
}

function slide(direction) {
  // 1. Add slide class
  parent.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');

  // 2. After animation ends, reset + apply new theme
  setTimeout(() => {
    parent.classList.remove('slide-left', 'slide-right');
    current = (direction === 'next') 
      ? (current + 1) % total 
      : (current - 1 + total) % total;
    applyTheme(current);
  }, 800); // matches CSS transition duration
}

document.getElementById('nextBtn').addEventListener('click', () => slide('next'));
document.getElementById('prevBtn').addEventListener('click', () => slide('prev'));

applyTheme(current);