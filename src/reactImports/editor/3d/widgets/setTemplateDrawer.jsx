import React from 'react';
import { Drawer, Button, Form, Input, Popover, Icon, Tag, Tabs, Card, Modal, message } from 'antd';
import SseMsg from "../../../common/SseMsg";
import { Sketch } from '@uiw/react-color';
import i18n from "../../../lib/i18n/index"
import SseGlobals from "../../../common/SseGlobals"

import  "../styles/setTemplateDrawer.scss";


class SetTemplateDrawer extends React.Component {
    constructor(props) {
        super();
        SseMsg.register(this);
        this.state = {
            labelSets: this.initClassesSets(props),
            tags: this.initTags(props),
            tagName: null,
            color: null,
            labelName: null,
            submitting: false,
            tabActiveKey: "1",
            name: null,
            version: null,
            changingLabel: {},
            changeLabelModalVisible: false,
            changeLabelKey: null
        }
    }

    initTags(props) {
        return props.allTags || [];
    }

    initClassesSets(props) {
        if (props.classesSets[0].descriptors.length != 0) {
            return props.classesSets[0].descriptors;
        }else {
            return [
                {
                    label: i18n.gettext('VOID'),
                    color: '#CFCFCF',
                    classIndex: 0,
                    mute: false,
                    solo: false,
                    visible: true,
                },
            ];
        }
    }

    handleChange = (value, type) => {
        let stateDic = {};
        stateDic[type] = value;

        this.setState(stateDic);

        if (type == 'color'){
            this.props.form.setFieldsValue({Color: value});
        }
    };

    addItem = (methods) => { 
        if (methods == "addLabel"){
            this.props.form.validateFieldsAndScroll(['Color', 'labelName'], (err, values) => {
                if (!err){
                    let labelObj = {
                        label: this.state.labelName,
                        color: this.state.color,
                        classIndex: this.state.labelSets.length,
                        mute: false,
                        solo: false,
                        visible: true,
                    };
    
                    let labelSets = this.state.labelSets;
                    labelSets.push(labelObj); 
    
                    this.setState({
                        labelSets: labelSets
                    });
                }
            });

        }else {
            this.props.form.validateFieldsAndScroll(['tagName'], (err, values) => {
                if (!err){
                    let tags = this.state.tags;
                    tags.push(this.state.tagName); 
    
                    this.setState({
                        tags: tags
                    });
                }
            });
        }

    }

    submitTemplate() {
        this.setState({
            submitting: true
        })

        this.props.form.validateFieldsAndScroll(['name', 'version'], (err, values) => {
            if (err){
                this.setState({
                    tabActiveKey: "3",
                    submitting: false
                });
            }else {
                let labelPageDto = {
                    dataBatchId: this.props.batchId,
                    templateId: this.props.templateId,
                    labelSet: [{
                            classesSets: 
                                [{
                                    "name": "Cityscapes",
                                    "objects": this.state.labelSets
                                }]  
                        },{
                            allTags: this.state.tags
                        }
                    ],
                    name: this.state.name,
                    version: this.state.version
                };
                
                this.props.customPage(labelPageDto).then((r) => {
                    if (r.code == 1) {
                        message.error(r.msg);
                    }else {
                        this.props.toggleSetTemplateDraVisible();
                    }

                    this.setState({
                        submitting: false,
                    });
                })

            }
        });
    }

    renderSetLabelForm() {
        let { getFieldDecorator } = this.props.form;
        const colorSelector = (
            <Sketch
                className='colorSelector'
                onChange={(color) => {
                    this.handleChange(color.hex, "color");
                }}
            /> 
        );

        return (
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off" 
                className='setLabelFormContent'
                >
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Color")}>
                    {getFieldDecorator('Color', {
                        initialValue: this.state.color,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your color') 
                        },{
                            pattern: /^#[A-Fa-f0-9]{6}$/,
                            message: i18n.gettext("Please input a valid color"),
                        }]
                    })(
                        <span>
                            <Input
                                placeholder={i18n.gettext('Please input your color')} 
                                prefix={<Icon type="edit"/>}
                                value={this.state.color}
                                onChange={e => this.handleChange(e.target.value, "color")}
                                suffix={
                                    <Popover placement="top" content={colorSelector} trigger="click">
                                        <Icon className="colorSelectorIcon" type="highlight" />
                                        <span className='colorBlock' style={{"backgroundColor": this.state.color}}></span>
                                    </Popover>
                                }
                                />
                        </span>
                    )}
                </Form.Item>
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Label Name")}>
                    {getFieldDecorator('labelName', {
                        initialValue:this.state.labelName,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your label name') 
                        }]
                    })(
                        <Input
                            placeholder={i18n.gettext('Please input your label name')}
                            prefix={<Icon type="edit"/>}
                            allowClear={true}
                            onChange={e => this.handleChange(e.target.value, "labelName")}
                    />
                    )}
                </Form.Item>
            </Form>
        );
    }

    renderPageInfoForm() {
        let { getFieldDecorator } = this.props.form;

        return (
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                className="pageInfoFormContent"
                autoComplete="off" 
                >
                <Form.Item 
                    colon={false} 
                    key={"name"}
                    label={i18n.gettext("Template Name")}>
                    {getFieldDecorator('name', {
                        initialValue:this.state.name,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your template name') 
                        }]
                    })(
                        <Input
                            placeholder={i18n.gettext('Please input your template name')}
                            prefix={<Icon type="edit"/>}
                            allowClear={true}
                            onChange={e => this.handleChange(e.target.value, "name")}/>
                    )}
                </Form.Item>
                <Form.Item 
                    colon={false} 
                    key={"version"}
                    label={i18n.gettext("Version")}>
                    {getFieldDecorator('version', {
                        initialValue:this.state.version,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your template version') 
                        }]
                    })(
                        <Input
                            placeholder={i18n.gettext('Please input your template version')}
                            prefix={<Icon type="edit"/>}
                            allowClear={true}
                            onChange={e => this.handleChange(e.target.value, "version")}/>
                    )}
                </Form.Item>
            </Form>
        );
    }

    renderTagsForm() {
        let { getFieldDecorator } = this.props.form;
        
        return (
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off" 
                className='setTagFormContent'
                >
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Tag Name")}
                    key={"tagName"}>
                    {getFieldDecorator('tagName', {
                        initialValue:this.state.tagName,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your tag name') 
                        }]
                    })(
                        <Input
                            placeholder={i18n.gettext('Please input your tag name')}
                            prefix={<Icon type="edit"/>}
                            allowClear={true}
                            onChange={e => this.handleChange(e.target.value, "tagName")}
                        />
                    )}
                </Form.Item>
            </Form>
        );

    }

    renderOperationBtn(methods) {
        return (
            <div className='oprerationBtnContent'>
                <Button className='addItemBtn' onClick={e => this.addItem(methods)}> 
                    {methods == "addLabel" ? i18n.gettext("Add Label") : i18n.gettext("Add Tag")}
                </Button>
            </div>
        );
    }

    deleteSetItem(key, methods) {
        let labelSets = this.state.labelSets;
        let tags = this.state.tags;

        if (methods == "label"){
            labelSets.splice(key, 1);
            this.setState({
                labelSets: labelSets
            })

        }else {
            tags.splice(key, 1);
            this.setState({
                tags: tags
            })
        }
    }

    renderTags() {
        let tags = (this.state.tags || []).map((tag, key) => {
            return (
                <Tag closable 
                    className='nameTag'
                    key={key}
                    onClose={e => this.deleteSetItem(key, "tag")}>
                    {tag}
                </Tag>
            );
        });

        return (
            <Card className='templateSetListCard' title={i18n.gettext("Tag List Card")}>
               {tags.length != 0 ? tags :  
                    <div className='tagContent'>
                        <div className='noneContent'>{i18n.gettext("Display None")}</div>
                    </div>}
            </Card>
        );
    }

    toggleChangeLabelModalVisible(labelSetObj, key) {
        let obj = labelSetObj && JSON.parse(JSON.stringify(labelSetObj)) || {};

        this.setState({
            changingLabel: obj,
            changeLabelKey: key || null,
            changeLabelModalVisible: !this.state.changeLabelModalVisible
        });
    }

    renderLabels() {
        let labels = this.state.labelSets.map((labelSetObj, key) => {
            if (labelSetObj.classIndex != 0){
                return (
                    <div className='nameTag'>
                        <Tag closable 
                            className='nameTagContent'
                            style={{
                                backgroundColor: labelSetObj.color,
                                color: SseGlobals.computeTextColor(labelSetObj.color)
                            }}
                            key={key}
                            onClose={e => this.deleteSetItem(key, "label")}
                            >
                            <Icon className='tagIcon' type="tags" />
                            {labelSetObj.label}
                        </Tag>
                        <Icon type="edit" className='editLabel' onClick={e => this.toggleChangeLabelModalVisible(labelSetObj, key)}/>
                    </div>
                );
            }
        })

        return (
            <Card className='templateSetListCard' title={i18n.gettext("Label List Card")}>
               {labels.length > 1 ? labels :
                    <div className='noneContent'>{i18n.gettext("Display None")}</div>
               }
            </Card>
        );
    }

    changeLabel() {
        if (this.state.changingLabel && this.state.changeLabelKey){
            let labelSets = this.state.labelSets;
            labelSets[this.state.changeLabelKey] = this.state.changingLabel;

            this.setState({
                labelSets: labelSets
            });

            this.toggleChangeLabelModalVisible();
            message.success(i18n.gettext("修改标签成功"));
        }
    }
    
    handleChangeLabelObj = (value, type) => {
        let changeLabel = this.state.changingLabel;
        changeLabel[type] = value;

        this.setState({
            changeLabel: changeLabel
        });
        
        if (type == 'color'){
            this.props.form.setFieldsValue({Color: value});
        };
    }

    renderModalContent() {
        let { getFieldDecorator } = this.props.form;

        if (!this.state.changingLabel.visible){
            return null;
        }

        const colorSelector = (
            <Sketch
                className='colorSelector'
                onChange={(color) => {
                    this.handleChangeLabelObj(color.hex, "color");
                }}
            /> 
        );

        return(
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off" 
                className='setLabelFormContent'
                >
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Color")}>
                    {getFieldDecorator('changeColor', {
                        initialValue: this.state.changingLabel && this.state.changingLabel.color,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your color') 
                        },{
                            pattern: /^#[A-Fa-f0-9]{6}$/,
                            message: i18n.gettext("Please input a valid color"),
                        }]
                    })(
                        <span>
                            <Input
                                placeholder={i18n.gettext('Please input your color')} 
                                prefix={<Icon type="edit"/>}
                                value={ this.state.changingLabel && this.state.changingLabel.color}
                                onChange={e => this.handleChangeLabelObj(e.target.value, "color")}
                                suffix={
                                    <Popover placement="top" content={colorSelector} trigger="click">
                                        <Icon className="colorSelectorIcon" type="highlight" />
                                        <span className='colorBlock' style={{"backgroundColor": this.state.changingLabel.color}}></span>
                                    </Popover>
                                }
                                />
                        </span>
                    )}
                </Form.Item>
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Label Name")}>
                    {getFieldDecorator('changeLabelName', {
                        initialValue: this.state.changingLabel && this.state.changingLabel.label,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your label name') 
                        }]
                    })(
                        <Input
                            placeholder={i18n.gettext('Please input your label name')}
                            value={this.state.changingLabel && this.state.changingLabel.label}
                            prefix={<Icon type="edit"/>}
                            allowClear={true}
                            onChange={e => this.handleChangeLabelObj(e.target.value, "label")}
                    />
                    )}
                </Form.Item>
            </Form>
        );
    }

    renderChangeLabelModal() {
        return (
            <Modal
                title={i18n.gettext("Change label value")}
                visible={this.state.changeLabelModalVisible}
                onCancel={e => this.toggleChangeLabelModalVisible()}
                footer={[
                    <Button key="cancel" onClick={e => this.toggleChangeLabelModalVisible()}>
                        {i18n.gettext("Cancel")}
                    </Button>,
                    <Button key="change" type="primary" onClick={e => this.changeLabel()}>
                        {i18n.gettext("Change")}
                    </Button>,
                  ]}
                >
                    {this.renderModalContent()}
            </Modal>
        )
    }

    changeTab(key) {
        this.setState({
            tabActiveKey: key
        })
    }

    renderDrawerContent() {
        const { TabPane } = Tabs;
        
        if (!this.props.templateId) {
            return null;
        }

        return (
            <Tabs activeKey={this.state.tabActiveKey} onChange={e => this.changeTab(e)}>
                <TabPane tab={i18n.gettext("Set Label")} key={1}>
                    {this.renderSetLabelForm()}
                    {this.renderOperationBtn("addLabel")}
                    {this.renderLabels()}
                </TabPane>
                <TabPane tab={i18n.gettext("Set Tag")} key={2}>
                    {this.renderTagsForm()}
                    {this.renderOperationBtn("addTag")}
                    {this.renderTags()}
                </TabPane>
                <TabPane tab={i18n.gettext("Page Info")} key={3}>
                    {this.renderPageInfoForm()}
                </TabPane>
            </Tabs>
        )
    }

    renderFooter() {
        return (
            <div className='drawerFooter'>
                <Button type="primary"
                        className='postBtn'
                        loading={this.state.submitting}
                        onClick={e => this.submitTemplate()}>
                    {i18n.gettext("Post")}
                </Button>
                <Button type="cancel"
                        onClick={e => this.props.toggleSetTemplateDraVisible()}>
                    {i18n.gettext("Cancel")}
                </Button>
            </div>
        )
    }

    render() {
        return (
            <Drawer title={i18n.gettext("Set Template Drawer")}
                    placement="right"
                    onClose={this.props.toggleSetTemplateDraVisible}
                    visible={this.props.visible}
                    destroyOnClose={true}
                    className="setTemplateDrawer"
                    width={500}>
                {this.renderDrawerContent()}
                {this.renderFooter()}
                {this.renderChangeLabelModal()}
            </Drawer>
        )
    }

}

export default Form.create()(SetTemplateDrawer);