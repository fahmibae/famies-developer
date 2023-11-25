$(document).ready(function ($) {
  "use strict"; // Start of use strict

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#navbar_top');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks1 = document.querySelectorAll('#navbar_top a');

  function navbarlinksActive() {
    navbarlinks1.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  const $owlCarousel = $(".active-blog-slider").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 9000,
    animateOut: 'fadeOut',
    navText: [
      '<svg width="50" height="50" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
      '<svg width="50" height="50" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>' /* icons from https://iconmonstr.com */
    ]
  });

  $('.active-gallery').owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    autoplay: true,
    nav: true,
    navText: ["<span class='lnr lnr-arrow-up'></span>",
      "<span class='lnr lnr-arrow-down'></span>"
    ],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 6,
      }

    }
  });

});

$(function () {

  $('.custom-dropdown').on('show.bs.dropdown', function () {
    var that = $(this);
    setTimeout(function () {
      that.find('.dropdown-menu').addClass('active');
    }, 100);


  });
  $('.custom-dropdown').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').removeClass('active');
  });

});

$(function () {

  $('.custom-dropdown-user').on('show.bs.dropdown', function () {
    var that = $(this);
    setTimeout(function () {
      that.find('.dropdown-menu').addClass('active');
    }, 100);


  });
  $('.custom-dropdown-user').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').removeClass('active');
  });

});

/**
 * Porfolio 
 */
let portfolionIsotope = document.querySelector('.portfolio-isotope');

if (portfolionIsotope) {

  let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
  let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
  let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

  window.addEventListener('load', () => {
    let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
      itemSelector: '.portfolio-item',
      layoutMode: portfolioLayout,
      filter: portfolioFilter,
      sortBy: portfolioSort
    });

    let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
    menuFilters.forEach(function (el) {
      el.addEventListener('click', function () {
        document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aos_init === 'function') {
          aos_init();
        }
      }, false);
    });

  });

}
// FAQ  

let benefitIsotope = document.querySelector('.benefit-isotope');

if (benefitIsotope) {

  let benefitFilter = benefitIsotope.getAttribute('data-benefit-filter') ? benefitIsotope.getAttribute('data-benefit-filter') : '.web';
  let benefitLayout = benefitIsotope.getAttribute('data-benefit-layout') ? benefitIsotope.getAttribute('data-benefit-layout') : 'masonry';
  let benefitSort = benefitIsotope.getAttribute('data-benefit-sort') ? benefitIsotope.getAttribute('data-benefit-sort') : 'original-order';

  window.addEventListener('load', () => {
    let portfolioIsotope = new Isotope(document.querySelector('.benefit-container'), {
      itemSelector: '.benefit-item',
      layoutMode: portfolioLayout,
      filter: portfolioFilter,
      sortBy: portfolioSort
    });

    let menuFilters = document.querySelectorAll('.benefit-isotope .benefit-flters li');
    menuFilters.forEach(function (el) {
      el.addEventListener('click', function () {
        document.querySelector('.benefit-isotope .benefit-flters .benefit-active').classList.remove('benefit-active');
        this.classList.add('benefit-active');
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aos_init === 'function') {
          aos_init();
        }
      }, false);
    });

  });

}

/** 
 * Filter Portofolio 
 */
$(document).ready(function () {
  $('.filter').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var filter = $(this).attr('data-filter');
    if (filter == 'all') {
      $('.portfolio-item ').show(400);
    } else {
      $('.portfolio-item ').not('.' + filter).hide(400);
      $('.portfolio-item ').filter('.' + filter).show(400);
    }
  })
});


/** 
 * lightBox Portofolio 
 */
const glightbox = GLightbox({
  selector: '.glightbox'
});

/** 
 * Sticky Header 
 */
$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $('nav').addClass('scroll');
  } else {
    $('nav').removeClass('scroll');
  }
});

/**
 * Validation form bootstrap 5.3
 */
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

/**
 * AOS System animation
 */
AOS.init({
  duration: 1000,
})

/**
 * Pure Counter
 */
new PureCounter();

// Scroll to top button appear
$(document).on('scroll', function () {
  var scrollDistance = $(this).scrollTop();
  if (scrollDistance > 100) {
    $('.scroll-to-top').fadeIn();
  } else {
    $('.scroll-to-top').fadeOut();
  }
});

$(window).on('scroll', function(){
  function isScrollIntoView(elem, index) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(window).height()*.5;
    if(elemBottom <= docViewBottom && elemTop >= docViewTop) {
      $(elem).addClass('active');
    }
    if(!(elemBottom <= docViewBottom)) {
      $(elem).removeClass('active');
    }
    var MainTimelineContainer = $('#vertical-scrollable-timeline')[0];
    var MainTimelineContainerBottom = MainTimelineContainer.getBoundingClientRect().bottom - $(window).height()*.5;
    $(MainTimelineContainer).find('.inner').css('height',MainTimelineContainerBottom+'px');
  }
  var timeline = $('#vertical-scrollable-timeline li');
  Array.from(timeline).forEach(isScrollIntoView);
});
