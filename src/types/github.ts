export interface GithubParameters {
    repo: string;
}

export type UploadOrUpdateFileParameters = GithubParameters & {
    path: string;
    content: Buffer;
    message?: string;
};
