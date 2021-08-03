import { Octokit } from 'octokit';
import {
    GetResponseDataTypeFromEndpointMethod,
    GetResponseTypeFromEndpointMethod,
} from '@octokit/types';
import { components } from '@octokit/openapi-types';

const octokit = new Octokit();

export type GetAuthenticatedUser = typeof octokit.rest.users.getAuthenticated;
export type GetAuthenticatedUserResponseType =
    GetResponseTypeFromEndpointMethod<GetAuthenticatedUser>;
export type GetAuthenticatedUserResponseDataType =
    GetResponseDataTypeFromEndpointMethod<GetAuthenticatedUser>;

export type GetRepository = typeof octokit.rest.repos.get;
export type GetRepositoryResponseType =
    GetResponseTypeFromEndpointMethod<GetRepository>;
export type GetRepositoryResponseDataType =
    GetResponseDataTypeFromEndpointMethod<GetRepository>;

export type CreateRepository =
    typeof octokit.rest.repos.createForAuthenticatedUser;
export type CreateRepositoryResponseType =
    GetResponseTypeFromEndpointMethod<CreateRepository>;
export type CreateRepositoryResponseDataType =
    GetResponseDataTypeFromEndpointMethod<CreateRepository>;

export type GetRateLimit = typeof octokit.rest.rateLimit.get;
export type GetRateLimitResponseType =
    GetResponseTypeFromEndpointMethod<GetRateLimit>;
export type GetRateLimitResponseDataType =
    GetResponseDataTypeFromEndpointMethod<GetRateLimit>;

export type GetContent = typeof octokit.rest.repos.getContent;
export type GetContentResponseType =
    GetResponseTypeFromEndpointMethod<GetContent>;
export type GetContentResponseDataType =
    GetResponseDataTypeFromEndpointMethod<GetContent>;
export type GetContentResponseFileDateType =
    components['schemas']['content-file'];

export type CreateOrUpdateFileContents =
    typeof octokit.rest.repos.createOrUpdateFileContents;
export type CreateOrUpdateFileContentsResponseType =
    GetResponseTypeFromEndpointMethod<CreateOrUpdateFileContents>;
export type CreateOrUpdateFileContentsResponseDataType =
    GetResponseDataTypeFromEndpointMethod<CreateOrUpdateFileContents>;
