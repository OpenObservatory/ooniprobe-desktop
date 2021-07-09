import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  Text,
  Flex,
  Box
} from 'ooni-components'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import OONILogo from 'ooni-components/components/svgs/logos/Probe-HorizontalMonochrome.svg'
import { MdWeb, MdHistory } from 'react-icons/md'
import { FaCog } from 'react-icons/fa'

import NoRTLFlip from './NoRTLFlip'
import { version } from '../../package.json'

const StyledNavItem = styled.div`
  position: relative;
  color: ${props => props.isActive ? props.theme.colors.blue5 : props.theme.colors.gray4};
  margin-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  text-align: center;
  /* Disable text selection */
  user-select: none;
  /* Ensure we always have a pointer */
  cursor: pointer;
  &:active {
    color: ${props => props.theme.colors.blue2};
  }
  &:hover {
    color: ${props => props.theme.colors.blue4};
  }
  -webkit-app-region: no-drag;
`

const ColoredStrip = styled.span`
  display: ${props => props.active ? 'block' : 'none'};
  height: 100%;
  width: 8px;
  background: ${props => props.theme.colors.blue5};
  position: absolute;
  left: 0px;
  bottom: 0px;
`

const NavItem = ({href, icon, label, pathName}) => {
  const isActive = pathName === href
  return (
    <StyledNavItem isActive={isActive}>
      <Link href={href}>
        <Flex alignItems='center'>
          <Box>
            {icon}
          </Box>
          <Box pl={2}>
            {label}
          </Box>
        </Flex>
      </Link>
      <ColoredStrip active={isActive} />
    </StyledNavItem>
  )
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.node,
  pathName: PropTypes.string
}

// Using getter function to get `name` because `id` is needed for testing
const navigationPaths = {
  '/dashboard': {
    id: 'Dashboard.Tab.Label',
    icon: <MdWeb size={40} />,
    get name() {
      return <FormattedMessage id={this.id} />
    }
  },
  '/test-results': {
    id: 'TestResults.Overview.Tab.Label',
    icon: <MdHistory size={40} />,
    get name() {
      return <FormattedMessage id={this.id} />
    }
  },
  '/settings': {
    id: 'Settings.Title',
    icon: <FaCog size={40} />,
    get name() {
      return <FormattedMessage id={this.id} />
    }
  }
}

const SidebarContainer = styled(Box)`
  border-right: 1px solid ${props => props.theme.colors.gray3};
  /* This makes it poss'ible to drag the window around from the side bar */
  -webkit-app-region: drag;
  height: 100vh;
`

const MainContainer = styled(Box)`
`

const StyledOONILogo = styled(OONILogo)`
  fill: ${props => props.theme.colors.gray5};
`

const Sidebar = ({ children }) => {
  const { pathname } = useRouter()
  return (
    <Flex flexDirection='row'>
      <SidebarContainer data-id='sidebar' width={1/5}>
        <Flex flexDirection='column' justifyContent='space-between' pt='50px' width={1/5} bg='gray1'
          sx={{
            position: 'fixed',
            height: '100vh'
          }}
        >
          <Box>
            {Object.keys(navigationPaths).map((path, idx) => {
              const info = navigationPaths[path]
              return (
                <NavItem
                  key={idx}
                  pathName={pathname}
                  href={path}
                  icon={info.icon}
                  label={info.name}
                />
              )
            })}
          </Box>
          <Box pr={2}>
            <Box pl={4}>
              <StyledOONILogo />
            </Box>
            <Box mb={2}>
              <NoRTLFlip>
                <Text fontSize={12} textAlign='right' color='gray7'>
                  {version}
                </Text>
              </NoRTLFlip>
            </Box>
          </Box>
        </Flex>
      </SidebarContainer>

      <MainContainer width={4/5}>
        {children}
      </MainContainer>

    </Flex>
  )
}

Sidebar.propTypes = {
  children: PropTypes.element
}
export default Sidebar

export { NavItem, navigationPaths }