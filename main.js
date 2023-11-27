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

      // console.log(currentH1Index);

      if (currentH1Index >= h1Elements.length) {
        currentH1Index = 0;
      }
    }, audio.duration * 6);

    // everytime an h1 tag comes into view, chnage its color to red
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //entry.target.style.color = "red";
          // entry.target.classList.toggle("active");
          const word = entry.target.innerHTML;

          // find the index in h1Elements where word is the same
          const index = Array.from(h1Elements).findIndex(
            (h1) => h1.innerHTML === word
          );
          /* 
          console.log(
            "we got an h1",
            entry.target.innerHTML,
            index,
            h1Elements[index].innerHTML
          ); */

          currentH1Index = index;
        }
      });
    });

    h1Elements.forEach((h1) => {
      observer.observe(h1);
    });
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  main.addEventListener("animationend", function () {});
});
