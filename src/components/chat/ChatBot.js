import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatLogic from './ChatLogic';
import {ToggleButton} from "@mui/lab";
const ChatBot = () => {


    return (
        <ThemeProvider  theme={ToggleButton}>
            <ChatLogic  />
        </ThemeProvider>
    );
};

export default ChatBot;

