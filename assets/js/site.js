const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");

themeButton?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("writing-theme", next);
});

const filters = [...document.querySelectorAll(".filter")];
const posts = [...document.querySelectorAll(".post-row")];

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    posts.forEach((post) => {
      post.hidden = selected !== "all" && post.dataset.category !== selected;
    });
  });
});

document.querySelector(".copy-link")?.addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(window.location.href);
    button.textContent = "已复制";
  } catch {
    button.textContent = "复制失败";
  }
  window.setTimeout(() => { button.textContent = "复制链接"; }, 1600);
});

const progress = document.querySelector(".reading-progress span");
if (progress) {
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    progress.style.transform = `scaleX(${value})`;
  };
  updateProgress();
  addEventListener("scroll", updateProgress, { passive: true });
  addEventListener("resize", updateProgress);
}

