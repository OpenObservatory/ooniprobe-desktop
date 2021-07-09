import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Text, Box } from 'ooni-components'
import { FormattedMessage } from 'react-intl'

import LastTest from '../../components/dashboard/LastTest'

const DashBoardHeaderContainer = styled.div`
  color: white;
  text-align: center;
  position: sticky;
  top: 0px;
`

const DashboardHeaderBG = styled.div`
  background-color: ${props => props.theme.colors.blue5};
  height: 80px;
  position: relative;
  overflow: hidden;
  /* This makes it possible to drag the window around from the side bar */
  -webkit-app-region: drag;
`

const Ellipse = styled.div`
  position: absolute;
  top: 40px;
  right: -70px;
  left: -70px;
  height: 160px;
  background-color: white;
  clip-path: ellipse(75% 50% at 50% 50%);
`

const RunAllContainer = styled(Box)`
  position: relative;
  top: -60px;
  margin-bottom: -30px;
`

const RunAllButton = styled(Button).attrs({
  width: 2/5,
})`
  box-shadow: 0px 0px 6px 0px ${props => props.theme.colors.gray7};
  border: 1px solid ${props => props.theme.colors.gray3};
  border-radius: 16px;

  &:hover {
    box-shadow: 0px 0px 6px 1px ${props => props.theme.colors.gray7};
  }

  &:active {
    box-shadow: 0px 0px 6px 2px ${props => props.theme.colors.gray7};
  }
`

export const DashboardHeader = ({ onRunAll }) => (
  <DashBoardHeaderContainer>
    <DashboardHeaderBG>
      <Ellipse />
    </DashboardHeaderBG>
    <RunAllContainer>
      <RunAllButton inverted onClick={onRunAll} fontSize={2} data-test-id='dashboard-run-button'>
        <Text as='span' fontWeight='bold' fontSize={3}>
          <FormattedMessage id='Dashboard.Overview.Run' />
        </Text>
      </RunAllButton>
      <LastTest testGroupName='all' pt={3} color='black' bg='WHITE'/>
    </RunAllContainer>
  </DashBoardHeaderContainer>
)

DashboardHeader.propTypes = {
  onRunAll: PropTypes.func
}

export default DashboardHeader
