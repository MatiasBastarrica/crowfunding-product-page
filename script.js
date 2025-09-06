const selectedModal = document.querySelector(".selection-modal");
const backProjectBtn = document.querySelector(".back-project-btn");
const modalRewards = document.querySelectorAll(".modal-reward");

backProjectBtn.addEventListener("click", () => {
  selectedModal.showModal();
});

modalRewards.forEach((modalReward) => {
  const pledgeDropdown = modalReward.querySelector(".pledge-dropdown");
  const radioInput = modalReward.querySelector("input");
  radioInput.addEventListener("input", () => {
    if (radioInput.checked) {
      modalReward.style.borderColor = "var(--green-400)";
      if (pledgeDropdown) {
        pledgeDropdown.classList.remove("hide");
      }
    }
  });
});
