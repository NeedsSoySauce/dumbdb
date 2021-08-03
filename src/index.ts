import { GitHubBuilder } from './services/githubBuilder';
import { config } from './util';
import { logger } from './util/logger';

(async () => {
    const github = await new GitHubBuilder({
        auth: config.GITHUB_PERSONAL_ACCESS_TOKEN,
    }).build();
    const repo = await github.GetOrCreateRepository(config.GITHUB_REPO_NAME);
    const data = await github.UploadOrUpdateFile({
        repo: repo.name,
        content: 'uwu2u',
        path: 'uwu2.md',
    });

    logger.info('UploadOrUpdateFile', data);

    // await github.UploadFile(repo.name);
    // logger.info(repo);
    // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
    // const octokit = new Octokit({ auth: config.GITHUB_PERSONAL_ACCESS_TOKEN });
    // // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
    // const {
    //     data: { login },
    // } = await octokit.rest.users.getAuthenticated();
    // let repo: GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.get>;
    // try {
    //     const response = await octokit.rest.repos.get({
    //         repo: 'hkklj',
    //         owner: login,
    //     });
    //     repo = response.data;
    // } catch (e) {
    //     if (e?.status === 404) {
    //         await octokit.rest.repos.createForAuthenticatedUser({
    //             name: 'test-repo-please-ignore',
    //             private: true,
    //         });
    //     }
    //     throw e;
    // }
})();
