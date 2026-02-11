import { getPosts } from './posts.query';

export const HOME_POST_COUNT = 12;
export const RSS_POST_COUNT = 20;

export const getHomePosts = () => getPosts(HOME_POST_COUNT);
export const getArchivePosts = () => getPosts();
export const getRssPosts = () => getPosts(RSS_POST_COUNT);
export const getSitemapPosts = () => getPosts();
export const getSearchPosts = () => getPosts();
