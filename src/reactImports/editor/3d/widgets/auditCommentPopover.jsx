import React from 'react';
import { Button, Popover, Tag, Icon } from 'antd';
import i18n from '../../../lib/i18n';

import  "../styles/auditCommentPopover.scss";

export default class AuditCommentPopover extends React.Component {
    constructor(props) {
        super();
        this.state = {
            auditComment: [],
        }
    }

    deleteSetItem(key) {
        let auditComment = this.props.auditComment;

        auditComment.splice(key, 1);
        this.setState({
            auditComment: auditComment
        })

        this.props.forUpdateAuditComment(auditComment);
    }

    checkComment(id) {
        let auditComment = this.props.auditComment;
        let auditCommentObj = auditComment.find(item => item.id == id);

        auditCommentObj.checked = !auditCommentObj.checked;

        this.setState({
            auditComment: auditComment
        });
        this.props.forUpdateAuditComment(auditComment);
    }

    renderAuditCommentContent() {
        const commentType = [{
            type: "mislabeled",
            text: "错标"
        },{
            type: "missMark",
            text: "漏标"
        },{
            type: "multiLabel",
            text: "多标"
        }]

        let auditComment = this.props.auditComment || [];

        if (auditComment.length == 0 || (auditComment.length == 1 && !auditComment[0].id)){
            return (
                <div className='commentSec'>
                    <div className='commentList'>
                        <div className='noneContent'>{i18n.gettext("Display None")}</div>
                    </div>
                </div>
            )
        }

        let errorPointLength = 0;

        let comments = auditComment.map((comment, key) => {
            if (comment.pointSet) {
                errorPointLength += comment.pointSet.length
            }

            if (comment.id) {
                return (
                    <Tag 
                        closable={this.props.taskCategory == "label" ? false : true } 
                        onClick={() => {
                            if (!comment.color) {
                                return;
                            };
                            this.props.showAuditSelection(comment);
                        }}
                        className='commentTag'
                        key={key}
                        onClose={e => this.deleteSetItem(key)}>
                            <div className='tagConent'>
                                <span className='titleContent'>
                                    <span className='labelName'>
                                        {comment.labelName}
                                    </span>
                                    {comment.color && comment.pointSet &&
                                        <span className='colorBlock' style={{"backgroundColor": comment.color}}></span>}
                                </span>
                                {commentType.find(x => x.type == comment.type).text}
                            </div>
                            <div className='feature'>
                                {comment.feature}
                            </div>
                            {this.props.taskCategory == "label" && 
                                <Icon type={comment.checked ? "close-circle" : "check-circle"}
                                    onClick={() => {this.checkComment(comment.id)}} 
                                    className="checkIcon"/>}
                            {comment.checked && <span className='checkedText'>{i18n.gettext("Has Checked")}</span>}
                    </Tag>
                );
            }
        })

        return (
            <div className='commentSec'>
                <div className='accuracySec'>
                    <span>{i18n.gettext("Point accuracy")}{this.props.pointLength - errorPointLength} / {this.props.pointLength} {"Points"}</span>
                    <span>{((1 - errorPointLength /this.props.pointLength) * 100 ).toFixed(2)}{i18n.gettext("%")}</span>
                </div>
                <div className='commentList'>
                    {comments}
                </div>
            </div>
        );
    }

    render() {
        return (
            <Popover placement="bottom" 
                    content={this.renderAuditCommentContent()} 
                    onVisibleChange={() => this.props.onVisibleChange()}
                    trigger="click">
                 <Button className="auditCommentBtn" type="primary">
                    {i18n.gettext("Audit Comment")}
                </Button>
            </Popover>
        );
    }

}