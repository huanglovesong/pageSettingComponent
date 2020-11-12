import React from 'react';
import { NoticeBar, WhiteSpace, Icon } from 'antd-mobile';
import './less/notice.less';
class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeArr: []
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
  render() {
    const { item } = this.props;
    let pagePadding = item.modelStyle.noticeStyleModel.pageMargin;
    let bgcolor = item.modelStyle.noticeStyleModel.background;
    let textColor = item.modelStyle.noticeStyleModel.textColor;
    let textDataLong = item.moduleDataList[0].textDataLong;
    const style1 = {
      paddingLeft: `${pagePadding / 50}rem`, paddingRight: `${pagePadding / 50}rem`,
      color: textColor
    };
    return (
      <div className="notice-box" style={{ ...style1 }}>
        <div className="marquee-content" ref="marqueeContentId" onClick={this.clickNotice}>
          <div className="notice-bar-icon">
            {textDataLong ? <img src={textDataLong} /> : <Icon type="voice" />}
          </div>
          <div ref="scroll_div" className="scroll_div" style={{ width: `${(750 - pagePadding * 4 - 50) / 100}rem` }}>
            <div ref="scroll_begin"  className="scroll_begin">
              {this.setMarquee().map(item => <span class="pad_right">{item}</span>)}
            </div>
            <div ref="scroll_end"  className="scroll_end"></div>
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
