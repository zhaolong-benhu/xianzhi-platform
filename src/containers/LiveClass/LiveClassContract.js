/**
 * Created by qzy on 2016/11/25.
 * File description:主播公约
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {Link} from 'react-router'
import Helmet from 'react-helmet';
import {Header} from 'components'
const styles = require('./LiveClassContract.scss')
export default class LiveClassContract extends Component {
  static propTypes = {};
  static defaultProps = {
    describe:"为将先之云课堂直播建设成为一个健康、和谐的直播社区，给广大先之云课堂直播用户提 供一个绿色的观看平台，特制定本准则。",
    describe2:"严禁制作、复制、发布、传播《中华人民共和国宪法》和《全国人大常委会关于维护互联网安全的决定》、《互联网信息服务管理办法》所明文禁止的信息以及其它法律法 规明文禁止传播的各类信息，例如：",
    describe3:"本准则最终解释权归先之云课堂直播平台所有，先之云课堂直播平台有权对本办法进行 修改并公示。",
    describe4:"本准则自公布之日起生效。",

    twig1:"第一条	主播的行为规范",
    twig2:"第二条	主播直播内容规范 ",
    twig3:"第三条",
    twig4:"第四条",

    treatycontents1:"(一)主播的言行应严格遵守以下七条底线：",
    treatycontents2:"(1)违反法律法规底线的；",
    treatycontents3:"(2)违反社会主义制度底线的；",
    treatycontents4:"(3)违反国家利益底线的；",
    treatycontents5:"(4)违反公民合法权益底线的；",
    treatycontents6:"(5)违反社会公共秩序底线的；",
    treatycontents7:"(6)违反道德风尚底线的；",
    treatycontents8:"(7)违反信息真实性底线的。",
    treatycontents9:"(二)禁止主播以任何形式在直播间发送广告信息，一经发现将会直接对其处理，具 体违规情况包括不限于以下行为：",
    treatycontents10:"(1)发送宣传色情网站、成人用品网站等色情、低俗内容；",
    treatycontents11:"(2)发送组织、宣传网络兼职内容；",
    treatycontents12:"(3)宣传赌博类、枪支、非法集会、谣言等国家法律法规禁止内容；",
    treatycontents13:"(4)广告形式宣传其他平台。",
    treatycontents14:"(三)主播应遵守协议规定，确保直播时间及次数并保证直播质量；",
    treatycontents15:"(四)一经安排直播后，如有特殊情况无法直播，必须提前两天以上通知平台工作人 员；",
    treatycontents16:"(五)主播直播时的行为须符合相关法律法规的规定；",
    treatycontents17:"(六)主播在直播间上镜时，须文明着装，所穿衣服应为日常公众场合能穿出去的、 大众能接受的衣服。",
    treatycontents18:"(1) 反对宪法所确定的基本原则的；",
    treatycontents19:"(2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；",
    treatycontents20:"(3) 损害国家荣誉和利益的；",
    treatycontents21:"(4) 煽动民族仇恨、民族歧视，破坏民族团结的；",
    treatycontents22:"(5) 破坏国家宗教政策，宣扬邪教和封建迷信的；",
    treatycontents23:"(6) 散布谣言，扰乱社会秩序，破坏社会稳定的；",
    treatycontents24:"(7) 散布淫秽、色情、 赌博、暴力、凶杀、恐怖或教唆犯罪的；",
    treatycontents25:"(8) 侮辱或者诽谤他人，侵害他人合法权益的；",
    treatycontents26:"(9) 含有法律、行政法规禁止的其它内容的。",
  };

  render() {
    return (
      <div>
        <Helmet title="主播公约"/>
        <Header title="主播公约" type="true" />
        <div className={styles.container}>
           <div className={styles.describe}>{this.props.describe}</div>
           <div className={styles.twig}>{this.props.twig1}</div>
           <div className={styles.content2}>{this.props.treatycontents1}</div>
           <div className={styles.content}>{this.props.treatycontents2}</div>
           <div className={styles.content}>{this.props.treatycontents3}</div>
           <div className={styles.content}>{this.props.treatycontents4}</div>
           <div className={styles.content}>{this.props.treatycontents5}</div>
           <div className={styles.content}>{this.props.treatycontents6}</div>
           <div className={styles.content}>{this.props.treatycontents7}</div>
           <div className={styles.content2}>{this.props.treatycontents8}</div>
           <div className={styles.content2}>{this.props.treatycontents9}</div>
           <div className={styles.content}>{this.props.treatycontents10}</div>
           <div className={styles.content}>{this.props.treatycontents11}</div>
           <div className={styles.content}>{this.props.treatycontents12}</div>
           <div className={styles.content2}>{this.props.treatycontents13}</div>
           <div className={styles.content2}>{this.props.treatycontents14}</div>
           <div className={styles.content2}>{this.props.treatycontents15}</div>
           <div className={styles.content2}>{this.props.treatycontents16}</div>
           <div className={styles.content2}>{this.props.treatycontents17}</div>

           <div className={styles.twig}>{this.props.twig2}</div>
           <div className={styles.describe}>{this.props.describe2}</div>
           <div className={styles.content}>{this.props.treatycontents18}</div>
           <div className={styles.content}>{this.props.treatycontents19}</div>
           <div className={styles.content}>{this.props.treatycontents20}</div>
           <div className={styles.content}>{this.props.treatycontents21}</div>
           <div className={styles.content}>{this.props.treatycontents22}</div>
           <div className={styles.content}>{this.props.treatycontents23}</div>
           <div className={styles.content}>{this.props.treatycontents24}</div>
           <div className={styles.content}>{this.props.treatycontents25}</div>
           <div className={styles.content}>{this.props.treatycontents26}</div>

           <div className={styles.twig}>{this.props.twig3}</div>
           <div className={styles.describe}>{this.props.describe3}</div>

           <div className={styles.twig}>{this.props.twig4}</div>
           <div className={styles.describe}>{this.props.describe4}</div>

        </div>
      </div>
    );
  }
}
