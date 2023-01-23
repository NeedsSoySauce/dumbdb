export interface GithubParameters {
    repo: string;
}

export type UploadOrUpdateFileParameters = GithubParameters & {
    path: string;
    content: Uint8Array;
    message?: string;
};
