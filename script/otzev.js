document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const next = document.querySelector(".carousel-btn.next");
  const prev = document.querySelector(".carousel-btn.prev");

  if (track && next && prev) {
    const scrollAmount = 220;

    next.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }
});
