import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import React from "react"
import { NavLink } from "react-router-dom"
import ScrollableFeed from "react-scrollable-feed"
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics"
import { GlobalState } from "../../Context/GlobalProvider"
const ScrollableChat = ({ messages }) => {
  const { user } = GlobalState()
  return (
    <div>
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user.id) ||
                isLastMessage(messages, i, user.id)) && (
                <>
                  <Menu>
                    <Tooltip
                      label={m.sender.name}
                      placement="bottom-start"
                      hasArrow
                    >
                      <MenuButton>
                        <Avatar
                          mt="7px"
                          mr={1}
                          size="sm"
                          cursor="pointer"
                          name={m.sender.name}
                          src={m.sender.pic}
                        ></Avatar>
                      </MenuButton>
                    </Tooltip>
                    <MenuList _hover={{ backgroundColor: "#FAFAFA" }}>
                      <NavLink to={`/home/profile/${m.sender._id}`}>
                        <Text _hover={{ cursor: "pointer" }} ml="15px">
                          Ver perfil
                        </Text>
                      </NavLink>
                    </MenuList>
                  </Menu>
                </>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user.id ? "#74D7D4" : "#F2F3F4"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user.id),
                  marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "45%",
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  )
}

export default ScrollableChat
