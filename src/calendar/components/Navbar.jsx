import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { ToggleColorMode } from "../../ui/components"
import { useAuthStore } from "../../hooks"

const LogoutButton = ({ handleLogout }) => {
  return (
    <HStack spacing={8} alignItems="center">
      <Button colorScheme="red" variant="outline" size="sm" onClick={ handleLogout }>
        Logout
      </Button>
    </HStack>
  )
}

export const Navbar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { startLogout, user } = useAuthStore();

  return (
    <Box
      bg={ useColorModeValue('gray.100', 'gray.900') }
      px={4}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={ isOpen ? <CloseIcon /> : <HamburgerIcon /> }
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={ isOpen ? onClose : onOpen }
        />
        <Flex alignItems="center">
          <HStack>
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            />
            <Text>
              { user.name }
            </Text>
          </HStack>
        </Flex>
        <HStack hideBelow="md">
          <ToggleColorMode />
          <LogoutButton handleLogout={ startLogout } />
        </HStack>
      </Flex>

      { isOpen ? (
        <Flex flexDirection="column" alignItems="start" justifyItems="start">
          <VStack mb={5}>
            <ToggleColorMode />
            <LogoutButton handleLogout={ startLogout } />
          </VStack>
        </Flex>
      ) : null }
    </Box>
  )
}
