// 🌙 DARK MODE
document.getElementById("dark-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// 📦 ELEMENTS
const searchInput = document.getElementById("search");
const recipeCards = document.querySelectorAll(".recipe-card");
const filterBtns = document.querySelectorAll(".filter-btn");

// 🔍 SEARCH FUNCTION
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".recipe-card").forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(value) ? "block" : "none";
  });
});

// 🎯 FILTER FUNCTION
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    document.querySelectorAll(".recipe-card").forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// 📖 RECIPE MODAL
const modal = document.getElementById("recipe-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".recipe-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.innerText = card.dataset.title;
    modalDesc.innerText = card.dataset.description;
  });
});

closeBtn.onclick = () => modal.style.display = "none";

// ➕ ADD RECIPE
const form = document.getElementById("recipe-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value.toLowerCase();
  const cooktime = document.getElementById("cooktime").value;
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;

  const newCard = document.createElement("article");
  newCard.classList.add("recipe-card");
  newCard.dataset.category = category;
  newCard.dataset.title = title;
  newCard.dataset.description = description;

  newCard.innerHTML = `
    <img src="${image}" alt="${title}">
    <div class="recipe-info">
      <h2>${title}</h2>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Cook Time:</strong> ${cooktime}</p>
    </div>
  `;

  document.getElementById("recipe-list").appendChild(newCard);

  // Add modal click to new card
  newCard.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.innerText = title;
    modalDesc.innerText = description;
  });

  form.reset();
});

// 🤖 AI MODAL
const aiModal = document.getElementById("ai-recipe-modal");
const openAiBtn = document.getElementById("open-ai-modal");
const closeAiBtn = document.querySelector(".close-ai-btn");

openAiBtn.onclick = () => {
  aiModal.style.display = "flex";
};

closeAiBtn.onclick = () => {
  aiModal.style.display = "none";
};

// 🧠 AI RECIPE GENERATOR (Demo version)
document.getElementById("get-recipe-btn").onclick = () => {
  const input = document.getElementById("ingredientInput").value;
  const result = document.getElementById("recipeResult");

  if (!input) {
    result.innerHTML = "⚠️ Please enter ingredients!";
    return;
  }

  // Fake AI response (for demo)
  result.innerHTML = `
    <h3>🍽️ Recipe Idea</h3>
    <p><strong>Ingredients:</strong> ${input}</p>
    <p><strong>Steps:</strong></p>
    <ol>
      <li>Prepare ingredients</li>
      <li>Cook on medium heat</li>
      <li>Add spices and mix well</li>
      <li>Serve hot and enjoy 😋</li>
    </ol>
  `;
};

// ❌ CLOSE MODAL ON OUTSIDE CLICK
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
  if (e.target === aiModal) aiModal.style.display = "none";
};