document.addEventListener("DOMContentLoaded", () => {
  const filmesContainer = document.getElementById("filmes-container");

  async function fetchFilmes() {
    try {
      const response = await fetch("http://localhost:8080/filmes");

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const filmes = await response.json();
      displayFilmes(filmes);
    } catch (error) {
      console.error("Error fetching movies:", error);
      filmesContainer.innerHTML =
        "<p>Could not load movies. Please try again later.</p>";
    }
  }

  function displayFilmes(filmes) {
    if (filmes.length === 0) {
      filmesContainer.innerHTML = "<p>No movies found in the catalog.</p>";
      return;
    }

    filmesContainer.innerHTML = "";

    filmes.forEach((filme) => {
      const filmeCard = document.createElement("div");
      filmeCard.classList.add("filme-card");

      const imagemFilme = document.createElement("img");
      imagemFilme.src = filme.imagemUrl;
      imagemFilme.alt = `Movie cover for ${filme.titulo}`;

      const tituloFilme = document.createElement("h3");
      tituloFilme.textContent = filme.titulo;

      filmeCard.appendChild(imagemFilme);
      filmeCard.appendChild(tituloFilme);

      filmesContainer.appendChild(filmeCard);
    });
  }

  fetchFilmes();
});
