<template>
  <div
    class="footer bg-[#244567] pt-[48rem] pb-[24rem] relative overflow-hidden"
  >
    <div class="container relative z-[1]">
      <div class="grid grid-cols-12 pl-[15px] gap-[24rem]">
        <div class="col-span-12 lg:col-span-6">
          <img
            src="@/static/images/footer_logo.png"
            class="mb-[24px] cursor-pointer"
            alt=""
            @click="top()"
          />
          <a
            href="tel: (929) 566-5040"
            class="flex items-center gap-[8px] mb-[12px] transition"
          >
            <icons name="footer_tel" />
            <span class="font-semibold text-[16px] leading-[130%] text-[#fff]">
              (929) 566-5040
            </span>
          </a>
          <a
            href="mailto: info@xpresstransportation.org"
            class="flex items-center gap-[8px] mb-[12px] transition"
          >
            <icons name="footer_mail" />
            <span class="font-semibold text-[16px] leading-[130%] text-[#fff]">
              info@xpresstransportation.org
            </span>
          </a>
          <a
            target="_blank"
            href="https://goo.gl/maps/trTxuYTpygBrNBPR6"
            class="flex items-center gap-[8px] transition"
          >
            <icons name="location_icon" />
            <span class="font-semibold text-[16px] leading-[130%] text-[#fff]">
              7306-14th Ave Fl 1, Brooklyn , NY 11228
            </span>
          </a>
          <div class="flex mt-[20px] gap-[12px]">
            <a
              class="social-icon"
              href="https://www.instagram.com/xpressautotransport/?hl=en"
            >
              <icons name="footer_insta" />
            </a>
            <a
              class="social-icon"
              href="https://www.facebook.com/profile.php?id=100093291650310&mibextid=D4KYlr"
            >
              <icons name="footer_fb" />
            </a>
            <a
              class="social-icon"
              href="https://www.youtube.com/@jajglobal9625"
            >
              <icons name="footer_youtube" />
            </a>
          </div>
        </div>
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="col-span-6 lg:col-span-3"
        >
          <h6
            class="font-bold text-[18px] leading-[22px] text-[#fff] uppercase mb-[16px]"
          >
            {{ item.title }}
          </h6>
          <ul>
            <li
              v-for="(items, indexes) in item.child"
              :key="indexes"
              class="mb-[12px]"
            >
              <router-link
                class="text-[#fff] text-[14px] leading-[17px] font-semibold transition"
                :to="items.link"
              >
                {{ items.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-span-6 lg:col-span-3 ml-[-40px] lg:ml-0">
          <h6
            class="font-bold text-[18px] leading-[22px] text-[#fff] uppercase mb-[16px]"
          >
            Office Hours
          </h6>
          <ul>
            <div
              class="mb-[12px] text-[#fff] text-[14px] leading-[17px] font-semibold transition"
            >
              Monday 9.00 A.M. - 6.00 P.M.
            </div>
            <div
              class="mb-[12px] text-[#fff] text-[14px] leading-[17px] font-semibold transition"
            >
              Tuesday 9.00 A.M. - 6.00 P.M.
            </div>
            <div
              class="mb-[12px] text-[#fff] text-[14px] leading-[17px] font-semibold transition"
            >
              Wednesday 9.00 A.M. - 6.00 P.M.
            </div>
            <div
              class="mb-[12px] text-[#fff] text-[14px] leading-[17px] font-semibold transition"
            >
              Thursday 9.00 A.M. - 6.00 P.M.
            </div>
            <div
              class="mb-[12px] text-[#fff] text-[14px] leading-[17px] font-semibold transition"
            >
              Friday 9.00 A.M. - 6.00 P.M.
            </div>
            <div
              class="mb-[12px] text-[#fff] text-[14px] leading-[17px] font-semibold transition"
            >
              Saturday 9.00 A.M. - 6.00 P.M.
            </div>
            <div
              class="mb-[12px] text-[#fff] text-[14px] leading-[17px] font-semibold transition"
            >
              Sunday 9.00 A.M. - 3.00 P.M.
            </div>
          </ul>
        </div>

        <div
          class="col-span-12 flex md:justify-between justify-center flex-wrap gap-[10px] items-center pt-[20rem] border-t-[1px] border-t-[rgba(255,255,255,0.2)] border-solid"
        >
          <p class="font-normal text-[16px] leading-[130%] text-[#fff]">
            © 2024 Xpress Auto Transport Inc.
          </p>
          <p class="font-normal text-[16px] leading-[130%] text-[#fff]">
            All rights reserved
          </p>
        </div>
      </div>
    </div>
    <icons
      class="absolute right-[0] top-0 z-[1] w-[40%] h-auto z-[0] w-full lg:w-[auto] pointer-events-none"
      name="footer_decoration"
    />
  </div>
</template>

<style>
ul li::before {
  content: "\2022";
  color: #fff;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.social-icon:hover i svg path {
  fill-opacity: 1;
}

.social-icon:hover i svg g path {
  fill: #244567;
}

ul li:hover a {
  text-decoration: underline;
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "Pages",
          link: "",
          child: [
            { title: "Main Page", link: "/" },
            { title: "About Us", link: "/about-us" },
            { title: "Contact Us", link: "/contact" },
            { title: "Blog", link: "/blog" },
            { title: "Terms&Conditions", link: "/terms-and-conditions" },
            { title: "Privacy&Policy", link: "/privacy-policy" },
          ],
        },
      ],
    };
  },
};
</script>
