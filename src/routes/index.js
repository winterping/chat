import React from 'react';
import { Redirect } from "react-router-dom";
import Chat from '../application/chat/index';

export default [{
    path: "/:id",
    component: Chat,
}]