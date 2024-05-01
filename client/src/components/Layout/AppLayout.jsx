import Title from "../shared/Title";
import Header from "../shared/Header";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";

const AppLayout = () => (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    const chatId = params.chatId;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isMobile } = useSelector((state) => state.misc);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isLoading, data, isError, error } = useMyChatsQuery("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useErrors([{ isError, error }]);

    const handelMobileClose = () => {
      dispatch(setIsMobile(false));
    };
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat", _id, groupChat);
    };

    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handelMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.data?.chats}
              chatId={chatId}
              newMessagesAlert={[
                {
                  chatId,
                  count: 4,
                },
              ]}
              onlineUsers={[1, 2]}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.data?.chats}
                chatId={chatId}
                newMessagesAlert={[
                  {
                    chatId,
                    count: 4,
                  },
                ]}
                onlineUsers={[1, 2]}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            // bgcolor={"primary.main"}
          >
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            height={"100%"}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout; // Make sure to export the AppLayout component as default
