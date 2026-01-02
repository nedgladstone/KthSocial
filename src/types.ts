// Type definitions for Person data from PostgREST
export interface Person {
  [key: string]: string | number | boolean | null | undefined | object
}

export interface PersonListProps {
  apiBaseUrl: string
}

// Type definitions for Post data from PostgREST
export interface Post {
  postid: number
  date: string | null
  userid: number | null
  title: string | null
  place: string | null
  text: string | null
  url: string | null
}

// Type definitions for User data from PostgREST
export interface User {
  userid: number
  name: string | null
}

export interface PostFeedProps {
  apiBaseUrl: string
}

export type ViewType = 'list-persons' | 'post-feed'



