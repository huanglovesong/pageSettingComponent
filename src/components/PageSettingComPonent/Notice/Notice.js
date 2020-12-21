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
    const { textColor, bottomMargin, topMargin, jumpStyle, pageMargin } = item.modelStyle.noticeStyleModel;
    const { textDataLong, linkurl } = item.moduleDataList[0];
    const style1 = {
      paddingLeft: `${pageMargin / 50}rem`, paddingRight: `${pageMargin / 50}rem`,
      color: textColor, // 兼容之前的和现在的数据。由于新增了topMargin和bottomMargin，所以进行兼容
      paddingTop: `${(topMargin === null ? 5 : topMargin) / 50}rem`, paddingBottom: `${(bottomMargin === null ? 5 : bottomMargin) / 50}rem`
    };
    const { showDeleteIcon } = this.state;
    if (!showDeleteIcon) {
      return '';
    }
    return (
      <div className="notice-box clearfix" style={{ ...style1 }}>
        <div className="marquee-content" ref="marqueeContentId" onClick={this.clickNotice}
          style={{ paddingRight: (jumpStyle === 'rightIco' || jumpStyle === 'closeIco') ? '1rem' : '' }}>
          <div className="notice-bar-icon">
            {textDataLong ? <img src={textDataLong} /> :
              <img src={require('../imgs/tips.png')} />}
            {/*右箭头*/}
            {jumpStyle === 'rightIco' &&
              <img src={require('../imgs/arrow.png')} style={{ position: 'absolute', right: `${(pageMargin + 10) / 50}rem`, cursor: 'pointer' }} />
            }
            {/*右关闭*/}
            {jumpStyle === 'closeIco' &&
              <img src={require('../imgs/close.png')} style={{ position: 'absolute', right: `${(pageMargin + 10) / 50}rem`, cursor: 'pointer' }}
                onClick={this.deleteInfo} />
            }
          </div>
          <div ref="scroll_div" className="scroll_div" style={{
            width: `${(jumpStyle === 'rightIco' || jumpStyle === 'closeIco')
              ? (275 - pageMargin * 2) / 50 : (325 - pageMargin * 2) / 50}rem`
          }}>
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
