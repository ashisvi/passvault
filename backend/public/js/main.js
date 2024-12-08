document.addEventListener("DOMContentLoaded", () => {
  const subscriptionForm = document.querySelector("form");

  subscriptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = subscriptionForm.querySelector('input[type="email"]');

    if (emailInput.value) {
      // Implement newsletter subscription logic
      alert("Thank you for subscribing!");
      emailInput.value = "";
    }
  });

  // Optional: Add smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
