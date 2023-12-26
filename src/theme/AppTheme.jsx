import PropTypes from 'prop-types'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

export const AppTheme = ({ children }) => {
  return (
    <ChakraProvider theme={ theme }>
      { children }
    </ChakraProvider>
  )
}

AppTheme.propTypes = {
  children: PropTypes.node.isRequired
}
