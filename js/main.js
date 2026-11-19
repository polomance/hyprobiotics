/* 김동건 소개 페이지 — 최소한의 인터랙션
   1) 헤더 스크롤 그림자  2) 섹션 진입 페이드 (모션 최소화 설정 시 비활성) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 헤더 스크롤 상태 ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. 섹션 페이드 인 ---------- */
  var targets = document.querySelectorAll('.section, .hero');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    return; // 기본 상태(보임) 유지
  }

  for (var i = 0; i < targets.length; i++) {
    targets[i].classList.add('reveal');
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  for (var j = 0; j < targets.length; j++) {
    observer.observe(targets[j]);
  }
})();
