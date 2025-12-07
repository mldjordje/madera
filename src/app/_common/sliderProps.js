import SwiperCore, {
  A11y,
  Autoplay,
  EffectCreative,
  EffectFade,
  Grid,
  HashNavigation,
  History,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  Virtual,
  Parallax,
  FreeMode,
} from "swiper";

SwiperCore.use([
  Mousewheel,
  Pagination,
  Navigation,
  EffectFade,
  Autoplay,
  Grid,
  EffectCreative,
  Virtual,
  HashNavigation,
  History,
  Thumbs,
  Scrollbar,
  Keyboard,
  A11y,
  Parallax,
  FreeMode,
]);

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SliderProps = {
  shortMenuSlider4: {
    slidesPerView: 4,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: '.sb-short-menu-prev',
      nextEl: '.sb-short-menu-next',
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  },
  shortMenuSliderTwo4: {
    slidesPerView: 4,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: '.sb-short-menu-prev-2',
      nextEl: '.sb-short-menu-next-2',
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  },
  shortMenuSlider3: {
    slidesPerView: 3,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: '.sb-short-menu-prev',
      nextEl: '.sb-short-menu-next',
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  },
  shortMenuSliderTwo3: {
    slidesPerView: 3,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: '.sb-short-menu-prev-2',
      nextEl: '.sb-short-menu-next-2',
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  },
  reviewsSlider: {
    slidesPerView: 2,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: '.sb-reviews-prev',
      nextEl: '.sb-reviews-next',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  },
  blogSlider2: {
    slidesPerView: 2,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: '.sb-blog-prev',
      nextEl: '.sb-blog-next',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  },
  blogSlider3: {
    slidesPerView: 3,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: '.sb-blog-prev',
      nextEl: '.sb-blog-next',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  }
};
