import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAll, update, create } from '../requests'

export const useAnecdote = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 3
  })

  const updateVote = useMutation({
    mutationFn: update,
    onSuccess: queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })
  const createAnecdote = useMutation({
    mutationFn: create, onSuccess: anecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
    }
  })

  return {
    data: result.data,
    isPending: result.isPending,
    isError: result.isError,
    updateVote,
    createAnecdote
  }
}
