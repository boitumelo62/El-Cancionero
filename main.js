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
    siteHeader.style.display = "block"; // Show the header on play
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
        currentH1Index = 0; // Reset to the first H1
      }
    }, audio.duration * 10); // Adjust based on your song duration
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  main.addEventListener("animationend", function () {
    // Add your transition animations here
  });
});
