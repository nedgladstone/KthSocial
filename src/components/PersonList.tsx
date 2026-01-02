import React, { useState, useEffect, useCallback } from 'react'
import type { Person, PersonListProps } from '../types'

function PersonList({ apiBaseUrl }: PersonListProps): JSX.Element {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPersons = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${apiBaseUrl}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Person[] = await response.json()
      setPersons(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Error fetching persons: ${errorMessage}. Make sure the PostgREST backend is running at ${apiBaseUrl}`)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }, [apiBaseUrl])

  useEffect(() => {
    fetchPersons()
  }, [fetchPersons])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
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

  if (persons.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Persons Found</h2>
        <p>The Person table is empty.</p>
      </div>
    )
  }

  // Get all unique keys from all persons to create table headers
  const headers = new Set<string>()
  persons.forEach(person => {
    Object.keys(person).forEach(key => headers.add(key))
  })
  const headerArray = Array.from(headers)

  return (
    <div className="results">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headerArray.map(header => (
                <th key={header}>{formatHeader(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {persons.map((person, index) => (
              <tr key={index}>
                {headerArray.map(header => (
                  <td key={header}>{formatValue(person[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Format header names (convert snake_case to Title Case)
function formatHeader(header: string): string {
  return header
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Format cell values
function formatValue(value: string | number | boolean | null | undefined | object): React.ReactNode {
  if (value === null || value === undefined) {
    return <em>null</em>
  }
  if (typeof value === 'boolean') {
    return value ? '✓' : '✗'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

export default PersonList



