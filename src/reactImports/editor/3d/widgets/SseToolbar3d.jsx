import React from 'react';

import SseToolbar from "../../../common/SseToolbar";
import SseBranding from "../../../common/SseBranding";
import {
    CircleOutline, FileDownloadOutline, Gesture, Minus, Plus, PlusMinus, Redo, SquareOutline,
    Undo
} from 'mdi-material-ui';
import i18n from "../../../lib/i18n/index"


export default class SseToolbar3d extends SseToolbar {

    constructor() {
        super();
        this.state = {pointSize: 2}
    }


    componentDidMount() {
        super.componentDidMount();


        this.addCommand("selectorCommand", i18n.gettext("Lasso Selector"), 1, "H", "selector", Gesture, undefined, undefined);
        this.addCommand("rectangleCommand", i18n.gettext("Rectangle Selector"), 1, "J", "rectangle", SquareOutline, undefined, undefined);
        this.addCommand("circleCommand", i18n.gettext("Circle Selector"), 1, "K", "circle", CircleOutline, undefined, undefined);

        this.addCommand("selectionAddCommand", i18n.gettext("Selection Mode: Add Desc"), 2, "Y", "selection-mode-add", Plus, undefined, undefined,  i18n.gettext("Selection Mode: Add Desc"));
        this.addCommand("selectionToggleCommand", i18n.gettext("Selection Mode: Toggle Desc"), 2, "U", "selection-mode-toggle", PlusMinus, undefined, undefined,  i18n.gettext("Selection Mode: Toggle Desc"));
        this.addCommand("selectionRemoveCommand", i18n.gettext("Selection Mode: Remove Desc"), 2, "I", "selection-mode-remove", Minus, undefined, undefined, i18n.gettext("Selection Mode: Remove Desc"));

        this.addCommand("autoFilterCommand", i18n.gettext("Auto Filter"), false, "L", "autoFilter-checkbox", undefined, undefined, undefined, i18n.gettext("Auto Filter Desc"));
        this.addCommand("autoFocusCommand", i18n.gettext("Auto Focus"), false, "Q", "autoFocus-checkbox", undefined, undefined, undefined, i18n.gettext("Auto Focus Desc"));
        this.addCommand("globalboxCommand", i18n.gettext("Bounding Box"), false, "G", "globalbox-checkbox", undefined, undefined, undefined, i18n.gettext("Bounding Box Desc"));
        this.addCommand("selectionOutlineCommand", i18n.gettext("Selection Outline"), false, "V", "selectionOutline-checkbox", undefined, undefined, undefined, i18n.gettext("Selection Outline Desc"));

        this.sendMsg("selector");
        this.sendMsg("selection-mode-add");
    }

    render() {
        return (
            <div className="hflex flex-justify-content-space-around sse-toolbar toolbar-3d no-shrink">
                <SseBranding 
                    isTemplate={this.props.isTemplate}
                    urlType={this.props.urlType}
                    onlyView={this.props.onlyView}
                    fileName={this.props.fileName}
                    isAbnormalTask={this.props.isAbnormalTask}
                    duration={this.props.duration}
                    taskCategory={this.props.taskCategory}/>
                <div className="vflex">
                    <div className="tool-title">{i18n.gettext("Selection Tool")}</div>
                    <div className="hflex">
                        {this.renderCommand("selectorCommand")}
                        {this.renderCommand("rectangleCommand")}
                        {this.renderCommand("circleCommand")}
                    </div>
                </div>
                <div className="vflex">
                    <div className="tool-title">{i18n.gettext("Selection Mode")}</div>
                    <div className="hflex">
                        {this.renderCommand("selectionAddCommand")}
                        {this.renderCommand("selectionToggleCommand")}
                        {this.renderCommand("selectionRemoveCommand")}
                    </div>
                </div>
                <div className="vflex">
                    <div className="tool-title">{i18n.gettext("View Interaction")}</div>
                    <div className="v group">
                        {this.renderCheckbox("autoFocusCommand", false)}
                        {this.renderCheckbox("autoFilterCommand", false)}
                    </div>
                </div>
                <div className="vflex">
                    <div className="tool-title">{i18n.gettext("View Helpers")}</div>
                    <div className="v group">
                        {this.renderCheckbox("selectionOutlineCommand", true)}
                        {this.renderCheckbox("globalboxCommand", true)}
                    </div>
                </div>
            </div>
        )
    }
}