import React from 'react';
import {Button, Dialog, IconButton} from '@material-ui/core';
import {ChevronRight, Eye, EyeOff} from 'mdi-material-ui';
import * as MDI from 'mdi-material-ui';
import SseGlobals from './SseGlobals';
import SseToolbar from "./SseToolbar";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from "../lib/i18n/index"

import "../editor/3d/styles/classChooser.scss"

class SseClassChooser extends SseToolbar {

    constructor(props) {
        super();
        this.pendingState.counters = {};
        this.classesSets = props.classesSets;
        this.classesSetByName = new Map();
        this.classesSets.map(cset => {
            this.classesSetByName.set(cset.name, cset)
        });
        this.state = {
            counters: {},
            soc: this.classesSets[0],
            activeClassIndex: 0
        };
    }

    getIcon(objDesc) {
        if (MDI[objDesc.icon]) {
            const Comp = MDI[objDesc.icon];
            return <Comp/>;
        } else {
            return <MDI.Label/>;
        }
    }

    messages() {
        this.onMsg("classSelection", (arg) => {
            this.setState({activeClassIndex: arg.descriptor.classIndex});
        });
        
        this.onMsg("classIndex-select", (arg) => {
            this.setState({activeClassIndex: arg.value});
        });
        
        this.onMsg("class-instance-count", arg => {
            this.pendingState.counters[arg.classIndex] = arg.count;
            this.invalidate();
        });

        this.onMsg("currentSample", (arg) => {
            if (arg.data.socName)
                this.changeClassesSet(arg.data.socName);
        });

        this.onMsg("editor-ready", (arg) => {
            if (arg && arg.value && arg.value.socName)
                this.sendMsg("active-soc", {value: this.classesSetByName.get(arg.value.socName)});
            else
                this.sendMsg("active-soc", {value: this.classesSets[0]});
        });

        this.onMsg("active-soc", (arg) => {
            this.soc = arg.value;
            this.displayAll();

        });

        this.onMsg("active-soc-name", (arg) => {
            const value = this.classesSetByName.get(arg.value);
            this.sendMsg("active-soc", {value});
        });

    }

    displayAll() {
        if (this.state) {
            Object.keys(this.state).forEach(k => {
                if (k.toString().startsWith("mute") || k.toString().startsWith("solo")) {
                    delete this.state[k];
                }
            })
        }
    }

    toggleButton(prop, idx) {
        const o = {};
        const p = this.state[prop + idx] || false;
        o[prop + idx] = !p;
        this.setState(o);
    }

    muteOrSolo(name, argument, idx, choose) {
        if (this.state.counters[argument.classIndex] ||
            (!this.state.counters[argument.classIndex] && this.state[name + idx])) {
            this.toggleButton(name, idx);
            this.sendMsg(name, {argument: argument, choose: choose});
        }
    }

    changeClassesSet(name) {
        const newSoc = this.classesSetByName.get(name);
        const usedClasses = Object.keys(this.state.counters).filter(x => this.state.counters[x] > 0);
        const missing = [];
        usedClasses.forEach(x => {
            if (!newSoc.labels.has(x)) {
                missing.push(x);
            }
        });
        //debugger;
        const t = this.state.counters;
        let maxClassIndex = Math.max(...Object.keys(t).filter(k => t[k] > 0));

        if (newSoc.descriptors.length >= maxClassIndex) {
            this.setState({
                soc: newSoc,
                classes: newSoc.descriptors,
                mode: "normal",
                activeClassIndex: 0
            });
            this.sendMsg("active-soc", {value: newSoc});

        }
        else
            this.sendMsg("alert",
                {
                    variant: "error",
                    forceCloseMessage: "dismiss-not-enough-classes",
                    message: "This set of classes only supports " + newSoc.descriptors.length
                    + " different classes (index from 0 to " + (newSoc.descriptors.length - 1) +
                    ") but the current maximum class index for your data is " + maxClassIndex
                });
    }

    shouldComponentUpdate(np, ns) {
        if (this.state.mode == "set-chooser" && ns.mode == "normal")
            this.sendMsg("dismiss-not-enough-classes");
            return true;
    }

    renderDialog() {
        if (this.props.classesSets.length == 0) {
            return null;
        }else {
            return (
                <Dialog open={this.state.mode == "set-chooser"}>
                    <DialogTitle>{i18n.gettext("Choose Classes Sets")}</DialogTitle>
                    <DialogContent>
                        <div className="vflex">
                            <span>{i18n.gettext("Choose which set to use:")}</span>
                            <div className="hflex w100 wrap">
                                {this.props.classesSets.map((cset) => (
                                    <Button
                                        onClick={(e) => this.changeClassesSet(cset.name)}
                                        key={cset.name}>{i18n.gettext(cset.name) + (cset.name == this.props.classesSets[0].name ? i18n.gettext(" (current)") : "")}</Button>
                                ))
                                }
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({mode: "normal"})
                        }} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>)
        }
    }

    initSetChange() {
        this.setState({mode: "set-chooser"});
    }

    componentWillUnmount(){
    }

    render() {
        const smallIconStyle = {width: "25px", height: "25px", color: "darkgray"};
        const smallIconSelected = {width: "25px", height: "25px", color: "red"};

        if (this.props.classesSets.length == 0) {
            return null;

        } else {
            this.props.classesSets.map(cset => {
                this.classesSetByName.set(cset.name, cset)
            });
            
            return (
    
                <div className="sse-class-chooser vflex scroller" style={{"backgroundColor": "#393536", "padding": "5px 5px 0 0"}}>

                    {
                        this.state.soc.descriptors.map((objDesc, idx) => {
                            const isSelected = objDesc.classIndex == this.state.activeClassIndex;

                            return (
                                <div className="hflex flex-align-items-center no-shrink" key={objDesc.label}>
                                    <ChevronRight className="chevron" color={isSelected ? "primary" : "disabled"}/>
                                    <Button className="class-button"
                                            onDoubleClick={() => this.sendMsg("class-multi-select", {name: objDesc.label})}
                                            onClick={() => {
                                                this.sendMsg('classSelection', {descriptor: objDesc});
                                            }}
                                            style={
                                                {
                                                    "width": "100%",
                                                    "minHeight": "20px",
                                                    "margin": "1px",
                                                    "backgroundColor": objDesc.color,
                                                    "color": SseGlobals.computeTextColor(objDesc.color),
                                                    "border": isSelected ? "solid 1px #E53935" : "solid 1px black",
                                                    "padding": "0 3px"
                                                }}>
                                        <div
                                            className="hflex flex-align-items-center w100">
                                            {this.getIcon(objDesc)}{objDesc.label}
                                        </div>
                                        <sup>{this.state.counters[objDesc.classIndex] > 0 ? this.state.counters[objDesc.classIndex] : ""}</sup>
                                    </Button>

                                    {this.props.mode == "3d" ?
                                        <div className="hflex">
                                            <IconButton
                                                onClick={e => this.muteOrSolo("mute", objDesc, idx, this.state["mute" + idx] ? false : true)}
                                                style={this.state["mute" + idx] ? smallIconSelected : smallIconStyle}>
                                                <EyeOff/>
                                            </IconButton>
                                            <IconButton
                                                onClick={e => this.muteOrSolo("solo", objDesc, idx, this.state["solo" + idx] ? false : true)}
                                                style={this.state["solo" + idx] ? smallIconSelected : smallIconStyle}>
                                                <Eye/>
                                            </IconButton>
                                        </div> : null}
                                </div>
                            );
                        })

                    }
                    <Button onClick={() => this.initSetChange()}>{i18n.gettext("Choose Classes Sets")}</Button>
                    {this.renderDialog()}
                </div>
            );
        }

    }
}

export default SseClassChooser;