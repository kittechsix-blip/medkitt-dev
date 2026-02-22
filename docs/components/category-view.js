import { getAllCategories } from "../data/categories.js";
import { router } from "../services/router.js";
export function renderCategoryView(container, categoryId) {
  container.innerHTML = "";
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === categoryId);
  if (!category) {
    renderNotFound(container, categoryId);
    return;
  }
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text";
  backBtn.textContent = "← Categories";
  backBtn.setAttribute("aria-label", "Back to categories");
  backBtn.addEventListener("click", () => router.navigate("/"));
  container.appendChild(backBtn);
  const header = document.createElement("div");
  header.className = "category-view-header";
  const icon = document.createElement("span");
  icon.className = "category-view-icon";
  icon.setAttribute("aria-hidden", "true");
  if (category.icon.endsWith(".png")) {
    const img = document.createElement("img");
    img.src = `assets/icons/${category.icon}`;
    img.alt = "";
    img.width = 48;
    img.height = 48;
    icon.appendChild(img);
  } else {
    icon.textContent = category.icon;
  }
  const name = document.createElement("h2");
  name.className = "category-view-name";
  name.textContent = category.name;
  header.appendChild(icon);
  header.appendChild(name);
  container.appendChild(header);
  if (category.decisionTrees.length === 0) {
    renderEmptyState(container);
  } else {
    renderTreeList(container, category.decisionTrees);
  }
}
function renderTreeList(container, trees) {
  const list = document.createElement("div");
  list.className = "tree-list";
  for (const tree of trees) {
    const card = document.createElement("button");
    card.className = "tree-card";
    card.setAttribute("aria-label", `${tree.title} — ${tree.subtitle}`);
    card.addEventListener("click", () => {
      router.navigate(`/tree/${tree.id}`);
    });
    const title = document.createElement("div");
    title.className = "tree-card-title";
    title.textContent = tree.title;
    const subtitle = document.createElement("div");
    subtitle.className = "tree-card-subtitle";
    subtitle.textContent = tree.subtitle;
    card.appendChild(title);
    card.appendChild(subtitle);
    if (tree.nodeCount > 0) {
      const count = document.createElement("div");
      count.className = "tree-card-count";
      count.textContent = `${tree.nodeCount} nodes`;
      card.appendChild(count);
    }
    list.appendChild(card);
  }
  container.appendChild(list);
}
function renderEmptyState(container) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  const icon = document.createElement("div");
  icon.className = "empty-state-icon";
  icon.textContent = "\uD83D\uDEA7";
  const title = document.createElement("h3");
  title.textContent = "Coming Soon";
  const body = document.createElement("p");
  body.textContent = "No decision trees available in this category yet.";
  empty.appendChild(icon);
  empty.appendChild(title);
  empty.appendChild(body);
  container.appendChild(empty);
}
function renderNotFound(container, categoryId) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  const icon = document.createElement("div");
  icon.className = "empty-state-icon";
  icon.textContent = "❓";
  const title = document.createElement("h3");
  title.textContent = "Category Not Found";
  const body = document.createElement("p");
  body.textContent = `No category with ID "${categoryId}".`;
  const homeBtn = document.createElement("button");
  homeBtn.className = "btn-primary";
  homeBtn.textContent = "Go Home";
  homeBtn.style.marginTop = "16px";
  homeBtn.addEventListener("click", () => router.navigate("/"));
  empty.appendChild(icon);
  empty.appendChild(title);
  empty.appendChild(body);
  empty.appendChild(homeBtn);
  container.appendChild(empty);
}
