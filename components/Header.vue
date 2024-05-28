<template>
  <div>
    <div
      class="full-menu display-none-on-print w-[100%] min-h-[100vh] max-h-[100vh] overflow-y-auto fixed z-[998] transform translate-y-[-100%] transition"
      :class="isMenuOpen ? 'translate-y-[0]' : 'translate-y-[-100%]'"
    >
      <div class="container flex flex-col justify-center h-[100vh]">
        <div>
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="relative flex gap-[169px] full-menu-links-wrapper"
          >
            <div
              class="flex items-center gap-16 mb-[36px] transition full-menu-links-wrapper-title"
            >
              <icons name="main_menu_stars" />
              <h2
                v-if="item.child"
                class="font-bold transition lg:text-[32px] text-[20px] leading-[38px] uppercase text-[#5C6670] w-[230px]"
              >
                {{ item.title }}
              </h2>
              <h2 v-else @click="isMenuOpen = false">
                <a :href="item.link"
                  :to="item.link"
                  class="font-bold transition lg:text-[32px] text-[20px] leading-[38px] uppercase text-[#5C6670] w-[230px]"
                >
                  {{ item.title }}
                </a>
              </h2>
            </div>
            <ul class="transition absolute lg:left-[50%] left-[70%]">
              <li
                v-for="(items, indexes) in item.child"
                :key="indexes"
                @click="isMenuOpen = false"
              >
                <a
                  class="font-normal transition hover:opacity-60 text-[20px] leading-[24px] text-[#5C6670] mb-[16px]"
                  :href="items.link"
                >
                  {{ items.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex z-10 flex-wrap justify-between items-center">
          <a
            target="_blank"
            href="https://goo.gl/maps/wAZ5XAFwUFBYg14q8"
            class="flex items-center gap-[8px] transition hover:opacity-60"
          >
            <icons color="#244567" name="location_icon" />
            <span
              class="font-semibold text-[16px] leading-[130%] text-[#212525]"
            >
              7306-14th Ave Fl 1, Brooklyn , NY 11228
            </span>
          </a>
          <div class="flex mt-[20px] gap-[12px]">
            <a href="https://www.instagram.com/xpressautotransport/?hl=en">
              <icons name="header_insta" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100093291650310&mibextid=D4KYlr"
            >
              <icons name="header_fb" />
            </a>
            <a href="https://www.youtube.com/@jajglobal9625">
              <icons name="header_youtube" />
            </a>
          </div>
        </div>
      </div>
      <icons
        class="absolute right-0 top-[50%] transform translate-y-[-50%] h-[100%] z-[-1]"
        name="right_side_anim"
      />
    </div>
    <div class="display-none-on-print">
      <div
        class="z-[999] right-0 left-0"
        :class="[
          isScrolled || isMenuOpen ? 'bg-[#F7FAFC]' : '',
          isWidgetOpen ? 'relative' : 'fixed'
        ]"
      >
        <div class="container">
          <div
            class="header__content flex justify-between items-center border-b-[1px] border-solid border-b-[#E6ECF0] transition"
            :class="[
              $route.fullPath !== '/' ? '' : '',
              isScrolled ? 'py-12' : 'py-[33rem]'
            ]"
          >
            <div
              class="flex items-center gap-[20rem] w-full justify-between flex-row-reverse lg:flex-row lg:w-[auto]"
            >
              <div @click="isMenuOpen = !isMenuOpen">
                <icons
                  name="burger_menu"
                  class="relative cursor-pointer z-[9999] flex-shrink-0"
                  :class="isMenuOpen ? 'burger-active' : ''"
                />
              </div>
              <a class="logo-header" href="https://www.xpresstransportation.org/" >
                <icons name="logo_header" />
              </a>
            </div>
            <div
              class="items-center gap-[40px] menu-links lg:flex hidden"
              :class="isMenuOpen ? 'opacity-0' : 'opacity-1'"
            >
              <div
                v-for="(item, index) in menu"
                :key="index"
                class="dropdowns relative cursor-pointer pt-[10px] pb-[10px]"
              >
                <div class="flex items-between gap-4">
                  <div class="main-links">
                    <a v-if="item.link !== ''"
                      :href="item.link"
                      class="font-semibold text-[16px] leading-[19px] text-[#212525]"

                    >
                      {{ item.title }}
                    </a>
                  </div>
                  <icons v-if="item.link_child" name="dropdown_icon" />
                </div>
                <div
                  v-if="item.link_child"
                  class="dropdown-links absolute top-40"
                >
                  <ul>
                    <li
                      v-for="(items, indexes) in item.link_child"
                      :key="indexes"
                    >
                      <a :href="items.link">
                        {{ items.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="hidden lg:block">
            <a href="tel: '9295665040'"
                class=" call-us-btn transition pointer center gap-[8px] bg-[#244567] py-[6px] px-[12px] rounded-[6px] text-[#fff]">
              <icons name="call_us" class="call-us" />
              (929) 566-50-40
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "About Us",
          link: "https://www.xpresstransportation.org/about-us"
        },
        {
          title: "Blog",
          link: "https://www.xpresstransportation.org/blog"
        },
        {
          title: "Contacts",
          link: "https://www.xpresstransportation.org/contacts"
        }
      ],
      isMenuOpen: false,
      isWidgetOpen: false,
      isScrolled: false,
      heightDevice: ""
    };
  },
  created() {
    if (process.client) {
      this.heightDevice = window.innerHeight;
      window.addEventListener("scroll", this.handleScroll);
    }
  },

  methods: {
    handleScroll(event) {
      this.scrollTop = process.client ? window.pageYOffset : 0;
      if (this.scrollTop > 50) {
        this.isScrolled = true
      } else {
        this.isScrolled = false
      }
    },

  },
};
</script>
<style lang="scss">
.menu-links {
  transition: 0.3s all;

  &:hover {
    .main-links {
      opacity: 0.6;
    }
  }
}

.dropdowns {
  .icon {
    transition: 0.3s all;
  }

  .main-links {
    transition: 0.3s all;
  }

  &:hover {
    .main-links {
      opacity: 1;
    }

    .dropdown-links {
      opacity: 1;
      transform: translateY(0px);
      z-index: 1;
      visibility: visible;
    }

    .icon {
      transform: rotate(180deg);

      path {
        stroke: #244567;
      }
    }
  }
}

.dropdown-links {
  background: #ffffff;
  border: 1px solid #e6ecf0;
  box-shadow: 0px 4px 12px rgba(149, 168, 181, 0.08);
  border-radius: 12px;
  padding: 0 16px;
  min-width: 152px;
  opacity: 0;
  z-index: 2;
  transition: 0.3s all;
  transform: translateY(20px);
  visibility: hidden;

  ul li {
    border-bottom: 1px solid #e6ecf0;

    a {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #5c6670;
      padding-bottom: 12px;
      padding-top: 12px;
    }

    &:hover {
      a {
        color: #244567;
      }
    }
  }
}

.full-menu {
  background: rgba(247, 250, 252, 0.88);
  backdrop-filter: blur(24px);
}

.burger-active {
  svg {
    path {
      transition: all 0.35s ease-in-out;
    }

    path:nth-child(1) {
      transform: translateX(12px) rotate(45deg);
    }

    path:nth-child(2) {
      transform: translate(-11px, 15px) rotate(-45deg);
    }
  }
}

.full-menu-links-wrapper {
  &:hover {
    .full-menu-links-wrapper-title {
      h2 {
        color: #212525;
        text-decoration: underline;

        a {
          color: #212525;
          text-decoration: underline;
        }
      }

      .icon {
        path {
          fill: #244567;
        }
      }
    }

    ul {
      visibility: visible;
      opacity: 1;
    }
  }

  ul {
    visibility: hidden;
    opacity: 0;
  }
}

.breadcrumbs {
  ul li {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #244567;

    a {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #212525;
    }

    &:before {
      content: "" !important;
      width: 0;
      margin: 0;
      display: none;
    }
  }
}
</style>
