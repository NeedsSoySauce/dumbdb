import { Octokit } from 'octokit';
import { AbstractAsyncBuilder } from '../types/builder';
import { GitHub, GitHubOptions } from './github';

export interface GitHubBuilderOptions {
    auth: string;
}

export class GitHubBuilder implements AbstractAsyncBuilder<GitHub> {
    private options: GitHubBuilderOptions;

    public constructor(options: GitHubBuilderOptions) {
        this.options = options;
    }

    public async build(): Promise<GitHub> {
        const octokit = new Octokit({ auth: this.options.auth });

        const { data: user } = await octokit.rest.users.getAuthenticated();

        const githubOptions: GitHubOptions = {
            octokit,
            user,
        };

        const github = new GitHub(githubOptions);
        return github.Initialize();
    }
}
