import { getPosts } from './posts.query';

export const HOME_POST_COUNT = 10;

export const getHomePosts = () => getPosts(HOME_POST_COUNT);
export const getArchivePosts = () => getPosts();
export const getRssPosts = () => getPosts();
export const getSitemapPosts = () => getPosts();
export const getSearchPosts = () => getPosts();
