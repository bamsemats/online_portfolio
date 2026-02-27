export default async function handler(req, res) {
  const response = await fetch("https://api.github.com/bamsemats/repos", {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}