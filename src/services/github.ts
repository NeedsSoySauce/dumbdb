import { Octokit } from 'octokit';
import {
    GetRateLimitResponseDataType,
    CreateRepositoryResponseDataType,
    GetAuthenticatedUserResponseDataType,
    GetRepositoryResponseDataType,
} from '../types/octokit';

export interface GitHubOptions {
    octokit: Octokit;
    user: GetAuthenticatedUserResponseDataType;
}

export class GitHub {
    private octokit: Octokit;
    private user: GetAuthenticatedUserResponseDataType;

    public constructor(options: GitHubOptions) {
        this.octokit = options.octokit;
        this.user = options.user;
    }

    public async Initialize(): Promise<GitHub> {
        const response = await this.octokit.rest.users.getAuthenticated();
        this.user = response.data;
        return this;
    }

    public async GetRepository(
        repo: string,
    ): Promise<GetRepositoryResponseDataType> {
        const response = await this.octokit.rest.repos.get({
            repo,
            owner: this.user.login,
        });
        return response.data;
    }

    public async CreateRepository(
        name: string,
    ): Promise<CreateRepositoryResponseDataType> {
        const response =
            await this.octokit.rest.repos.createForAuthenticatedUser({
                name,
                owner: this.user.login,
            });
        return response.data;
    }

    public async GetOrCreateRepository(
        name: string,
    ): Promise<GetRepositoryResponseDataType> {
        try {
            return await this.GetRepository(name);
        } catch (e) {
            await this.CreateRepository(name);
            return await this.GetRepository(name);
        }
    }

    public async GetRateLimit(): Promise<GetRateLimitResponseDataType> {
        const response = await this.octokit.rest.rateLimit.get();
        return response.data;
    }
}
