import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Text } from 'ooni-components'
import styled from 'styled-components'

const Card = styled(Box)`
  border-radius: 8px;
  box-shadow: 0px 0px 6px 0px ${props => props.theme.colors.gray7};
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 6px 1px ${props => props.theme.colors.gray7};
  }

  &:active {
    box-shadow: 0px 0px 6px 2px ${props => props.theme.colors.gray7};
  }
`

// Override the margin-{top,bottom} added by default in FormattedMarkdownMessage
const CardDescription = styled(Box)`
  & p {
    margin: 0;
  }
`

const RunTestCard = ({ name, color, icon, description, onClick }) => {
  return (
    <Card mb={4} p={2} onClick={onClick} data-test-id='card' data-testid='card'>
      <Flex alignItems='center'>
        <Box>
          {React.cloneElement(
            icon,
            {size: 80, color: color}
          )}
        </Box>
        <Box ml={3} py={2}>
          <Flex flexDirection='column'>
            <Box>
              <Text fontSize={2} fontWeight='bolder'>
                {name}
              </Text>
            </Box>
            <CardDescription fontSize={1} mt={2}>{description}</CardDescription>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

RunTestCard.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.element,
  color: PropTypes.string,
  icon: PropTypes.element,
  description: PropTypes.element
}

export default RunTestCard
