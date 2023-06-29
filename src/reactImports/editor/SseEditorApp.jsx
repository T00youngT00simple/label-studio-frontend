import React from 'react';
import SseApp3d from "./3d/SseApp3d";

import "./3d/styles/layout.scss"
import "./3d/styles/main.scss"
import "./3d/styles/tippy.scss"
import 'antd/dist/antd.min.css';

function SseEditorApp(props) {
    return (
        <div>
            <SseApp3d parameters={props.parameters}></SseApp3d>
        </div>
    )
}


export default SseEditorApp;
