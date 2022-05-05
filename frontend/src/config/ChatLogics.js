export const getSender = (loggedUser, chat) => {
  try {
    const getChat = chat.users ? chat : chat[0]
    const ret = getChat.isGroupChat ? getChat.chatName : getChat.users[1].name
    if (!getChat.isGroupChat) {
      return getChat.users[0]._id === loggedUser.id
        ? getChat.users[1].name
        : getChat.users[0].name
    }
    return ret
  } catch (error) {}
}

export const getPic = (chat) => {
  try {
    const getChat = chat.users ? chat : chat[0]
    const ret = getChat.isGroupChat
      ? "https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-group-icon-png-image_1796653.jpg"
      : getChat.users[1].pic

    return ret
  } catch (error) {}
}

export const getSenderFull = (loggedUser, chat) => {
  const getChat = chat.users ? chat : chat[0]
  const ret = getChat.isGroupChat ? getChat : getChat
  return ret
}

export const isChatGroup = (chat) => {
  const getChat = chat.users ? chat : chat[0]
  const ret = getChat.isGroupChat ? true : false
  return ret
}

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  )
}

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  )
}

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0
  else return "auto"
}

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id
}
