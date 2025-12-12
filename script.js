// Responsive menu toggle (works across pages)
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
      nav.style.display = '';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
    }
  });

  // close menu on link click (mobile)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth <= 700) nav.style.display = '';
  }));
}

// Set copyright year on all pages
const y = new Date().getFullYear();
document.querySelectorAll('#year, #year-about, #year-projects, #year-contact').forEach(el => {
  if (el) el.textContent = y;
});

/* ---------- Projects modal logic ---------- */
const projects = {
  1: {
    title: 'Senthuron Cafe Webpage',
    tech: 'HTML · CSS · JavaScript',
    long: `<p><strong>Overview:</strong> Senthuron Café Webpage is a clean, modern landing page designed for a fictional café business. It showcases a hero section, a simple café menu with images, and a contact section with location and working hours. The goal was to create a visually appealing, mobile-friendly website suitable for small businesses.</p>
           <p><strong>Features:</strong></p>
           <ul>
             <li>Responsive design that adapts to mobile, tablet, and desktop</li>
             <li>Menu cards with product images and pricing</li>
             <li>Clean layout with modern UI styling</li>
           </ul>
           <p><strong>What I built:</strong> I designed the full webpage layout from scratch using HTML and CSS, focusing on a clean and professional look. I improved mobile responsiveness and structured all sections for easy readability.</p>`
  },

  2: {
    title: 'Environment friendly goods',
    tech: 'HTML · CSS · JavaScript',
    long: `<p><strong>Overview:</strong>A clean and conversion-focused landing page created for an online retailer selling eco-friendly products. The design highlights product benefits and sustainability values while keeping the layout minimal, modern, and engaging for users.</p>
           <p><strong>Features:</strong></p>
           <ul>
             <li>Product highlight sections with clear visuals and descriptions</li>
             <li>Micro-interactions and product quick-view</li>
             <li>Fully responsive design optimized for all screen sizes</li>
           </ul>
           <p><strong>What I built:</strong>I designed the complete landing page UI using HTML and CSS, focusing on simplicity and high readability. I added interactive elements with JavaScript and organized the layout to support conversions.</p>`
  },

  3: {
    title: 'Weather Website',
    tech: 'HTML · CSS · JavaScript · OpenWeather API',
    long: `<p><strong>Overview:</strong>A real-time weather application that allows users to search any city and instantly view accurate weather details. Built with a clean UI and smooth interactions, the site focuses on simplicity and fast information display.</p>
           <p><strong>Features:</strong></p>
           <ul>
             <li>Real-time weather data using the OpenWeather API</li>
             <li>Displays temperature, humidity, wind speed, and condition icons</li>
             <li>Search functionality for any city worldwide</li>
           </ul>
           <p><strong>What I built:</strong> I created an API wrapper for forecast data, implemented service worker caching strategies, and added graceful error handling for offline scenarios.</p>`
  }
};

document.addEventListener('click', (e) => {
  if (!e.target.matches('.view-details')) return;
  const id = e.target.getAttribute('data-project');
  openProjectModal(id);
});

function openProjectModal(id) {
  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-body');
  const p = projects[id];
  if (!p) return;
  body.innerHTML = `
    <h2>${p.title}</h2>
    <p class="muted">${p.tech}</p>
    <div>${p.long}</div>
    <p style="margin-top:12px"><a href="#" target="_blank" class="btn">View Live</a>
    <a href="#" target="_blank" class="btn btn-outline" style="margin-left:8px">Source</a></p>
  `;
  modal.setAttribute('aria-hidden', 'false');
}

// close modal
const modalClose = document.getElementById('modal-close');
if (modalClose) modalClose.addEventListener('click', () => {
  const modal = document.getElementById('project-modal');
  modal.setAttribute('aria-hidden', 'true');
});

// close on outside click
const modalEl = document.getElementById('project-modal');
if (modalEl) modalEl.addEventListener('click', (ev) => {
  if (ev.target === modalEl) modalEl.setAttribute('aria-hidden', 'true');
});
/* ---------- Contact form save + display ---------- */
const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
const sentMessages = document.getElementById("sentMessages");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop form reload

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const newMessage = { name, email, message };

    // Save to localStorage
    let saved = JSON.parse(localStorage.getItem("messages")) || [];
    saved.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(saved));

    // Show success message
    successMsg.style.display = "block";

    // Clear input fields
    contactForm.reset();

    // Refresh message list
    displayMessages();
  });
}

// Function to show saved messages
function displayMessages() {
  let saved = JSON.parse(localStorage.getItem("messages")) || [];

  if (!sentMessages) return;

  if (saved.length === 0) {
    sentMessages.innerHTML = "";
    return;
  }

  sentMessages.innerHTML = `<h3>Your Sent Messages</h3>` +
    saved.map(m => `
      <div class="msg-box">
        <p><strong>Name:</strong> ${m.name}</p>
        <p><strong>Email:</strong> ${m.email}</p>
        <p><strong>Message:</strong> ${m.message}</p>
        <hr>
      </div>
    `).join("");
}

// Show messages on page load
displayMessages();
