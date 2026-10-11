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

        if (document.getElementById('aboutCertificationSlider')) {
            new Swiper('#aboutCertificationSlider', {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30,
                speed: 600,
                grabCursor: true,
                pagination: {
                    el: '.about-certification-pagination',
                    clickable: true
                },
                breakpoints: {
                    0: { slidesPerView: 1, slidesPerGroup: 1 },
                    576: { slidesPerView: 2, slidesPerGroup: 2 },
                    992: { slidesPerView: 3, slidesPerGroup: 3 },
                    1200: { slidesPerView: 4, slidesPerGroup: 4 }
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

        /* Ten logos moved two at a time give the five dots of the design. */
        if (document.getElementById('partnersSlider')) {
            new Swiper('#partnersSlider', {
                slidesPerView: 6,
                slidesPerGroup: 2,
                spaceBetween: 20,
                speed: 600,
                loop: true,
                autoplay: prefersReducedMotion ? false : {
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                navigation: {
                    prevEl: '.partners-arrow-prev',
                    nextEl: '.partners-arrow-next'
                },
                pagination: {
                    el: '.partners-pagination',
                    clickable: true
                },
                breakpoints: {
                    0: { slidesPerView: 2, slidesPerGroup: 2 },
                    576: { slidesPerView: 3, slidesPerGroup: 2 },
                    992: { slidesPerView: 4, slidesPerGroup: 2 },
                    1200: { slidesPerView: 6, slidesPerGroup: 2 }
                }
            });
        }

        if (document.getElementById('reviewsSlider')) {
            new Swiper('#reviewsSlider', {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 600,
                autoHeight: true,
                navigation: {
                    prevEl: '.reviews-arrow-prev',
                    nextEl: '.reviews-arrow-next'
                },
                pagination: {
                    el: '.reviews-pagination',
                    clickable: true
                }
            });
        }
    }

    /* A tab row with data-caption-target rewrites the caption of the figure it
       points at; initFilters already moves the active state between tabs. */
    function initCaptionTabs() {
        document.querySelectorAll('[data-caption-target]').forEach(function (list) {
            var figure = document.getElementById(list.getAttribute('data-caption-target'));

            if (!figure) {
                return;
            }

            var title = figure.querySelector('.caption-figure-title');
            var text = figure.querySelector('.caption-figure-text');

            list.addEventListener('click', function (event) {
                var button = event.target.closest('[data-caption-title]');

                if (!button || !list.contains(button)) {
                    return;
                }

                if (title) {
                    title.textContent = button.getAttribute('data-caption-title');
                }

                if (text) {
                    text.textContent = button.getAttribute('data-caption-text') || '';
                }
            });
        });
    }

    /* <details name> already keeps one answer open in current browsers; this
       covers the ones that ignore the attribute. */
    function initFaq() {
        var items = document.querySelectorAll('.faq-item');

        items.forEach(function (item) {
            item.addEventListener('toggle', function () {
                if (!item.open) {
                    return;
                }

                items.forEach(function (other) {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            });
        });
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
        document.querySelectorAll('.process-layout').forEach(setupProcessSteps);
    }

    function setupProcessSteps(layout) {
        var list = layout.querySelector('.process-list');
        var figure = layout.querySelector('.process-figure');

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

            var figureTitle = figure.querySelector('.process-figure-title');
            var figureNumber = figure.querySelector('.process-figure-number');
            var stepTitle = step.querySelector('.process-step-title');
            var stepNumber = step.querySelector('.process-step-number');

            if (figureTitle && stepTitle) {
                figureTitle.textContent = stepTitle.textContent.trim();
            }

            if (figureNumber && stepNumber) {
                figureNumber.textContent = stepNumber.textContent.trim();
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
        document.querySelectorAll('.process-layout').forEach(setupProcessScrollbar);
    }

    function setupProcessScrollbar(layout) {
        var list = layout.querySelector('.process-list');
        var bar = layout.querySelector('.process-scrollbar');

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

    /* The cards sit on a ring: each step rotates which pair is in the middle,
       and a card's distance and side from that pair drive its CSS position. A
       card that wraps from one edge to the other jumps without a transition so
       it does not slide across the others. */
    function initConcernsSlider() {
        var slider = document.getElementById('concernsSlider');

        if (!slider) {
            return;
        }

        var cards = Array.prototype.slice.call(slider.querySelectorAll('.concern-card'));
        var dots = Array.prototype.slice.call(slider.querySelectorAll('.concerns-dots .dot'));
        var count = cards.length;
        var current = 0;

        function place(step) {
            var centre = (2 + step) % count;

            cards.forEach(function (card, index) {
                var offset = ((index - centre + 2) % count + count) % count - 2.5;
                var side = offset < 0 ? -1 : 1;
                var wraps = Number(card.getAttribute('data-side')) !== side &&
                    Math.abs(offset) > 1;

                if (wraps) {
                    card.style.transition = 'none';
                }

                card.setAttribute('data-distance', String(Math.floor(Math.abs(offset))));
                card.setAttribute('data-side', String(side));

                if (wraps) {
                    void card.offsetWidth;
                    card.style.transition = '';
                }
            });

            dots.forEach(function (dot, index) {
                dot.classList.toggle('is-active', index === step);
            });

            current = step;
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                place(index);
            });
        });

        var dragStartX = null;
        var dragged = false;

        function step(direction) {
            place((current + direction + dots.length) % dots.length);
        }

        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                if (dragged || Number(card.getAttribute('data-distance')) === 0) {
                    return;
                }

                step(Number(card.getAttribute('data-side')));
            });
        });

        /* Dragging steps the ring one card in the direction of the drag. Past a
           small threshold only, so a plain click on a side card still works. */
        slider.addEventListener('pointerdown', function (event) {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }

            dragStartX = event.clientX;
            dragged = false;
            slider.classList.add('is-dragging');
        });

        slider.addEventListener('pointermove', function (event) {
            if (dragStartX === null || dragged) {
                return;
            }

            var delta = event.clientX - dragStartX;

            if (Math.abs(delta) > 50) {
                dragged = true;
                step(delta < 0 ? 1 : -1);
            }
        });

        function endDrag() {
            dragStartX = null;
            slider.classList.remove('is-dragging');

            window.setTimeout(function () {
                dragged = false;
            }, 0);
        }

        slider.addEventListener('pointerup', endDrag);
        slider.addEventListener('pointercancel', endDrag);
        slider.addEventListener('pointerleave', endDrag);
        slider.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });
    }

    /* Hovering or focusing a panel opens it; a tap does the same on touch. */
    function initAssurancePanels() {
        document.querySelectorAll('.expand-grid').forEach(function (grid) {
            var panels = Array.prototype.slice.call(grid.querySelectorAll('.expand-panel'));

            function open(panel) {
                panels.forEach(function (item) {
                    item.classList.toggle('is-active', item === panel);
                });
            }

            panels.forEach(function (panel) {
                panel.addEventListener('mouseenter', function () {
                    open(panel);
                });
                panel.addEventListener('focus', function () {
                    open(panel);
                });
                panel.addEventListener('click', function () {
                    open(panel);
                });
            });
        });
    }

    /* One shared overlay shows any [data-zoom] element or certificate larger.
       Items inside the same [data-zoom-group] form a list the overlay can step
       through; Swiper already swallows the click that ends a drag. */
    function initImageZoom() {
        var items = document.querySelectorAll('.certificate-figure, [data-zoom]');

        if (!items.length) {
            return;
        }

        var box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-hidden', 'true');
        box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Đóng"><i class="fa-light fa-xmark"></i></button>' +
            '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Ảnh trước"><i class="fa-light fa-chevron-left"></i></button>' +
            '<img class="lightbox-image" alt="">' +
            '<button class="lightbox-nav lightbox-next" type="button" aria-label="Ảnh sau"><i class="fa-light fa-chevron-right"></i></button>' +
            '<span class="lightbox-count"></span>';
        document.body.appendChild(box);

        var image = box.querySelector('.lightbox-image');
        var close = box.querySelector('.lightbox-close');
        var prev = box.querySelector('.lightbox-prev');
        var next = box.querySelector('.lightbox-next');
        var count = box.querySelector('.lightbox-count');
        var opener = null;
        var list = [];
        var index = 0;

        function render() {
            var source = list[index].querySelector('img');

            image.src = source.currentSrc || source.src;
            image.alt = source.alt;
            prev.hidden = next.hidden = count.hidden = list.length < 2;
            count.textContent = (index + 1) + ' / ' + list.length;
        }

        function step(direction) {
            index = (index + direction + list.length) % list.length;
            render();
        }

        function hide() {
            box.classList.remove('is-open');
            box.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');

            if (opener) {
                opener.focus();
            }
        }

        items.forEach(function (item) {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');

            function show() {
                var group = item.closest('[data-zoom-group]');

                list = group ? Array.prototype.slice.call(group.querySelectorAll('[data-zoom]')) : [item];
                index = list.indexOf(item);
                opener = item;
                render();
                box.classList.add('is-open');
                box.setAttribute('aria-hidden', 'false');
                document.body.classList.add('lightbox-open');
                close.focus();
            }

            item.addEventListener('click', show);
            item.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    show();
                }
            });
        });

        prev.addEventListener('click', function () {
            step(-1);
        });

        next.addEventListener('click', function () {
            step(1);
        });

        box.addEventListener('click', function (event) {
            if (event.target === box || event.target === close || close.contains(event.target)) {
                hide();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (!box.classList.contains('is-open')) {
                return;
            }

            if (event.key === 'Escape') {
                hide();
            } else if (event.key === 'ArrowLeft' && list.length > 1) {
                step(-1);
            } else if (event.key === 'ArrowRight' && list.length > 1) {
                step(1);
            }
        });
    }

    /* Pills with data-filter hide the post cards whose data-category differs;
       an empty value is the 'all' pill. */
    function initPostFilter() {
        var list = document.getElementById('postFilter');
        var grid = document.getElementById('postGrid');

        if (!list || !grid) {
            return;
        }

        list.addEventListener('click', function (event) {
            var button = event.target.closest('[data-filter]');

            if (!button || !list.contains(button)) {
                return;
            }

            var value = button.getAttribute('data-filter');

            grid.querySelectorAll('.post-card').forEach(function (card) {
                card.hidden = value !== '' && card.getAttribute('data-category') !== value;
            });
        });
    }

    /* Turns the stacked page images into a flip book. The images are the
       company profile PDF rendered page by page, so the book works from a plain
       file:// open without needing a PDF reader in the page. */
    function initProfileBook() {
        var book = document.getElementById('profileBook');
        var viewer = document.getElementById('profileViewer');

        if (!book || !viewer || typeof St === 'undefined') {
            return;
        }

        var sources = Array.prototype.map.call(book.querySelectorAll('.profile-page'), function (page) {
            return page.getAttribute('data-src');
        });
        var counter = document.getElementById('viewerCounter');
        var range = document.getElementById('viewerRange');
        var total = sources.length;

        book.innerHTML = '';

        var flip = new St.PageFlip(book, {
            width: 500,
            height: 707,
            size: 'stretch',
            minWidth: 200,
            maxWidth: 640,
            minHeight: 283,
            maxHeight: 905,
            showCover: false,
            drawShadow: true,
            maxShadowOpacity: 0.5,
            flippingTime: 700,
            mobileScrollSupport: true
        });

        flip.loadFromImages(sources);

        function show(index) {
            var spread = flip.getOrientation() === 'landscape';
            var first = spread ? index - (index % 2) + 1 : index + 1;

            counter.textContent = spread && first < total ? first + '-' + (first + 1) + '/' + total : first + '/' + total;
            range.value = first;
        }

        flip.on('flip', function (event) {
            show(event.data);
        });

        viewer.querySelector('.viewer-arrow-prev').addEventListener('click', function () {
            flip.flipPrev();
        });

        viewer.querySelector('.viewer-arrow-next').addEventListener('click', function () {
            flip.flipNext();
        });

        range.addEventListener('input', function () {
            flip.flip(Number(range.value) - 1);
        });

        document.getElementById('viewerFullscreen').addEventListener('click', function () {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else if (viewer.requestFullscreen) {
                viewer.requestFullscreen();
            }
        });

        show(0);
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

    function initCountdown(container) {
        var units = {};

        container.querySelectorAll('[data-countdown-unit]').forEach(function (element) {
            units[element.getAttribute('data-countdown-unit')] = element;
        });

        function getDeadline() {
            var now = new Date();

            return new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime() - 1000;
        }

        var deadline = getDeadline();
        var timerId = null;

        function render() {
            var remaining = deadline - Date.now();

            // Rolls over to the end of next month so the offer never reads 0:0:0:0.
            if (remaining <= 0) {
                deadline = getDeadline();
                remaining = deadline - Date.now();
            }

            var totalSeconds = Math.floor(remaining / 1000);
            var values = {
                days: Math.floor(totalSeconds / 86400),
                hours: Math.floor(totalSeconds / 3600) % 24,
                minutes: Math.floor(totalSeconds / 60) % 60,
                seconds: totalSeconds % 60
            };

            Object.keys(units).forEach(function (key) {
                units[key].textContent = values[key];
            });
        }

        return {
            start: function () {
                render();
                timerId = timerId || window.setInterval(render, 1000);
            },
            stop: function () {
                window.clearInterval(timerId);
                timerId = null;
            }
        };
    }

    function initPromoPopup() {
        var popup = document.getElementById('promoPopup');

        if (!popup) {
            return;
        }

        var dialog = popup.querySelector('.promo-popup-dialog');
        var form = popup.querySelector('.promo-popup-form');
        var countdownElement = popup.querySelector('[data-countdown]');
        var countdown = countdownElement ? initCountdown(countdownElement) : null;
        var lastFocused = null;

        function getFocusable() {
            return Array.prototype.filter.call(
                dialog.querySelectorAll('a[href], button, input, select, textarea'),
                function (element) {
                    return !element.disabled && element.offsetParent !== null;
                }
            );
        }

        function onKeydown(event) {
            if (event.key === 'Escape') {
                close();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            var focusable = getFocusable();
            var first = focusable[0];
            var last = focusable[focusable.length - 1];

            if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        function open() {
            lastFocused = document.activeElement;
            popup.hidden = false;
            document.body.classList.add('is-popup-open');
            document.addEventListener('keydown', onKeydown);

            if (countdown) {
                countdown.start();
            }

            // Forces a reflow so the opening transition runs after display: none is lifted.
            void popup.offsetWidth;
            popup.classList.add('is-open');
            dialog.focus({ preventScroll: true });
        }

        function close() {
            popup.classList.remove('is-open');
            document.body.classList.remove('is-popup-open');
            document.removeEventListener('keydown', onKeydown);

            if (countdown) {
                countdown.stop();
            }

            window.setTimeout(function () {
                popup.hidden = true;
            }, prefersReducedMotion ? 0 : 300);

            if (lastFocused && typeof lastFocused.focus === 'function') {
                lastFocused.focus({ preventScroll: true });
            }
        }

        popup.querySelectorAll('[data-popup-close]').forEach(function (element) {
            element.addEventListener('click', close);
        });

        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                close();
            });
        }

        open();
    }

    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initSliders();
        initScrollState();
        initCounters();
        initFilters();
        initCaptionTabs();
        initFaq();
        initProcessSteps();
        initProcessScrollbar();
        initStandardsDots();
        initConcernsSlider();
        initImageZoom();
        initPostFilter();
        initProfileBook();
        initAssurancePanels();
        initMobileNav();
        initHeaderSearch();
        initImageFadeIn();
        initForms();
        initPromoPopup();
    });
})();
