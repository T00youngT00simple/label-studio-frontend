import React from 'react';
import { Button, Form, Input, Popover, Icon, Modal, message, TextArea, Select } from 'antd';
import SseMsg from "../../../common/SseMsg";
import { Sketch } from '@uiw/react-color';
import i18n from "../../../lib/i18n/index"

import  "../styles/auditCommentModal.scss";


class AuditCommentModal extends React.Component {
    constructor(props) {
        super();
        SseMsg.register(this);
        this.state = {
            auditCommentObj: {
                labelName: null,
                color: null,
                type: null,
                feature: null,
            },
            featureLength: 0
        }
    }

    handleChangeAuditCommentObj = (value, type) => {
        let auditCommentObj = this.state.auditCommentObj;
        auditCommentObj[type] = value;

        this.setState({
            auditCommentObj: auditCommentObj
        });
        
        if (type == 'color'){
            this.props.form.setFieldsValue({color: value});
        };

        if (type == 'feature') {
            this.setState({
                featureLength: value.length
            });
        };
    }

    addAuditComment = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err){
                let auditCommentObj = this.state.auditCommentObj;
                let auditComment = this.props.auditComment || [];
                let { pointSet } = this.props;

                auditCommentObj.id = Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
                auditCommentObj.pointSet = Array.from(pointSet);
                auditCommentObj.checked = false;
                auditComment.push(auditCommentObj); 

                this.props.forUpdateAuditComment(auditComment);
                this.props.toggleAddAuditCommentModal();
                this.clearAll();
                
                this.props.showAuditSelection(auditCommentObj);

                message.success(i18n.gettext("Add Audit Success"));
            }
        });
    }

    clearAll() {
        let auditCommentObj = {
            labelName: null,
            color: null,
            type: null,
            feature: null,
        };

        this.props.form.resetFields();

        this.setState({
            auditCommentObj: auditCommentObj
        });
    }

    renderModalContent() {
        let { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const { TextArea } = Input;

        const colorSelector = (
            <Sketch
                className='colorSelector'
                onChange={(color) => {
                    this.handleChangeAuditCommentObj(color.hex, "color");
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
                className='addAuditCommentFormContent'
                >
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Color")}>
                    {getFieldDecorator('color', {
                        initialValue: this.state.auditCommentObj.color,
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
                                value={ this.state.auditCommentObj && this.state.auditCommentObj.color}
                                onChange={e => this.handleChangeAuditCommentObj(e.target.value, "color")}
                                suffix={
                                    <Popover placement="top" content={colorSelector} trigger="click">
                                        <Icon className="colorSelectorIcon" type="highlight" />
                                        <span className='colorBlock' style={{"backgroundColor": this.state.auditCommentObj.color}}></span>
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
                        initialValue: this.state.auditCommentObj && this.state.auditCommentObj.label,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your label name') 
                        }]
                    })(
                        <Input
                            placeholder={i18n.gettext('Please input your label name')}
                            prefix={<Icon type="edit"/>}
                            allowClear={true}
                            onChange={e => this.handleChangeAuditCommentObj(e.target.value, "labelName")}
                    />
                    )}
                </Form.Item>
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Type")}>
                    {getFieldDecorator('type', {
                        initialValue: this.state.auditCommentObj && this.state.auditCommentObj.type,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please select your type') 
                        }]
                    })(
                        <Select prefixIcon={<Icon type="edit"/>} onChange={(value) => this.handleChangeAuditCommentObj(value, "type")}>
                            <Option value="mislabeled">错标</Option>
                            <Option value="missMark">漏标</Option>
                            <Option value="multiLabel">多标</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Feature")}>
                    {getFieldDecorator('feature', {
                        initialValue: this.state.auditCommentObj && this.state.auditCommentObj.feature,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your feature') 
                        }]
                    })(
                        <TextArea
                            placeholder={i18n.gettext("Please input your feature")}
                            allowClear={true}
                            className="featureTextArea"
                            maxLength={60}
                            onChange={e => this.handleChangeAuditCommentObj(e.target.value, 'feature')}/>
                    )}
                </Form.Item>
            </Form>
        );
    }

    render() {
        return (
            <Modal
                title={i18n.gettext("Add Audit Comment")}
                visible={this.props.visible}
                destroyOnClose={false}
                onCancel={e => {   
                    this.clearAll();
                    this.props.toggleAddAuditCommentModal();}}
                footer={[
                    <Button key="cancel" onClick={e => {
                        this.clearAll();
                        this.props.toggleAddAuditCommentModal();}}>
                        {i18n.gettext("Cancel")}
                    </Button>,
                    <Button key="change" type="primary" onClick={e => this.addAuditComment()}>
                        {i18n.gettext("Change")}
                    </Button>,
                ]}
                >
                    {this.renderModalContent()}
            </Modal>
        );
    }

}

export default Form.create()(AuditCommentModal);