
import { create } from 'zustand'
import noteService from './services/anecdotes'

const sortByVotes = anecdotes =>
  anecdotes.toSorted((a, b) => b.votes - a.votes)


const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    incrementVote: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updatedAnecdote = await noteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({ anecdotes: (state.anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)) }))
    },
    // addAnecdote: content => set(state => ({ anecdotes: sortByVotes([...state.anecdotes, { content, id: getId(), votes: 0 }]) }))
    addAnecdote: async content => {
      const anecdote = await noteService.create({ content, votes: 0 })
      set(state => ({ anecdotes: [...state.anecdotes, anecdote] }))
    },
    deleteAnecdote: async id => {
      await noteService.deleteAnecsdote(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id === id ? false : true) }))
    },
    setFilter: filter => set({ filter: filter }),
    initialize: async () => {
      const anecdotes = await noteService.getAll()
      set({ anecdotes })
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const filterdAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
  return sortByVotes(filterdAnecdotes)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)


const useNotificationStore = create((set) => ({
  message: null,
  setMessage: message => {
    set({ message })
    setTimeout(() => set({ message: null }), 5000)
  }
}))

export const useMessage = () => useNotificationStore(state => state.message)
export const useSetMessage = () => useNotificationStore(state => state.setMessage)

export default useAnecdoteStore