(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initScrollReveal() {
        if (typeof AOS === 'undefined') {
            return;
        }

        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            offset: 80,
            once: true,
            disable: prefersReducedMotion
        });
    }

    function initSliders() {
        if (typeof Swiper === 'undefined') {
            return;
        }

        if (document.getElementById('heroSlider')) {
            new Swiper('#heroSlider', {
                slidesPerView: 1,
                speed: 700,
                loop: true,
                autoplay: prefersReducedMotion ? false : {
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                navigation: {
                    prevEl: '.hero-arrow-prev',
                    nextEl: '.hero-arrow-next'
                },
                pagination: {
                    el: '.hero-pagination',
                    clickable: true
                }
            });
        }

        if (document.getElementById('certificationSlider')) {
            new Swiper('#certificationSlider', {
                slidesPerView: 3,
                spaceBetween: 24,
                speed: 600,
                pagination: {
                    el: '.certification-pagination',
                    clickable: true
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    576: { slidesPerView: 2 },
                    992: { slidesPerView: 3 }
                }
            });
        }

        if (document.getElementById('testimonialsSlider')) {
            new Swiper('#testimonialsSlider', {
                slidesPerView: 3,
                spaceBetween: 35,
                speed: 600,
                navigation: {
                    prevEl: '.testimonials-arrow-prev',
                    nextEl: '.testimonials-arrow-next'
                },
                pagination: {
                    el: '.testimonials-pagination',
                    clickable: true
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 }
                }
            });
        }
    }

    /* A 1px sentinel at the very top of the document lets the sticky header and the
       back-to-top button react to scrolling without listening to every scroll event. */
    function initScrollState() {
        var header = document.getElementById('siteHeader');
        var backToTop = document.getElementById('backToTop');

        if (!header && !backToTop) {
            return;
        }

        var sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
        document.body.insertBefore(sentinel, document.body.firstChild);

        var heroSlider = document.getElementById('heroSlider');

        new IntersectionObserver(function (entries) {
            var atTop = entries[0].isIntersecting;

            if (header) {
                header.classList.toggle('is-scrolled', !atTop);
            }

            if (backToTop && !heroSlider) {
                backToTop.classList.toggle('is-visible', !atTop);
            }
        }).observe(sentinel);

        if (backToTop && heroSlider) {
            new IntersectionObserver(function (entries) {
                backToTop.classList.toggle('is-visible', !entries[0].isIntersecting);
            }).observe(heroSlider);
        }

        if (backToTop) {
            backToTop.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        }
    }

    function initCounters() {
        var counters = document.querySelectorAll('[data-count-to]');

        if (!counters.length) {
            return;
        }

        if (prefersReducedMotion) {
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                observer.unobserve(entry.target);
                runCounter(entry.target);
            });
        }, { threshold: 0.4 });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    }

    function runCounter(element) {
        var target = parseInt(element.getAttribute('data-count-to'), 10);
        var suffix = element.getAttribute('data-count-suffix') || '';
        var pad = parseInt(element.getAttribute('data-count-pad'), 10) || 0;
        var duration = 1400;
        var start = null;

        function format(value) {
            var text = String(value);

            while (text.length < pad) {
                text = '0' + text;
            }

            return text + suffix;
        }

        function step(timestamp) {
            if (start === null) {
                start = timestamp;
            }

            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);

            element.textContent = format(Math.round(target * eased));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }

        element.textContent = format(0);
        window.requestAnimationFrame(step);
    }

    function initFilters() {
        document.querySelectorAll('.filter-list').forEach(function (list) {
            list.addEventListener('click', function (event) {
                var button = event.target.closest('.filter-button');

                if (!button || !list.contains(button)) {
                    return;
                }

                list.querySelectorAll('.filter-button').forEach(function (item) {
                    item.classList.toggle('is-active', item === button);
                });
            });
        });
    }

    /* The step list acts like a set of tabs: activating one drives the figure
       beside it. A step without its own copy or photo falls back to its
       description and leaves the current photo in place. */
    function initProcessSteps() {
        var list = document.querySelector('.process-list');
        var figure = document.querySelector('.process-figure');

        if (!list || !figure) {
            return;
        }

        var image = figure.querySelector('img');
        var text = figure.querySelector('.process-figure-text');
        var figureHome = figure.parentNode;
        var figureAnchor = figure.nextElementSibling;
        var accordion = window.matchMedia('(max-width: 767px)');

        /* On a phone the list is an accordion, so the photo belongs inside the
           open step instead of below all eight of them. */
        function placeFigure() {
            var active = list.querySelector('.process-step.is-active');

            if (accordion.matches && active) {
                if (figure.parentNode !== active) {
                    active.appendChild(figure);
                }

                return;
            }

            if (figure.parentNode !== figureHome) {
                figureHome.insertBefore(figure, figureAnchor);
            }
        }

        function activate(step) {
            list.querySelectorAll('.process-step').forEach(function (item) {
                item.classList.toggle('is-active', item === step);
                /* On mobile the list is an accordion, so the state has to be
                   exposed as well as drawn. */
                item.setAttribute('aria-expanded', String(item === step));
            });

            placeFigure();

            var src = step.getAttribute('data-figure-image');

            /* Dropping is-loaded lets the existing load handler fade the new
               photo back in, so the swap is not an abrupt cut. */
            if (src && image && !image.getAttribute('src').endsWith(src)) {
                image.classList.remove('is-loaded');
                image.src = src;
            }

            if (!text) {
                return;
            }

            var copy = step.getAttribute('data-figure-text');

            if (!copy) {
                var description = step.querySelector('.process-step-description');
                copy = description ? description.textContent.trim() : '';
            }

            text.textContent = copy;
        }

        list.querySelectorAll('.process-step').forEach(function (item) {
            item.setAttribute('aria-expanded', String(item.classList.contains('is-active')));
        });

        placeFigure();
        accordion.addEventListener('change', placeFigure);

        list.addEventListener('click', function (event) {
            var step = event.target.closest('.process-step');

            if (step && list.contains(step)) {
                activate(step);
            }
        });

        list.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            var step = event.target.closest('.process-step');

            if (step && list.contains(step)) {
                event.preventDefault();
                activate(step);
            }
        });
    }

    /* Draws the step list's scrollbar over the list instead of letting the
       native one take layout width. Also supports dragging the thumb. */
    function initProcessScrollbar() {
        var list = document.querySelector('.process-list');
        var bar = document.querySelector('.process-scrollbar');

        if (!list || !bar) {
            return;
        }

        var thumb = bar.querySelector('.process-scrollbar-thumb');
        var frame = null;

        function draw() {
            frame = null;

            var track = bar.clientHeight;
            var ratio = list.clientHeight / list.scrollHeight;

            if (ratio >= 1) {
                bar.classList.remove('is-visible');
                return;
            }

            bar.classList.add('is-visible');

            var height = Math.max(Math.round(track * ratio), 24);
            var travel = list.scrollTop / (list.scrollHeight - list.clientHeight);

            thumb.style.height = height + 'px';
            thumb.style.transform = 'translateY(' + Math.round((track - height) * travel) + 'px)';
        }

        function schedule() {
            if (frame === null) {
                frame = window.requestAnimationFrame(draw);
            }
        }

        list.addEventListener('scroll', schedule);
        window.addEventListener('resize', schedule);

        if (window.ResizeObserver) {
            new ResizeObserver(schedule).observe(list);
        }

        thumb.addEventListener('pointerdown', function (event) {
            event.preventDefault();
            thumb.setPointerCapture(event.pointerId);

            var startY = event.clientY;
            var startTop = list.scrollTop;
            var track = bar.clientHeight;
            var range = track - thumb.offsetHeight;

            function onMove(move) {
                if (range <= 0) {
                    return;
                }

                var delta = (move.clientY - startY) / range;
                list.scrollTop = startTop + delta * (list.scrollHeight - list.clientHeight);
            }

            function onUp() {
                thumb.removeEventListener('pointermove', onMove);
                thumb.removeEventListener('pointerup', onUp);
            }

            thumb.addEventListener('pointermove', onMove);
            thumb.addEventListener('pointerup', onUp);
        });

        draw();
    }

    /* The dots drive the whole panel: counter, labels and the photo beside it. */
    function initStandardsDots() {
        var section = document.querySelector('.standards-section');

        if (!section) {
            return;
        }

        var nav = section.querySelector('.dot-nav');
        var image = section.querySelector('.standards-figure img');

        if (!nav) {
            return;
        }

        var counter = section.querySelector('.standards-counter-current');
        var index = section.querySelector('.standards-index');
        var name = section.querySelector('.standards-name');
        var description = section.querySelector('.standards-description');

        function activate(dot) {
            var dots = Array.prototype.slice.call(nav.querySelectorAll('.dot'));

            dots.forEach(function (item) {
                item.classList.toggle('is-active', item === dot);
            });

            if (counter) {
                counter.textContent = ('0' + (dots.indexOf(dot) + 1)).slice(-2);
            }

            if (index && dot.getAttribute('data-standard-index')) {
                index.textContent = dot.getAttribute('data-standard-index');
            }

            if (name && dot.getAttribute('data-standard-name')) {
                name.textContent = dot.getAttribute('data-standard-name');
            }

            if (description && dot.getAttribute('data-standard-description')) {
                description.textContent = dot.getAttribute('data-standard-description');
            }

            var src = dot.getAttribute('data-standard-image');

            /* Dropping is-loaded lets the shared load handler fade the new photo in. */
            if (src && image && !image.getAttribute('src').endsWith(src)) {
                image.classList.remove('is-loaded');
                image.src = src;
                image.alt = dot.getAttribute('data-standard-alt') || '';
            }
        }

        nav.addEventListener('click', function (event) {
            var dot = event.target.closest('.dot');

            if (dot && nav.contains(dot)) {
                activate(dot);
            }
        });
    }

    function initMobileNav() {
        var toggle = document.getElementById('navToggle');
        var nav = document.getElementById('mainNav');

        if (!toggle || !nav) {
            return;
        }

        var searchPanel = document.getElementById('headerSearch');
        var searchToggle = document.getElementById('searchToggle');

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('is-open');

            toggle.classList.toggle('is-open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));

            if (isOpen && searchPanel && searchToggle) {
                searchPanel.classList.remove('is-open');
                searchToggle.classList.remove('is-open');
                searchToggle.setAttribute('aria-expanded', 'false');
            }
        });

        nav.addEventListener('click', function (event) {
            var link = event.target.closest('.has-submenu > .main-nav-link');

            if (!link || window.innerWidth > 1279) {
                return;
            }

            event.preventDefault();
            link.parentElement.classList.toggle('is-open');
        });
    }

    function initHeaderSearch() {
        var toggle = document.getElementById('searchToggle');
        var panel = document.getElementById('headerSearch');

        if (!toggle || !panel) {
            return;
        }

        var input = panel.querySelector('.search-input');
        var nav = document.getElementById('mainNav');
        var navToggle = document.getElementById('navToggle');

        function setOpen(isOpen) {
            panel.classList.toggle('is-open', isOpen);
            toggle.classList.toggle('is-open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));

            if (!isOpen) {
                return;
            }

            /* The mobile drawer sits in the same place as the panel. */
            if (nav) {
                nav.classList.remove('is-open');
            }

            if (navToggle) {
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }

            if (input) {
                input.focus();
            }
        }

        toggle.addEventListener('click', function (event) {
            event.stopPropagation();
            setOpen(!panel.classList.contains('is-open'));
        });

        panel.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        document.addEventListener('click', function () {
            setOpen(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && panel.classList.contains('is-open')) {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    function initImageFadeIn() {
        document.documentElement.classList.add('js-enabled');

        document.querySelectorAll('img').forEach(function (image) {
            /* The listeners stay attached even for images that are already
               complete, because the process and standards sliders swap src
               later and rely on this handler to fade the new photo back in. */
            image.addEventListener('load', function () {
                image.classList.add('is-loaded');
            });

            image.addEventListener('error', function () {
                image.classList.add('is-loaded');
            });

            if (image.complete) {
                image.classList.add('is-loaded');
            }
        });
    }

    function initForms() {
        document.querySelectorAll('form').forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initSliders();
        initScrollState();
        initCounters();
        initFilters();
        initProcessSteps();
        initProcessScrollbar();
        initStandardsDots();
        initMobileNav();
        initHeaderSearch();
        initImageFadeIn();
        initForms();
    });
})();
