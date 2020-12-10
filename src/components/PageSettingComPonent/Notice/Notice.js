import React from 'react';
import { NoticeBar, WhiteSpace, Icon } from 'antd-mobile';
import './less/notice.less';
class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeArr: [],
      showDeleteIcon: true,
    };
  }
  componentDidMount() {
    const { item } = this.props;
    let bgcolor = item.modelStyle.noticeStyleModel.background;
    this.refs.scroll_div.style.background = bgcolor;
    this.refs.marqueeContentId.style.background = bgcolor;
    this.scrollImgLeft();
  }
  //文字横向滚动
  scrollImgLeft = () => {
    var speed = 50;
    var MyMar = null;
    var scroll_begin = this.refs.scroll_begin;
    var scroll_end = this.refs.scroll_end;
    var scroll_div = this.refs.scroll_div;
    scroll_end.innerHTML = scroll_begin.innerHTML;
    function Marquee() {
      if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
        scroll_div.scrollLeft -= scroll_begin.offsetWidth;
      else
        scroll_div.scrollLeft++;
    }
    MyMar = setInterval(Marquee, speed);
    scroll_div.onmouseover = function () {
      clearInterval(MyMar);
    }
    scroll_div.onmouseout = function () {
      MyMar = setInterval(Marquee, speed);
    }
  }
  setMarquee = () => {
    const { item } = this.props;
    let arr = [];
    if (item.moduleDataList.length) {
      arr = [item.moduleDataList[0].textData,
      item.moduleDataList[0].textData,
      item.moduleDataList[0].textData,
      item.moduleDataList[0].textData,
      item.moduleDataList[0].textData,
      ];
    }

    return arr;
  }
  clickNotice = (e) => {
    e.preventDefault();
    e.stopPropagation()
  }
  deleteInfo = () => {
    this.setState({
      showDeleteIcon: false
    })
  }
  toUrl = (linkurl) => {
    linkurl && (window.location.href = linkurl);
  }
  render() {
    const { item } = this.props;
    let pagePadding = item.modelStyle.noticeStyleModel.pageMargin;
    const { textColor, bottomMargin, topMargin, jumpStyle } = item.modelStyle.noticeStyleModel;
    const { textDataLong, linkurl } = item.moduleDataList[0];
    const style1 = {
      paddingLeft: `${pagePadding / 50}rem`, paddingRight: `${pagePadding / 50}rem`,
      color: textColor, // 兼容之前的和现在的数据。由于新增了topMargin和bottomMargin，所以进行兼容
      paddingTop: `${(topMargin === null ? 5 : topMargin) / 50}rem`, paddingBottom: `${(bottomMargin === null ? 5 : bottomMargin) / 50}rem`
    };
    const { showDeleteIcon } = this.state;
    if (!showDeleteIcon) {
      return '';
    }
    return (
      <div className="notice-box clearfix" style={{ ...style1 }}>
        <div className="marquee-content" ref="marqueeContentId" onClick={this.clickNotice}>
          <div className="notice-bar-icon">
            {textDataLong ? <img src={textDataLong} /> :
              <img src={require('../imgs/tips.png')} />}
            {/*右箭头*/}
            {jumpStyle === 'rightIco' && <Icon type="right" className="tips-icon right-ico"
              style={{ position: 'absolute', right: `18px` }} onClick={() => this.toUrl(linkurl)} />}
            {/*右关闭*/}
            {jumpStyle === 'closeIco' &&
              <img src={require('../imgs/close.png')} style={{ position: 'absolute', right: `18px`, cursor: 'pointer' }}
                onClick={this.deleteInfo} />
            }
          </div>
          <div ref="scroll_div" className="scroll_div" style={{ width: `6.5rem` }}>
            <div ref="scroll_begin" className="scroll_begin">
              {this.setMarquee().map(item => <span class="pad_right">{item}</span>)}
            </div>
            <div ref="scroll_end" className="scroll_end"></div>
          </div>
        </div>
        {/* <NoticeBar marqueeProps={{ loop: true, leading: 1000, trailing: 2000, style: { color: textColor, background: bgcolor } }} >
          {`${item.moduleDataList[0].textData}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </NoticeBar> */}
      </div>
    );
  }
}

export default Notice;
