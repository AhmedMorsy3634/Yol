// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navbar background change on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "#000";
      navbar.style.position = "fixed";
    } else {
      navbar.style.background = "transparent";
      navbar.style.position = "absolute";
    }
  });

  // Play button click handler
  const playBtn = document.querySelector(".play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      // Add your video play functionality here
      console.log("Play button clicked");
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Initialize Video.js player
  if (document.getElementById("my-video")) {
    var player = videojs("my-video", {
      autoplay: false,
      preload: "auto",
      width: "100%",
      height: "auto",
    });
  }

  // Only initialize custom cursor for screens larger than 1024px
  if (window.innerWidth >= 1024) {
    // Create cursor elements
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    const cursorDot = document.createElement("div");
    cursorDot.classList.add("cursor-dot");
    document.body.appendChild(cursorDot);

    // Initialize cursor position variables
    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    let dotX = 0,
      dotY = 0;
    let isHovering = false;

    // Track mouse position
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop for smooth cursor movement
    function animateCursor() {
      const cursorSpeed = 0.15;
      const dotSpeed = 0.35;

      cursorX += (mouseX - cursorX) * cursorSpeed;
      cursorY += (mouseY - cursorY) * cursorSpeed;

      dotX += (mouseX - dotX) * dotSpeed;
      dotY += (mouseY - dotY) * dotSpeed;

      cursor.style.left = Math.round(cursorX) + "px";
      cursor.style.top = Math.round(cursorY) + "px";

      cursorDot.style.left = Math.round(dotX) + "px";
      cursorDot.style.top = Math.round(dotY) + "px";

      requestAnimationFrame(animateCursor);
    }

    // Start animation loop
    animateCursor();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .nav-link, .social-icon-container"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursor.style.backgroundColor = "rgba(168, 194, 208, 0.5)";
        cursorDot.style.backgroundColor = "#fff";
      });

      el.addEventListener("mouseleave", () => {
        cursor.style.width = "30px !important";
        cursor.style.height = "30px !important";
        cursor.style.backgroundColor = "transparent";
        cursorDot.style.backgroundColor = "#a8c2d0";
      });
    });

    // Handle cursor disappearing when leaving the window
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = 0;
      cursorDot.style.opacity = 0;
    });

    document.addEventListener("mouseenter", () => {
      cursor.style.opacity = 1;
      cursorDot.style.opacity = 1;
    });
  }
});
