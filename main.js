document.addEventListener("DOMContentLoaded", function () {
  const main = document.querySelector("main");
  const audio = document.getElementById("audio");
  const h1Elements = document.querySelectorAll("main h1");
  const playButton = document.getElementById("playButton");
  const playPauseButton = document.getElementById("playPauseButton");
  const siteHeader = document.getElementById("siteHeader");

  let currentH1Index = 0;
  let scrollInterval;

  playButton.addEventListener("click", function () {
    home.style.display = "none";
    main.style.display = "block";
    siteHeader.style.display = "block";
    audio.play();
    playPauseButton.textContent = "PAUSE";
    autoScroll();
  });

  playPauseButton.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playPauseButton.textContent = "PAUSE";
      autoScroll();
    } else {
      audio.pause();
      playPauseButton.textContent = "PLAY";
      stopAutoScroll();
    }
  });

  function autoScroll() {
    scrollInterval = setInterval(function () {
      main.scrollTo({
        top: h1Elements[currentH1Index].offsetTop - siteHeader.offsetHeight,
        behavior: "smooth",
        block: "start",
      });

      currentH1Index++;

      if (currentH1Index >= h1Elements.length) {
        currentH1Index = 0;
      }
    }, audio.duration * 6);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const word = entry.target.innerHTML;
          const index = Array.from(h1Elements).findIndex(
            (h1) => h1.innerHTML === word
          );

          currentH1Index = index;

          const currentH1Color = getComputedStyle(h1Elements[index]).color;
          playPauseButton.style.backgroundColor = currentH1Color;
        }
      });
    });

    h1Elements.forEach((h1) => {
      observer.observe(h1);
    });
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
    const observer = new IntersectionObserver(() => {});
    h1Elements.forEach((h1) => {
      observer.unobserve(h1);
    });
  }
});
