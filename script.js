// ### VARIABLES ###
const selectedModal = document.querySelector(".selection-modal");
const backProjectBtn = document.querySelector(".back-project-btn");
const completedModal = document.querySelector(".completed-modal");
const completedModalBtn = document.querySelector(".completed-modal button");
const currentBudget = document.querySelector(".current-budget");
const totalBackers = document.querySelector(".total-backers");
const progressBar = document.querySelector(".progress-bar__bar");
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

const rewards = document.querySelectorAll(".reward");

const mobileNavIcon = document.querySelector(".nav-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMobileMenuIcon = document.querySelector(".close-icon-container");
const closeModalIcon = document.querySelector(".modal-close-icon");
const bookmarkContainer = document.querySelector(".bookmark-container");

// ### FUNCTIONS ###

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
      completedModal.showModal();
      updateMoneyRaised(dropdownInput);
      incrementTotalBackers();
      updateProgressBar();
      resetPreviouslySelectedReward();
    });
  }
}

function resetPreviouslySelectedReward() {
  for (const key in modalObj) {
    if (Object.prototype.hasOwnProperty.call(modalObj, key)) {
      const modalReward = modalObj[key];
      const pledgeDropdown =
        modalReward.element.querySelector(".pledge-dropdown");
      const radioInput = modalReward.element.querySelector("input");
      if (modalReward.selected) {
        changeBorderColor(modalReward.element, "#dbdbdb");
        radioInput.checked = false;
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

function openSelectedModal() {
  selectedModal.showModal();
}

function selectPledge(pledge) {
  const radioInput = pledge.element.querySelector("input");
  radioInput.checked = true;
  const inputEvent = new Event("input", { bubbles: true });
  radioInput.dispatchEvent(inputEvent);
}

// ### EVENT LISTENERS ###

backProjectBtn.addEventListener("click", openSelectedModal);

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

completedModalBtn.addEventListener("click", () => {
  completedModal.close();
});

mobileNavIcon.addEventListener("click", () => {
  mobileMenu.showModal();
  mobileNavIcon.classList.toggle("hide");
});

closeMobileMenuIcon.addEventListener("click", () => {
  mobileMenu.close();
  mobileNavIcon.classList.toggle("hide");
});

closeModalIcon.addEventListener("click", () => {
  selectedModal.close();
  resetPreviouslySelectedReward();
});

bookmarkContainer.addEventListener("click", () => {
  const bookmarkText = bookmarkContainer.querySelector(
    ".desktop-bookmark-text"
  );
  bookmarkContainer.classList.toggle("bookmarked");
  if (bookmarkText.textContent === "Bookmark") {
    bookmarkText.textContent = "Bookmarked";
  } else {
    bookmarkText.textContent = "Bookmark";
  }
});
