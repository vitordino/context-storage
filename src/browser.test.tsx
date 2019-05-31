import 'jest-localstorage-mock'
import React from 'react'
import { render, act, cleanup } from 'react-testing-library'
import createStorage from '.'

beforeAll(cleanup)
beforeEach(() => localStorage.clear())

describe('test enviroment', () => {
  expect(localStorage).toBeDefined()
  expect(typeof localStorage.setItem).toBe('function')
  expect(typeof localStorage.getItem).toBe('function')
})

describe('context-storage', () => {
  it('exports a factory', () => {
    expect(createStorage).toBeInstanceOf(Function)
    const instance = createStorage('some-random-key')
    expect(instance).toHaveLength(2)
    const [Provider, useStorage] = instance
    expect(Provider).toBeInstanceOf(Function)
    expect(useStorage).toBeInstanceOf(Function)
  })

  it('connects Provider with localstorage', () => {
    const key = 'some-random-key'
    const [Provider, useStorage] = createStorage(key)
    let result: any[] = []
    const Storage = (): null => {
      result = useStorage()
      return null
    }
    render(
      <Provider>
        <Storage />
      </Provider>,
    )
    expect(result).toHaveLength(2)
    expect(localStorage.getItem(key)).toBeNull()
    expect(result[0]).toBeUndefined()
    act(() => result[1]({ x: 2 }))
    expect(localStorage.getItem(key)).toBe('{"x":2}')
    expect(result[0]).toMatchObject({ x: 2 })
  })

  it('sets initial value', () => {
    const key = 'some-random-key'
    const initialValue = { x: 3 }
    const [Provider, useStorage] = createStorage(key, initialValue)
    let result: any[] = []
    const Storage = (): null => {
      result = useStorage()
      return null
    }
    render(
      <Provider>
        <Storage />
      </Provider>,
    )
    expect(result).toHaveLength(2)
    expect(localStorage.getItem(key)).toBe('{"x":3}')
    expect(result[0]).toBe(initialValue)
    act(() => result[1]({ x: 4 }))
    expect(localStorage.getItem(key)).toBe('{"x":4}')
    expect(result[0]).toMatchObject({ x: 4 })
  })

  it('reads initial value from storage', () => {
    const key = 'some-random-key'
    localStorage.setItem(key, JSON.stringify({ x: 5 }))
    const initialValue = { x: 3 }
    const [Provider, useStorage] = createStorage(key, initialValue)
    let result: any[] = []
    const Storage = (): null => {
      result = useStorage()
      return null
    }
    render(
      <Provider>
        <Storage />
      </Provider>,
    )
    expect(result).toHaveLength(2)
    expect(localStorage.getItem(key)).toBe('{"x":5}')
    expect(result[0]).toMatchObject({ x: 5 })
  })
})
