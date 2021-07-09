import React, { useMemo, useCallback } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { Flex, Box, Label, Select } from 'ooni-components'

import { getSupportedLanguages } from '../langUtils'
import { useConfig } from './useConfig'

export const LanguageSelector = () => {
  const intl = useIntl()
  const [, setLanguageConfig] = useConfig('language')

  const supportedLanguages = getSupportedLanguages()
  const languageOptions = useMemo(() => {
    return supportedLanguages
      .sort((langA) => langA == 'en' ? -1 : 0)
      .map(lang => (
        <option key={lang} value={lang}>{intl.formatDisplayName(lang)}</option>
      ))
  }, [intl.locale]) /* eslint-disable-line */

  const onChange = useCallback((event) => {
    console.log('target value: ', event.target.value)
    intl.setLocale(event.target.value)
    setLanguageConfig(event.target.value)
  }, [intl, setLanguageConfig])

  return (
    <Flex flexDirection='column'>
      <Label mb={2}> <FormattedMessage id='Settings.Language.Label' /></Label>
      <Box>
        <Select
          defaultValue={intl.locale}
          onChange={onChange}
          data-testid='language-select'
        >
          {languageOptions}
        </Select>
      </Box>
    </Flex>
  )
}
