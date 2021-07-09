/**
 * @jest-environment jsdom
 */

import React from 'react'
import { screen, render, cleanup } from '@testing-library/react'
import { theme } from 'ooni-components'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import English from '../../../lang/en.json'

import Sidebar, { NavItem, navigationPaths } from '../Sidebar'
import { version } from '../../../package.json'

// Mocking useRouter()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/dashboard',
    }
  },
}))

const renderComponent = (component, locale = 'en', messages = English) => {
  return render(
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>
  )
}

describe('Tests for Sidebar component', () => {
  afterEach(() => {
    cleanup()
  })
  test('Displays the correct version', async () => {
    renderComponent(
      <Sidebar>
        <></>
      </Sidebar>
    )
    expect(screen.getByText(version)).toBeInTheDocument()
  })
  test('Displays child elements', async () => {
    renderComponent(
      <Sidebar>
        <p>Test paragraph</p>
      </Sidebar>
    )
    expect(screen.getByText('Test paragraph')).toBeInTheDocument()
  })
  test('Navigation List component works correctly', async () => {
    Object.keys(navigationPaths).map((path, idx) => {
      const info = navigationPaths[path]
      renderComponent(
        <NavItem
          key={idx}
          pathName='/dashboard'
          href={path}
          icon={info.icon}
          label={info.name}
        />
      )
      expect(screen.getByText(English[info.id])).toBeInTheDocument()
    })
  })
})
