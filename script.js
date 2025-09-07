const selectedModal = document.querySelector(".selection-modal");
const backProjectBtn = document.querySelector(".back-project-btn");
const completedModal = document.querySelector(".completed-modal");
const currentBudget = document.querySelector(".current-budget");
const totalBackers = document.querySelector(".total-backers");
const progressBar = document.querySelector(".progress-bar__bar");

backProjectBtn.addEventListener("click", () => {
  selectedModal.showModal();
});

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

function changeBorderColor(element, color) {
  element.style.borderColor = color;
}

function togglePledgeDropdown(element) {
  element.classList.toggle("hide");
}

function handlePledgeDropdown(pledgeDropdown) {
  if (pledgeDropdown) {
    togglePledgeDropdown(pledgeDropdown);
    const continueBtn = pledgeDropdown.querySelector("button");
    const dropdownInput = pledgeDropdown.querySelector("input");
    continueBtn.addEventListener("click", () => {
      selectedModal.close();
      updateMoneyRaised(dropdownInput);
      incrementTotalBackers();
      updateProgressBar();
    });
  }
}

function resetPreviouslySelectedReward() {
  for (const key in modalObj) {
    if (Object.prototype.hasOwnProperty.call(modalObj, key)) {
      const modalReward = modalObj[key];
      const pledgeDropdown =
        modalReward.element.querySelector(".pledge-dropdown");
      if (modalReward.selected) {
        changeBorderColor(modalReward.element, "#dbdbdb");
      }
      if (pledgeDropdown && !pledgeDropdown.classList.contains("hide")) {
        togglePledgeDropdown(pledgeDropdown);
      }
      modalReward.selected = false;
    }
  }
}

function updateProgressBar() {
  if (currentBudget.textContent.replace(",", ".") >= 100) {
    progressBar.style.width = "100%";
  } else {
    progressBar.style.width = `${currentBudget.textContent[0]}${currentBudget.textContent[1]}%`;
  }
}

function updateMoneyRaised(dropdownInput) {
  currentBudget.textContent =
    Number(currentBudget.textContent.replace(",", ".")) +
    Number(dropdownInput.value);
}

function incrementTotalBackers() {
  result = String(Number(totalBackers.textContent.replace(",", "")) + 1).split(
    ""
  );
  result.splice(1, 0, ",");
  totalBackers.textContent = result.join("");
}

for (const key in modalObj) {
  if (Object.prototype.hasOwnProperty.call(modalObj, key)) {
    const modalReward = modalObj[key];
    const radioInput = modalReward.element.querySelector("input");
    const pledgeDropdown =
      modalReward.element.querySelector(".pledge-dropdown");
    radioInput.addEventListener("input", () => {
      resetPreviouslySelectedReward();
      changeBorderColor(modalReward.element, "var(--green-400");
      handlePledgeDropdown(pledgeDropdown);
      modalReward.selected = true;
    });
  }
}

const rewards = document.querySelectorAll(".reward");

rewards.forEach((reward) => {
  const rewardType = reward.dataset.name;
  const rewardBtn = reward.querySelector("button");
  rewardBtn.addEventListener("click", () => {
    switch (rewardType) {
      case "bamboo":
        openSelectedModal();
        selectPledge(modalObj.bambooStand);
        break;
      case "black":
        openSelectedModal();
        selectPledge(modalObj.blackEdStand);
        break;
      case "mahogany":
        openSelectedModal();
        selectPledge(modalObj.mahoganySpecialEd);
        break;

      default:
        break;
    }
  });
});

function openSelectedModal() {
  selectedModal.showModal();
}

function selectPledge(pledge) {
  const radioInput = pledge.element.querySelector("input");
  radioInput.checked = true;
  const inputEvent = new Event("input", { bubbles: true });
  radioInput.dispatchEvent(inputEvent);
}
