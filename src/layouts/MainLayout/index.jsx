import { useEffect, useState } from 'react'

import {
  GreetingsText,
  HeaderTitle,
  IconContainer,
  ItemWrapper,
  NavigationTitle,
  ProfileName,
  ProfilePicture,
  ProfileWrapper,
} from './styles'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import {
  BasketIcon,
  HouseIcon,
  PackageIcon,
  SignOutIcon,
  UsersIcon,
  ListIcon,
} from '@phosphor-icons/react'

import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConfig'

const sidebarWidth = 360

export function MainLayout({ children, selectedPage = 'Entrada' }) {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const [greetingsMessage, setGreetingsMessage] = useState('Boa tarde')

  const navigate = useNavigate()
  const theme = useTheme()

  function handleDrawerClose() {
    setIsClosing(true)
    setMobileOpen(false)
  }

  function handleDrawerTransitionEnd() {
    setIsClosing(false)
  }

  function handleDrawerToggle() {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  function handleLogout() {
    signOut(auth)
  }

  useEffect(() => {
    const date = new Date()
    const hours = date.getHours()

    if (hours >= 5 && hours < 12) {
      setGreetingsMessage('Bom dia')
    } else if (hours >= 12 && hours < 18) {
      setGreetingsMessage('Boa tarde')
    } else {
      setGreetingsMessage('Boa noite')
    }
  }, [])

  const sidebar = (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <List disablePadding>
          <ProfileWrapper>
            <Box>
              <IconContainer style={{ padding: '35px 0' }}>
                <ProfilePicture src={auth.currentUser.photoURL} />
              </IconContainer>
            </Box>

            <Box
              sx={{
                display: { sm: openSidebar ? 'block' : 'none' },
              }}
            >
              <GreetingsText>{greetingsMessage}, </GreetingsText>
              <ProfileName>{auth.currentUser.displayName}</ProfileName>
            </Box>
          </ProfileWrapper>
        </List>

        <List disablePadding>
          <ItemWrapper
            onClick={() => navigate('/home')}
            style={
              selectedPage === 'Entrada'
                ? {
                    backgroundColor: theme.white,
                    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.25)',
                  }
                : null
            }
          >
            <Box>
              <IconContainer>
                <HouseIcon
                  size={40}
                  color={
                    selectedPage === 'Entrada' ? theme['red-500'] : theme.white
                  }
                />
              </IconContainer>
            </Box>

            <Box sx={{ display: { sm: openSidebar ? 'block' : 'none' } }}>
              <NavigationTitle
                style={
                  selectedPage === 'Entrada'
                    ? { color: theme['red-500'] }
                    : null
                }
              >
                Entrada
              </NavigationTitle>
            </Box>
          </ItemWrapper>

          <ItemWrapper
            onClick={() => navigate('/clientes')}
            style={
              selectedPage === 'Clientes'
                ? {
                    backgroundColor: theme.white,
                    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.25)',
                  }
                : null
            }
          >
            <Box>
              <IconContainer>
                <UsersIcon
                  size={40}
                  color={
                    selectedPage === 'Clientes' ? theme['red-500'] : theme.white
                  }
                />
              </IconContainer>
            </Box>

            <Box sx={{ display: { sm: openSidebar ? 'block' : 'none' } }}>
              <NavigationTitle
                style={
                  selectedPage === 'Clientes'
                    ? { color: theme['red-500'] }
                    : null
                }
              >
                Clientes
              </NavigationTitle>
            </Box>
          </ItemWrapper>

          <ItemWrapper
            onClick={() => navigate('/produtos')}
            style={
              selectedPage === 'Produtos'
                ? {
                    backgroundColor: theme.white,
                    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.25)',
                  }
                : null
            }
          >
            <Box>
              <IconContainer>
                <BasketIcon
                  size={40}
                  color={
                    selectedPage === 'Produtos' ? theme['red-500'] : theme.white
                  }
                />
              </IconContainer>
            </Box>

            <Box sx={{ display: { sm: openSidebar ? 'block' : 'none' } }}>
              <NavigationTitle
                style={
                  selectedPage === 'Produtos'
                    ? { color: theme['red-500'] }
                    : null
                }
              >
                Produtos
              </NavigationTitle>
            </Box>
          </ItemWrapper>

          <ItemWrapper
            onClick={() => navigate('/pedidos')}
            style={
              selectedPage === 'Pedidos'
                ? {
                    backgroundColor: theme.white,
                    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.25)',
                  }
                : null
            }
          >
            <Box>
              <IconContainer>
                <PackageIcon
                  size={40}
                  color={
                    selectedPage === 'Pedidos' ? theme['red-500'] : theme.white
                  }
                />
              </IconContainer>
            </Box>

            <Box sx={{ display: { sm: openSidebar ? 'block' : 'none' } }}>
              <NavigationTitle
                style={
                  selectedPage === 'Pedidos'
                    ? { color: theme['red-500'] }
                    : null
                }
              >
                Pedidos
              </NavigationTitle>
            </Box>
          </ItemWrapper>
        </List>
      </div>

      <List>
        <ItemWrapper onClick={handleLogout}>
          <Box>
            <IconContainer>
              <SignOutIcon size={40} color={theme.white} />
            </IconContainer>
          </Box>

          <Box sx={{ display: { sm: openSidebar ? 'block' : 'none' } }}>
            <NavigationTitle>Sair</NavigationTitle>
          </Box>
        </ItemWrapper>
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
      <CssBaseline />

      <AppBar
        style={{ background: theme['red-500'] }}
        position="fixed"
        sx={{
          display: { sm: 'none' },
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          ml: { sm: `${sidebarWidth}px` },
          '& .MuiDrawer-paper': {
            backgroundColor: 'red',
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <ListIcon />
          </IconButton>
          <HeaderTitle>Red Market</HeaderTitle>
        </Toolbar>
      </AppBar>
      <Box
        onMouseEnter={() => setOpenSidebar(true)}
        onMouseLeave={() => setOpenSidebar(false)}
        component="nav"
        sx={{
          width: { sm: 120 },
          flexShrink: { sm: 0 },
          '& .MuiDrawer-paper': {
            borderTopRightRadius: '12px',
            borderBottomRightRadius: '12px',
          },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sidebarWidth,
              bgcolor: theme['red-500'],
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {sidebar}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: openSidebar ? 360 : 120,
              bgcolor: theme['red-500'],
              transition: 'width 0.3s',
              overflow: 'hidden',
              boxShadow: '8px 0px 32px rgba(0, 0, 0, 0.5)',
            },
          }}
          open
        >
          {sidebar}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1.5,
          width: { sm: `calc(100% - ${120}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Toolbar sx={{ display: { sm: 'none' } }} />
        {children}
      </Box>
    </Box>
  )
}
