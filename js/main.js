(function() {
  'use strict';

  function initMobileMenu() {
    var toggle = document.querySelector('.header__mobile-toggle');
    var menu = document.querySelector('.header__mobile-menu');
    var menuLinks = document.querySelectorAll('.header__mobile-menu-item');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      var isOpen = menu.classList.contains('is-open');
      menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq__question');

    faqItems.forEach(function(button) {
      button.addEventListener('click', function() {
        var isExpanded = this.getAttribute('aria-expanded') === 'true';
        var answerId = this.getAttribute('aria-controls');
        var answer = document.getElementById(answerId);

        faqItems.forEach(function(otherButton) {
          if (otherButton !== button) {
            otherButton.setAttribute('aria-expanded', 'false');
            var otherAnswerId = otherButton.getAttribute('aria-controls');
            var otherAnswer = document.getElementById(otherAnswerId);
            if (otherAnswer) {
              otherAnswer.classList.remove('is-open');
            }
          }
        });

        this.setAttribute('aria-expanded', !isExpanded);
        if (answer) {
          answer.classList.toggle('is-open', !isExpanded);
        }
      });
    });
  }

  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = document.querySelector('.header').offsetHeight;
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector('.header');
    var lastScroll = 0;

    window.addEventListener('scroll', function() {
      var currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }

  function initAnnouncementBanner() {
    var closeBtn = document.querySelector('.hero__announcement-close');
    var announcement = document.querySelector('.hero__announcement');

    if (!closeBtn || !announcement) return;

    closeBtn.addEventListener('click', function() {
      announcement.style.display = 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFaqAccordion();
    initSmoothScroll();
    initHeaderScroll();
    initAnnouncementBanner();
  });
})();
