import React from 'react';
import Draggable from 'react-draggable'; 
import { Button, Icon, Modal } from 'antd';
import i18n from '../../../lib/i18n';
import { baseUrl } from '../../../../config/env';

import "../styles/mapImage.scss"

export default class MapImage extends React.Component {
    constructor(props) {
        super();

        this.state = {
            orderNum: 1,
            imagePath: props.imageList[0] + "?token=" + window.sessionStorage.token,
            imageModalVisable: false,
            delta: 1,
            zoomVal: 1,
            imageListLength: props.imageList.length
        }
    }

    renderFixedImage(){
        return (
            <div className='mapImageContent'>
                <img src={"./label/imgs/000002.jpg"}/>
            </div>
        )
    }

    changeOrder = (method) => {
        let orderNum = this.state.orderNum;

        if (method == "add") {
            orderNum = (orderNum == this.state.imageListLength ? 1 : orderNum + 1);
        
        }else {
            orderNum = (orderNum == 1 ? this.state.imageListLength : orderNum - 1);
        } 

        this.setState({
            orderNum: orderNum,
            imagePath: this.props.imageList[orderNum - 1] + "?token=" + window.sessionStorage.token
        })
    }

    linkToShowImage = () => {
        let url = baseUrl;
        url = url.substring(0, url.length - 5);

        window.open(url + "/#/" + 'semantic_segmentation_image_show?' + "imagepath=" + this.state.imagePath)

        // in local
        // let baseUrl = "http://localhost:8080/#/";
        // window.open(baseUrl + 'semantic_segmentation_image_show?' + "imagepath=" + this.state.imagePath)
    }

    toggleMapModal = () => {
        this.setState({
            imageModalVisable: !this.state.imageModalVisable
        });
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

    render() {
        if (!this.props.mapImageVisiable) {
            return null;
        }

        return (
            <div className='mapImageDrag'>
                <Draggable handle='.drag-handler'>
                    <div className='mapImageDragContent'>
                        <div className='drag-handler'>{i18n.gettext("Map Image")}</div>
                        <img onClick={() => this.toggleMapModal()} src={this.state.imagePath}/>
                        <div className='linkBtnSec'>
                            <Button className='linkBtn' onClick={() => this.linkToShowImage()}>{i18n.gettext("Show in new tab")}</Button>
                        </div>
                        <div className='orderSec'>
                            <Icon className='changeOrderIcons'   
                                  onClick={() => this.changeOrder()}
                                  type="step-backward" />
                            <span>{this.state.orderNum}/ {this.state.imageListLength}</span>
                            <Icon className='changeOrderIcons' 
                                  onClick={() => this.changeOrder("add")}
                                  type="step-forward" />
                        </div>
                    </div>
                </Draggable>
                <Modal
                    visible={this.state.imageModalVisable}
                    onCancel={e => this.toggleMapModal()}
                    footer={null}
                    width={900}
                >
                    <div className='modalContent'>
                        <Draggable>
                        <div>
                            <div className='mask'
                                onWheel={e => {this.onImageZoomIn(e)}}
                                style={{"transform": "scale(" + this.state.zoomVal + ")"}}
                            ></div>
                            <img id="modalContentImage" 
                                style={{"transform": "scale(" + this.state.zoomVal + ")"}} 
                                src={this.state.imagePath}/>
                        </div>
                        </Draggable>
                    </div>
                </Modal>
            </div>
        );
    }
}