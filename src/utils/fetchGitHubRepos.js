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

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`
};

export const fetchGitHubRepos = async (username = "Rochafelip", limit = 10) => {
  const excludedRepos = ["Portifolio", "Rochafelip", "simulate-pit-stop"];

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers
    });
    const data = await response.json();

    if (!Array.isArray(data)) throw new Error('Resposta inesperada da API do GitHub');

    let repos = data
      .filter(repo => !repo.fork && !excludedRepos.includes(repo.name))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const featuredRepoIndex = repos.findIndex(r => r.name === "landing-page-autoforce");

    if (featuredRepoIndex !== -1) {
      const [featuredRepo] = repos.splice(featuredRepoIndex, 1);
      repos.unshift(featuredRepo);
    }

    repos = repos.slice(0, limit);

    const reposWithLang = await Promise.all(
      repos.map(async (repo) => {
        const langRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, {
          headers
        });
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
