import ChatBot from "../chat/Chat";

const ChatPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
            height: '80vh', backgroundColor: 'black' }}>
            <ChatBot />
        </div>
    );
};

export default ChatPage;