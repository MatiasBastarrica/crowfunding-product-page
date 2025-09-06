const selectedModal = document.querySelector(".selection-modal");
const backProjectBtn = document.querySelector(".back-project-btn");
const modalRewards = document.querySelectorAll(".modal-reward");

backProjectBtn.addEventListener("click", () => {
  selectedModal.showModal();
});

// modalRewards.forEach((modalReward) => {
//   const pledgeDropdown = modalReward.querySelector(".pledge-dropdown");
//   const radioInput = modalReward.querySelector("input");
//   radioInput.addEventListener("input", () => {
//     if (radioInput.checked) {
//       modalReward.style.borderColor = "var(--green-400)";
//       if (pledgeDropdown) {
//         pledgeDropdown.classList.remove("hide");
//       }
//     }
//   });
// });

const noRewardPledge = document.querySelector(".no-reward-pledge");
const bambooStandPledge = document.querySelector(".bamboo-stand-pledge");
const blackEdStandPledge = document.querySelector(".black-ed-stand-pledge");
const mahoganySpecialEdPledge = document.querySelector(
  ".mahogany-special-ed-pledge"
);

const modalObj = {
  noReward: {
    element: noRewardPledge,
    selected: false,
  },
  bambooStand: {
    element: bambooStandPledge,
    selected: false,
  },
  blackEdStand: {
    element: blackEdStandPledge,
    selected: false,
  },
  mahoganySpecialEd: {
    element: mahoganySpecialEdPledge,
    selected: false,
  },
};

function resetPreviouslySelectedReward() {
  for (const key in modalObj) {
    if (Object.prototype.hasOwnProperty.call(modalObj, key)) {
      const modalReward = modalObj[key];
      const pledgeDropdown =
        modalReward.element.querySelector(".pledge-dropdown");
      if (modalReward.selected) {
        modalReward.element.style.borderColor = "#dbdbdb";
      }
      if (pledgeDropdown && !pledgeDropdown.classList.contains("hide")) {
        pledgeDropdown.classList.add("hide");
      }
    }
  }
}

for (const key in modalObj) {
  if (Object.prototype.hasOwnProperty.call(modalObj, key)) {
    const modalReward = modalObj[key];
    const radioInput = modalReward.element.querySelector("input");
    const pledgeDropdown =
      modalReward.element.querySelector(".pledge-dropdown");
    radioInput.addEventListener("input", () => {
      resetPreviouslySelectedReward();
      modalReward.element.style.borderColor = "var(--green-400)";
      if (pledgeDropdown) {
        pledgeDropdown.classList.remove("hide");
      }
      modalReward.selected = true;
    });
  }
}
