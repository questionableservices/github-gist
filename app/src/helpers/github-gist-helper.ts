import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.REACT_APP_AUTH_TOKEN,
});

async function getUserGists(
  username: string,
  per_page?: number,
  page?: number
) {
  const response = await octokit.request(
    "GET /users/{username}/gists{?since,per_page,page}",
    {
      username: username,
      per_page: per_page,
      page: page,
    }
  );
  return Promise.all(
    response.data.map(async (item: any) => {
      return await getGist(item.id);
    })
  );
}

async function getUserInfo(username: string) {
  const response = await octokit.request("GET /users/{username}", {
    username: username,
  });

  return response.data;
}

async function getGistForks(gistId: string, perPage?: number, page?: number) {
  const response = await octokit.request(
    "GET /gists/{gist_id}/forks{?per_page,page}",
    {
      gist_id: gistId,
      per_page: perPage,
      page: page,
    }
  );

  return response.data;
}

async function getGist(gistId: string) {
  const response = await octokit.request("GET /gists/{gist_id}", {
    gist_id: gistId,
  });

  return response.data;
}

export { getUserGists, getUserInfo, getGistForks, getGist };
