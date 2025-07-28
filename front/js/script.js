document.addEventListener('DOMContentLoaded', () => {
    const filmesContainer = document.getElementById('filmes-container');
    async function fetchFilmes() {
        try {
            const response = await fetch('http://localhost:8080/filmes');

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const filmes = await response.json(); 
            displayFilmes(filmes); 
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            filmesContainer.innerHTML = '<p>Não foi possível carregar os filmes. Tente novamente mais tarde.</p>';
        }
    }

    function displayFilmes(filmes) {
        if (filmes.length === 0) {
            filmesContainer.innerHTML = '<p>Nenhum filme encontrado no catálogo.</p>';
            return;
        }

        filmesContainer.innerHTML = '';
        filmes.forEach(filme => {
            const filmeCard = document.createElement('div');
            filmeCard.classList.add('filme-card');
            const imagemFilme = document.createElement('img');
            imagemFilme.src = filme.imagem;
            imagemFilme.alt = `Capa do filme ${filme.nome}`;

            const tituloFilme = document.createElement('h3');
            tituloFilme.textContent = filme.nome;

            filmeCard.appendChild(imagemFilme);
            filmeCard.appendChild(tituloFilme);

            filmesContainer.appendChild(filmeCard);
        });
    }
    fetchFilmes();
});