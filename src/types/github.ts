export interface GithubParameters {
    repo: string;
}

export type UploadOrUpdateFileParameters = GithubParameters & {
    path: string;
    content: string;
    message?: string;
};
