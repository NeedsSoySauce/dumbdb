import { GitHubBuilder } from './services/githubBuilder';
import { LogLevel } from './types/logging';
import { config } from './util';
import { logger } from './util/logger';

(async () => {
    // const github = await new GitHubBuilder({
    //     auth: config.GITHUB_PERSONAL_ACCESS_TOKEN,
    // }).build();

    // const repo = await github.GetOrCreateRepository(config.GITHUB_REPO_NAME);

    // const rateLimit = await github.GetRateLimit();
    // console.log(rateLimit);

    // console.log(repo);
    logger.setLevel(LogLevel.debug);
    logger.debug('Hello world!', { test: 123 });
    logger.debug({ test: new Error("wat") });
    logger.info('Hello world!');
    logger.warn('Hello world!');
    logger.error('Hello world!');

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

    /*
     * await octokit.rest.git.createBlob({
     *     owner: login,
     *     repo:
     * })
     */

    /*
     * const repos = await octokit.rest.repos.createForAuthenticatedUser({
     *     name: 'test-repo-please-ignore',
     *     private: true
     * })
     */
})();
