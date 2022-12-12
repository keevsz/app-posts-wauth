import { Row } from "@/styled-components";
import { Column } from "../Home/styled-components/Container";
import ChatBox from "./ChatBox";
import { ChatProvider } from "./context/ChatProvider";
import { MessageBox, MessageUser } from "./Messages.styled";
import UserList from "./UserList";

const Messages = () => {
  return (
    <ChatProvider>
      <MessageBox>
        <MessageUser>
          <Row>
            <Column gap="1rem">
              <UserList></UserList>
            </Column>
            <Column gap="1rem">
              <ChatBox></ChatBox>
            </Column>
          </Row>
        </MessageUser>
      </MessageBox>
    </ChatProvider>
  );
};
export default Messages;
