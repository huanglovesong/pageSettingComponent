import React from 'react';
import Header from '../Header';
import './less/mycoupons.less';

class Discription extends React.Component {

    render() {
        return (
            <div className="disc-bg">
                <Header
                    {...this.props}
                    jump={() => this.props.history.push('/')}
                />
                <article>
                    1、  优惠券不设找零，不可兑换现金不可提现。<br />
                    2、  优惠券一旦成功使用不再返还。<br />
                    3、  优惠券过期作废。<br />
                    4、  优惠券抵扣金额不可开具发票。<br />
                    5、  武汉福禄网络科技有限公司在法律范围内保留对优惠券的最终解释权。<br />
                    6、  如有问题请咨询客服电话 400-001-2806<br />
                </article>
            </div>
        )
    }
}

export default Discription;

