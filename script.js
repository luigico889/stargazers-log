const repositoryList = document.querySelector("#repository-list");

function formatStars(stars) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(stars);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository";
    item.innerHTML = `
      <a class="repository-link" href="${repository.url}" target="_blank" rel="noreferrer">
        ${repository.name}
      </a>
      <p class="description">${repository.description}</p>
      <p class="repository-meta">
        <span>${repository.language}</span>
        <span>${formatStars(repository.stars)} stars</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </p>
    `;
    repositoryList.append(item);
  });
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    console.error("Unable to load starred repositories.", error);
    repositoryList.innerHTML = "<li class=\"status\">Unable to load starred repositories.</li>";
  }
}

loadRepositories();