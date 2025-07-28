import landingPageImg from "../assets/images/ProjectsImages/LandingPagesAutoForce.png";
import placeHolderImg from "../assets/images/ProjectsImages/placeholder.png";
import kartImg from "../assets/images/ProjectsImages/kart-img.png";

const formatRepoName = (name) =>
  name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const getRepoImage = (name) => {
  const images = {
    "landing-page-autoforce": landingPageImg,
    "scheduling_system": kartImg
  };
  return images[name] || placeHolderImg;
};

export const fetchGitHubRepos = async (username = "Rochafelip", limit = 10) => {
  const excludedRepos = ["Portifolio", "Rochafelip", "simulate-pit-stop"];

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();

    if (!Array.isArray(data)) throw new Error('Resposta inesperada da API do GitHub');

    const fixedReposOrder = ["landing-page-autoforce", "warranty-manager"];

    let repos = data
      .filter(repo =>
        !excludedRepos.includes(repo.name) &&
        (!repo.fork || fixedReposOrder.includes(repo.name))
      )
      .sort((a, b) => {
        const indexA = fixedReposOrder.indexOf(a.name);
        const indexB = fixedReposOrder.indexOf(b.name);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB; // ambos estão fixos, manter ordem fixa
        } else if (indexA !== -1) {
          return -1; // A é fixo, vem antes
        } else if (indexB !== -1) {
          return 1; // B é fixo, vem antes
        } else {
          return new Date(b.updated_at) - new Date(a.updated_at); // ordenar por data
        }
      });    

    const fixedRepos = [];
    fixedReposOrder.forEach(name => {
      const index = repos.findIndex(r => r.name === name);
      if (index !== -1) {
        fixedRepos.push(repos[index]);
        repos.splice(index, 1);
      }
    });

    // Junta fixos + o restante até o limite
    repos = [...fixedRepos, ...repos].slice(0, limit);

    const reposWithLang = await Promise.all(
      repos.map(async (repo) => {
        const langRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
        const languagesData = await langRes.json();
        const languages = Object.keys(languagesData).join(', ') || "Não definidas";

        return {
          ...repo,
          displayName: formatRepoName(repo.name),
          image: getRepoImage(repo.name),
          languages
        };
      })
    );

    return reposWithLang;
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    return [];
  }
};
