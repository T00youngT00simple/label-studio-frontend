import React from 'react';
import { Drawer, Button } from 'antd';
import i18n from "../../../lib/i18n/index";
import  "../styles/helpCenterDrawer.scss";


export default class HelpCenterDrawer extends React.Component {
    constructor(props) {
        super();
    }

    renderContent() {
        return (
            <div className='drawerContent'>
                <div className='firstLevelTitle'>A、标注流程</div>
                <div className='secondLevelTitle'>1、标注操作</div>
                <div className='content'>(1)按住鼠标右键并滑动鼠标可旋转视图。</div>
                <div className='content'>(2)点击鼠标左键圈定范围可按照当前所选套索工具选定点云点位。</div>
                <div className='content'>(3)当点云内点位处于被选择状态，即套索框内点位颜色为红色时，点击左侧已定制标签可对选中点云点位进行所属标签分配，分配成功后该点位颜色变为标签所对应颜色。</div>
                <div className='content'> 通过以上三步，就能完成相应的标注⼯作，标注完成后，点击标签右侧对应按钮可对该标签对应点云点位在图像上进行显示以及隐藏。</div>
                <div className='secondLevelTitle'>2、标注结果处理</div>
                <div className='content'>  (1)点击点云图像左上角按钮操作栏可打开屏幕右侧弹窗。</div>
                <div className='content'>(2)审核意见需选择当前已被分配点云点位的标签进行操作，选择错误类型，填写审批意见后选择添加审批意见，填写有错误或漏填，点击添加后输入框下方会有相应提示。</div>
                <div className='content'>(3)可在审批意见栏中看到当前任务所对应审批意见。</div>
                <div className='content'>(4)最下方包括上下条以及暂存、提交按钮，提交后切换下一条，屏幕上方会有操作成功消息提示。</div>
                <div className='firstLevelTitle'>B、软件介绍</div>
                <div className='secondLevelTitle'>1、最上方工具栏</div>
                <div className='thirdLevelTitle'> (1)标注选择器</div>
                <div className='content'>该部分共分为三种标注套索工具，无序、圆形以及矩形，细节不再赘述，为鼠标左键范围圈定框形状。</div>
                <div className='thirdLevelTitle'>(2)选择模式</div>
                <div className='content'>在标注时，会有一些点被意外的框选进来，我们需要对其删除。这里提供了三种选择模式：</div>
                <div className='fourthLevelTitle'>①Y：该模式下画框只能选择点云(点云变为红色)</div>
                <div className='fourthLevelTitle'>②U：该模式下画框，对已经选择上的点云会删除(点云变为白色)，对未选择上的点云会选择上(点云变为红色)。</div>
                <div className='fourthLevelTitle'>③I：该模式下画框只能删除以选择的点云(点云变为白色)</div>
                <div className='thirdLevelTitle'>(3)视图交互方式</div>
                <div className='content'>此部分主要为鼠标圈定范围框后，点云图像展示变化。</div>
                <div className='fourthLevelTitle'>①自动聚焦(Q)：开启自动聚焦后，左键圈定范围后，视角自动聚焦于范围框中心，且此时摄像机机位的旋转、平移也同样为该中心。此功能也可通过按住Ctrl，鼠标右键点击想要标注的点云区域实现聚焦。</div>
                <div className='fourthLevelTitle'>②自动过滤(L) ：开启自动过滤后，左键圈定范围，图像只会显示被圈定范围部分点位，其余点位隐藏。</div>
                <div className='thirdLevelTitle'>(4)视图助手</div>
                <div className='content'>①标注选择器轮廓(V)：是否显示范围框边框，鼠标左键抬起后范围框会按照具体点位收缩。</div>
                <div className='fourthLevelTitle'>②边界框(G)：是否显示点云图像边框。</div>
                <div className='secondLevelTitle'>2、右侧工具栏</div>
                <div className='thirdLevelTitle'>(1)机位调整</div>
                <div className='content'>主要包括正视角(X)、摄像机视角(C)、正面视角(F)、后视角(B)、左视角(L)、右视角(R)、顶部视角(T)。点击对应按钮切换摄像机机位，此时的视角中心为点云图像中心。</div>
                <div className='thirdLevelTitle'>(2)点云显示</div>
                <div className='fourthLevelTitle'>①距离衰减：是否按照点云点位离摄像机远近显示大小。</div>
                <div className='secondLevelTitle'>3、最下方菜单</div>
                <div className='thirdLevelTitle'>(1)实例</div>
                <div className='content'>该部分显示标签可在模板中定制。</div>
                <div className='thirdLevelTitle'>(2)点云点信息</div>
                <div className='content'> 鼠标悬停在图像具体点位时会显示该点位所属标签以及对应x、y、z标签。</div>
            </div>
        );
    }

    render() {
        return (
            <Drawer title={i18n.gettext("Help Center")}
                    placement="right"
                    className="helpCenterDrawer"
                    onClose={e => this.props.toggleHelpCenterDraVisible()}
                    visible={this.props.visible}
                    destroyOnClose={true}
                    width={650}>
                {this.renderContent()}
            </Drawer>
        );
    }
}