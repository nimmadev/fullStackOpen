import { expect, test, describe, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteAnecsdote: vi.fn()
  }
}))

import noteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteStore', () => {
  test('the state is initialized with the anecdotes returned by the backend', async () => {
    const mockAnecdote = [{
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    }]
    noteService.getAll.mockResolvedValue(mockAnecdote)
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toStrictEqual(mockAnecdote)
  })
  test('the component displaying anecdotes receives the anecdotes from the store sorted by votes', async () => {
    const unsortedMockAnecdote = [{
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
    {
      "content": "If it hurts, do it more often",
      "id": "3434",
      "votes": 10
    }]
    const sortedMockAnecdote = [
      {
        "content": "If it hurts, do it more often",
        "id": "3434",
        "votes": 10
      }, {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
      }]
    noteService.getAll.mockResolvedValue(unsortedMockAnecdote)
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toStrictEqual(sortedMockAnecdote)
  })
  test('the correct React component receives a properly filtered list of anecdotes', async () => {
    const unfilterdMockAnecdote = [{
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
    {
      "content": "If it hurts, do it more often this",
      "id": "3434",
      "votes": 10
    }]
    const filterdMockAnecdote = [
      {
        "content": "If it hurts, do it more often this",
        "id": "3434",
        "votes": 10
      }]
    noteService.getAll.mockResolvedValue(unfilterdMockAnecdote)
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    useAnecdoteStore.setState({ filter: 'this' })
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toStrictEqual(filterdMockAnecdote)
  })
  test('voting increases the number of votes for an anecdote', async () => {
    const mockAnecdote = [{
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
    {
      "content": "If it hurts, do it more often this",
      "id": "3434",
      "votes": 10
    }]
    const votedMockAnecdote = [
      {
        "content": "If it hurts, do it more often this",
        "id": "3434",
        "votes": 11
      }, {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
      },]
    noteService.getAll.mockResolvedValue(mockAnecdote)
    noteService.update.mockResolvedValue({
      "content": "If it hurts, do it more often this",
      "id": "3434",
      "votes": 11
    })
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
      await result.current.incrementVote('3434')
    })
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual(votedMockAnecdote)
  })
})