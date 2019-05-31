import './jest-ssr-mock'
import React from 'react'
import { render, act, cleanup } from 'react-testing-library'
import createStorage from '.'

beforeAll(cleanup)

test('SSR enviroment', () => {
  expect(typeof localStorage).toBe('undefined')
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

  it('connects Provider with context', () => {
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
    expect(result[0]).toBeUndefined()
    act(() => result[1]({ x: 2 }))
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
    expect(result[0]).toBe(initialValue)
    act(() => result[1]({ x: 4 }))
    expect(result[0]).toMatchObject({ x: 4 })
  })
})
