import React from 'react';
import { Button, Popover, Tag, Icon } from 'antd';
import i18n from '../../../lib/i18n';

import  "../styles/measurePointPopover.scss";

export default class MeasurePointPopover extends React.Component {
    constructor(props) {
        super();
    }

    renderMeasurePoint() {
        let measurePoints;
        
        if (this.props.measurePoints && this.props.measurePoints.length == 0) {
            measurePoints = (<div className='noneContent'>{i18n.gettext("Display None")}</div>);
        } else if ( this.props.measurePoints.length > 0){
            measurePoints = (this.props.measurePoints || []).map((item, index) => {
                return (
                    <div className='measurePointInfo'>
                        <span>{i18n.gettext("Measure Point") + (index + 1) + "："}</span>
                        <span>{`x: ${item.x.toFixed(2)}m, y: ${item.y.toFixed(2)}m, z: ${item.z.toFixed(2)}m, `}</span>
                    </div>
                );
            })
        }

        return (
            <div className='measurePointContent'>
                {measurePoints}
                {this.props.pointDistance && (<span className='distanceInfo'>{i18n.gettext("Distance to point") + "：" + this.props.pointDistance + "m"}</span>)}
            </div>);
    }

    render() {
        return (
            <Popover placement="bottom" 
                    content={this.renderMeasurePoint()} 
                    trigger="click">
                 <Button className="measureBtn" type="primary">
                    {i18n.gettext("Distance to point")}
                </Button>
            </Popover>
        );
    }

}