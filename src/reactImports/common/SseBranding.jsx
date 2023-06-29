import React from 'react';
import i18n from "../lib/i18n/index"
import SseMsg from './SseMsg';
export default class SseSnackbar extends React.Component {
    constructor(props) {
        super();
        SseMsg.register(this);

        this.state = {
            duration: Number(localStorage.getItem("duration"))
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick = () => {
        this.setState({
            duration: this.state.duration + 1
        })

        localStorage.setItem("duration", this.state.duration);
    }

    componentDidUpdate(nextProps) {
        if (nextProps.fileName != this.props.fileName) {
            this.setState({
                duration: Number(localStorage.getItem("duration"))
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        SseMsg.unregister(this);
    }

    getTime(time) {
        let h = parseInt(time / 60 / 60 % 24)
        h = h < 10 ? '0' + h : h
        let m = parseInt(time / 60 % 60)
         m = m < 10 ? '0' + m : m
        let s = parseInt(time % 60)
         s = s < 10 ? '0' + s : s
        return h + ":" + m  + ":" + s
    }

    render() {
        return (<div className="sse-logo hflex flex-align-items-center flex-justify-content-start">
            <div className="vflex">
                <div style={{"color": this.props.isAbnormalTask ? "red" : "white"}}>{this.props.fileName}{this.props.isAbnormalTask && i18n.gettext("Unusual")}</div>
                {this.props.taskCategory != "acceptance" 
                    && this.props.onlyView != "true"
                    && this.props.isTemplate != "true" 
                    && this.props.urlType != "traid-and-bid-task"
                    && <div>{this.getTime(this.state.duration)}</div>}
            </div>
        </div>)
    }
}