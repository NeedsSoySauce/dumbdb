import { Octokit } from 'octokit';
import { UploadOrUpdateFileParameters } from '../types/github';
import {
    CreateOrUpdateFileContentsResponseDataType,
    CreateRepositoryResponseDataType,
    GetAuthenticatedUserResponseDataType,
    GetContentResponseFileDateType,
    GetRateLimitResponseDataType,
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
                auto_init: true,
                private: true,
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

    public async GetFile(
        repo: string,
        path: string,
    ): Promise<GetContentResponseFileDateType> {
        const response = await this.octokit.rest.repos.getContent({
            owner: this.user.login,
            repo,
            path,
        });

        if ('content' in response.data) {
            return response.data;
        }

        throw new Error('Invalid file path');
    }

    public async UploadOrUpdateFile(
        params: UploadOrUpdateFileParameters,
    ): Promise<CreateOrUpdateFileContentsResponseDataType> {
        let sha = '';
        try {
            const file = await this.GetFile(params.repo, params.path);
            sha = file.sha;
        } catch (e) {
            if (e?.status !== 404) {
                throw e;
            }
        }

        const response =
            await this.octokit.rest.repos.createOrUpdateFileContents({
                owner: this.user.login,
                repo: params.repo,
                message:
                    params.message ||
                    `Autogenerated commit @ ${new Date().toISOString()}`,
                content: params.content.toString('base64'),
                path: params.path,
                sha,
            });

        return response.data;
    }
}
