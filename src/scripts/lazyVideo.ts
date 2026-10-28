// Видео-превью на карточках: файл подгружается и играет, только пока карточка в экране.
const videos = document.querySelectorAll<HTMLVideoElement>('video[data-lazy-video]');
if (videos.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          if (!video.src) video.src = video.dataset.src ?? '';
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }),
    { rootMargin: '100px' },
  );
  videos.forEach((video) => observer.observe(video));
}
