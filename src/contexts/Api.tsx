import React, { createContext, useState } from "react"
import useApi from "../hooks/useApi"
import { Note } from "../models/note"
import { NoteForm } from "../models/noteForm"

function useApiActions() {
  const { axios, host } = useApi()
  const [notes, setNotes] = useState<Array<Note>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadNotes = async () => {
    try {
      if (!isLoading)
        setIsLoading(true)
      const response = await axios.get<Note[]>(`${host}/api/Notes`)
      setNotes(response.data)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteNote = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`${host}/api/Notes/${id}`)
      await loadNotes()
      return response.status === 200
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateNote = async (id: string, note: Note) => {
    try {
      setIsLoading(true)
      const response = await axios.put(`${host}/api/Notes/${id}`, note)
      await loadNotes()
      return response.status === 200
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createNote = async (note: NoteForm) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${host}/api/Notes/`, note)
      await loadNotes()
      return response.status === 201 || response.status === 200
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, notes, loadNotes, deleteNote, createNote, updateNote }
}

interface IApiContext {
  isLoading: boolean
  notes: Note[]
  loadNotes: () => Promise<void>
  createNote: (note: NoteForm) => Promise<boolean>
  deleteNote: (id: string) => Promise<boolean>
  updateNote: (id: string, note: Note) => Promise<boolean>
}

const ApiContext = createContext<IApiContext>(null)

export const ApiProvider: React.FC = ({ children }) => {
  const value = useApiActions()
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  )
}

export default ApiContext