import React, { useState, useEffect, useCallback } from 'react'
import type { Post, PostFeedProps } from '../types'

function PostFeed({ apiBaseUrl }: PostFeedProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      // Fetch posts ordered by date (newest first) and include user information
      const response = await fetch(`${apiBaseUrl}/post?order=date.desc`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Post[] = await response.json()
      setPosts(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Error fetching posts: ${errorMessage}. Make sure the PostgREST backend is running at ${apiBaseUrl}`)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }, [apiBaseUrl])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Unknown date'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Posts Found</h2>
        <p>The feed is empty. Be the first to post!</p>
      </div>
    )
  }

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <article key={post.postid} className="post-card">
          <div className="post-header">
            <div className="post-author">
              <div className="author-avatar">
                {post.userid ? String(post.userid).charAt(0) : '?'}
              </div>
              <div className="author-info">
                <span className="author-name">User {post.userid || 'Unknown'}</span>
                <span className="post-date">{formatDate(post.date)}</span>
              </div>
            </div>
            {post.place && (
              <div className="post-location">
                📍 {post.place}
              </div>
            )}
          </div>
          
          {post.title && (
            <h2 className="post-title">{post.title}</h2>
          )}
          
          {post.text && (
            <p className="post-text">{post.text}</p>
          )}
          
          {post.url && (
            <div className="post-link">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                🔗 {post.url}
              </a>
            </div>
          )}
          
          <div className="post-footer">
            <div className="post-actions">
              <button className="action-button like-button">
                ❤️ Like
              </button>
              <button className="action-button comment-button">
                💬 Comment
              </button>
              <button className="action-button share-button">
                🔗 Share
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default PostFeed

