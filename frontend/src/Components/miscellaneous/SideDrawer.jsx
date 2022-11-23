/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Center,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GlobalState } from '../../Context/GlobalProvider'
import { Effect } from 'react-notification-badge'
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge'
import { Howl } from 'howler'

import '../styles.css'

import { io } from 'socket.io-client'
import UserListItem from '../UserAvatar/UserListItem'
const ENDPOINT = 'http://localhost:5000/'
var socket

const SideDrawer = () => {
  const {
    user,
    notification,
    setNotification,
    soundNotification,
    setSoundNotification,
    setUserProfile,
  } = GlobalState()

  const [searchResult, setSearchResult] = useState([])

  const [isOpen, setIsOpen] = React.useState(false)

  const [loading, setLoading] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user)
    socket.on('connected', () => console.log('connected'))
  }, [])

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      setNotification([newMessageRecieved, ...notification])
      setTimeout(() => {
        setNotification([])
        setSoundNotification(false)
      }, 3000)
      if (soundNotification === true) {
        callMySound(soundSrc)
      }
    })
  })

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }
  const initialFocusRef = React.useRef()
  const soundSrc =
    'https://res.cloudinary.com/dalp4xrqs/video/upload/v1650926612/audios/X2Download_mp3cut.net_pufirh.mp3'
  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    })
    sound.play()
  }

  useEffect(() => {
    if (soundNotification) {
      callMySound(soundSrc)
    }
  }, [soundNotification])

  const handleSearch = async (query) => {
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      }
      const { data } = await axios.get(`/api/user?search=${query}`, config)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      console.log(error)
    }
  }

  const redirect = (id) => {
    navigate(`/home/profile/${id}`)
    setIsOpen(false)
  }

  return (
    <Center mt="31px">
      <Box
        backgroundColor="white"
        position="fixed"
        width="100%"
        height="16"
        borderWidth="1px"
        style={{ zIndex: '100' }}
      ></Box>

      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        pos="fixed"
        w="90%"
        maxW="2xl"
        height="15"
        style={{ zIndex: '100' }}
      >
        <Box className="ocultar-div">
          <NavLink variant="ghost" to="/home/posts">
            <Img
              src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png"
              boxSize="8"
              w="22"
            ></Img>
          </NavLink>
        </Box>

        <Box>
          <Popover isOpen={isOpen} initialFocusRef={initialFocusRef}>
            <PopoverTrigger>
              <InputGroup
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="gray.300" height="30px">
                      <i className="fa-solid fa-magnifying-glass fa-xs"></i>
                    </Box>
                  }
                />
                <Input
                  backgroundColor="#EFEFEF"
                  placeholder="Buscar"
                  height="35px"
                  border={0}
                  borderRadius="md"
                  ref={initialFocusRef}
                  onChange={(e) => {
                    handleSearch(e.target.value)
                  }}
                ></Input>
              </InputGroup>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton
                onClick={() => {
                  setIsOpen(false)
                }}
              />
              <PopoverBody>
                {!loading ? (
                  <span style={{ marginLeft: '10px' }}>Personas</span>
                ) : null}
                {loading ? (
                  <Center>
                    <Spinner></Spinner>
                  </Center>
                ) : (
                  searchResult?.slice(0, 4).map((user) => (
                    <UserListItem
                      onClick={() => {
                        setIsOpen(false)
                      }}
                      handleFunction={() => {
                        redirect(user._id)
                      }}
                      key={user._id}
                      user={user}
                    ></UserListItem>
                  ))
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>

        <Box
          w="36"
          justifyContent="space-between"
          d="flex"
          alignItems="center"
          bg="white"
          style={{ zIndex: '100' }}
        >
          <NavLink variant="ghost" to="/home/posts">
            <i className="fa-solid fa-house-user fa-xl"></i>
          </NavLink>
          <NavLink
            variant="ghost"
            to="/home/chats"
            onClick={() => {
              setNotification([])
            }}
          >
            <i className="fa-solid fa-message fa-xl"></i>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
          </NavLink>
          <Menu>
            <MenuButton as={Button} variant="unstyled">
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <NavLink
                onClick={() => {
                  setUserProfile(user)
                }}
                to={`/home/profile/${user.id}`}
              >
                <MenuItem>Perfil</MenuItem>
              </NavLink>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={logoutHandler}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Center>
  )
}

export default SideDrawer
