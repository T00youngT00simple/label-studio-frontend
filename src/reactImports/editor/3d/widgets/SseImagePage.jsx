import React from 'react';
import Draggable from 'react-draggable'; 
import { Icon, Modal } from 'antd';

import "../styles/sseImagePage.scss"


export default class SseImagePage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            delta: 1,
            zoomVal: 1
        }
    }

    onImageZoomIn = (e) => {
        let event = window.event;
        let delta = this.state.delta;

        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
        } else if (event.detail) {
            delta = -event.detail / 3;
        };
        
        if (delta > 0) {
            this.setState({
                zoomVal: this.state.zoomVal + 0.1,
            });
        
        } else if (delta < 0) {
            if (this.state.zoomVal > 0.5) {
                this.setState({
                    zoomVal: this.state.zoomVal - 0.1,
                });
            };
        };
    }

    render () {
        return (
            <div className='imageContent'>
                <Draggable>
                    <div>
                        <div className='mask'
                            onWheel={e => {this.onImageZoomIn(e)}}
                            style={{"transform": "scale(" + this.state.zoomVal + ")"}}
                        ></div>
                        <img id="modalContentImage" 
                            style={{"transform": "scale(" + this.state.zoomVal + ")"}} 
                            src={this.props.parameters.imagePath}/>
                    </div>
                </Draggable>
            </div>
        );
    }
}