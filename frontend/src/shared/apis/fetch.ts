"use server";

import { getSession } from "@/features/auth/actions/auth";
import { BASE_GO_API_URL } from "@/shared/constants/api";

const BASE_URL = BASE_GO_API_URL;

type GetFetchArgs = {
  path: string;
  tagName: string;
  cacheType?: RequestCache;
  token?: string;
};

export const getFetch = async ({ path, tagName, cacheType }: GetFetchArgs) => {
  const session = await getSession();
  return fetch(`${BASE_URL}/${path}`, {
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    }),
    next: { tags: [tagName] },
    cache: cacheType,
  });
};

type PostFetchArgs = {
  path: string;
  body: Record<string, unknown>;
};

export const postFetch = async ({ path, body }: PostFetchArgs) => {
  const session = await getSession();
  return fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    }),
    body: JSON.stringify(body),
  });
};

type PutFetchArgs = {
  path: string;
  body: Record<string, unknown>;
};

export const putFetch = async ({ path, body }: PutFetchArgs) => {
  const session = await getSession();
  return fetch(`${BASE_URL}/${path}`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    }),
    body: JSON.stringify(body),
  });
};

type DeleteFetchArgs = {
  path: string;
};

export const deleteFetch = async ({ path }: DeleteFetchArgs) => {
  const session = await getSession();
  return fetch(`${BASE_URL}/${path}`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    }),
  });
};
