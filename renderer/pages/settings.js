import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import {
  Flex,
  Box,
  Heading,
  Container,
  Text,
} from 'ooni-components'

import { useConfig } from '../components/settings/useConfig'
import { BooleanOption, NumberOption, AutorunCheckbox } from '../components/settings/widgets'
import { LanguageSelector } from '../components/settings/LanguageSelector'
import { WebsiteCategoriesSelector } from '../components/settings/WebsiteCategoriesSelector'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { default as pkgJson } from '../../package.json'
import FormattedMarkdownMessage from '../components/FormattedMarkdownMessage'

const TopBar = styled.div`
  background-color: ${props => props.theme.colors.blue5};
  color: ${props => props.theme.colors.white};
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  -webkit-app-region: drag;
`

const SectionHeading = styled(Heading)`
  border-bottom: 1px solid ${props => props.theme.colors.gray6};
`

const Section = ({ title, children }) => (
  <Flex flexDirection='column' my={3}>
    <SectionHeading h={4} pb={2}>{title}</SectionHeading>
    {children}
  </Flex>
)

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

const Settings = () => {
  const [config, /*setConfig, loading, err*/] = useConfig()
  const maxRuntimeEnabled = useMemo(() => {
    return config ? config.nettests.websites_enable_max_runtime : undefined
  }, [config])

  return (
    <Layout>
      <Sidebar>
        <Box width={1}>
          <TopBar>
            <Flex alignItems='center'>
              <Box pl={3}>
                <Heading h={3}><FormattedMessage id='Settings.Title' /></Heading>
              </Box>
            </Flex>
          </TopBar>
          <Container pt={3}>
            <LanguageSelector />

            {/* Test Options */}
            <Section title={<FormattedMessage id='Settings.TestOptions.Label' />}>
              <Heading h={5}><FormattedMessage id='Test.Websites.Fullname' /></Heading>
              <WebsiteCategoriesSelector />
              <BooleanOption
                label={<FormattedMessage id='Settings.Websites.MaxRuntimeEnabled' />}
                optionKey='nettests.websites_enable_max_runtime'
              />
              <NumberOption
                label={<FormattedMessage id='Settings.Websites.MaxRuntime' />}
                optionKey='nettests.websites_max_runtime'
                min={60}
                max={999}
                disabled={!maxRuntimeEnabled}
              />
            </Section>
            {/* Autorun */}
            <Section title={<FormattedMessage id='Settings.AutomatedTesting.Label' />}>
              <AutorunCheckbox
                label={<FormattedMessage id='Settings.AutomatedTesting.RunAutomatically' />}
                optionKey='autorun.enabled'
              />
              <Text as='small'><em><FormattedMarkdownMessage id='Settings.AutomatedTesting.RunAutomatically.Footer' /></em></Text>
            </Section>
            {/* Privacy */}
            <Section title={<FormattedMessage id='Settings.Privacy.Label' />}>
              <BooleanOption
                label={<FormattedMessage id='Settings.Sharing.UploadResults' />}
                optionKey='sharing.upload_results'
              />
              <BooleanOption
                label={<FormattedMessage id='Settings.Privacy.SendCrashReports' />}
                optionKey='advanced.send_crash_reports'
              />
            </Section>
            <Text my={3}>OONI Probe Desktop v{pkgJson.version}</Text>

          </Container>
        </Box>
      </Sidebar>
    </Layout>
  )
}

export default Settings
