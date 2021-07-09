/**
 * @jest-environment jsdom
 */

import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { theme } from 'ooni-components'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import English from '../../../../lang/en.json'

import {DashboardHeader} from '../DashboardHeader'

const renderComponent = (component, locale = 'en', messages = English) => {
  return render(
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>
  )
}

describe('Tests for DashboardHeader', () => {
  const onRunTest = jest.fn()
  test('Run button is rendered and triggers the test', async () => {
    renderComponent(<DashboardHeader onRunAll={onRunTest('all')}/>)
    const runButton = screen.getByText(English['Dashboard.Overview.Run'])
    expect(runButton).toBeInTheDocument()
    fireEvent.click(runButton)
    expect(onRunTest).toHaveBeenCalledTimes(1)
  })
})
