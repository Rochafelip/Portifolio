import landingPageImg from "../assets/images/ProjectsImages/LandingPagesAutoForce.png";
import placeHolderImg from "../assets/images/ProjectsImages/placeholder.png";
import kartImg from  "../assets/images/ProjectsImages/kart-img.png";

export const fetchGitHubRepos = async (username, limit = 10) => {
  const excludedRepos = ["Portifolio", "Rochafelip", "simulate-pit-stop"];

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Resposta inesperada da API do GitHub');
    }

    const repos = data
      .filter(repo => !repo.fork && !excludedRepos.includes(repo.name))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, limit);

    // Busca linguagens para cada repo paralelamente
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

const formatRepoName = (name) =>
  name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const getRepoImage = (name) => {
  const images = {
    "landing-page-autoforce": landingPageImg,
    "scheduling_system": kartImg
  };
  return images[name] || placeHolderImg;
};
