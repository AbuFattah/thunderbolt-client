import React from "react";
import { ImTruck as TruckIcon } from "react-icons/im";
import { FaLock as LockIcon } from "react-icons/fa";
import { FaBox as BoxIcon } from "react-icons/fa";
const Perks = () => {
  return (
    <section class="perks-section inner-container py-10 bg-gray-100">
      <div class="perk-container flex-col md:flex-row ">
        <div class="perk">
          <div class="perk__icon">
            <BoxIcon />
          </div>
          <h3 class="perk__title">Free Shipping</h3>
          <p class="perk__desc">
            We provide free shipping to all of our members.
          </p>
        </div>
        <div class="perk">
          <div class="perk__icon">
            <TruckIcon />
          </div>
          <h3 class="perk__title">Fast delivery</h3>
          <p class="perk__desc">
            We make lives easier with our efficient delivery services
          </p>
        </div>
        <div class="perk">
          <div class="perk__icon">
            <LockIcon />
          </div>
          <h3 class="perk__title">Secure Payment</h3>
          <p class="perk__desc">
            Our customer's security is the top most priority.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Perks;
