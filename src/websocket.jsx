import React from 'react';
import SockJsClient from 'react-stomp';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class Websocket extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      topics:""
    }
  }
  format =(format)=> {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
}
 
  sendMessage = () => {
    if (e != null) {
      const startTime1 = new Date(e[0]._d); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
      const endTime1 = new Date(e[1]._d);
      
      const startTime=startTime1.format("yyyy-MM-dd-hh")
      const endTime=endTime1.format("yyyy-MM-dd-hh")

      console.log(startTime+" "+endTime);

      const id=215
      this.setState({ topics:`/${startTime}/${endTime}/${id}` })
      this.clientRef.sendMessage('/hello', {
        startTime:startTime,
        endTime:endTime,
        parkingLotId:id
      });  //@注解1
    }else{
      console.log("什么都没有");
    }
  }
 
  render() {
    return (
      <div>
             <SockJsClient url='http://localhost:8080/endpoint' topics={[this.state.topics]}
                onMessage={(msg) => { alert(msg); }}
                ref={(client) => { this.clientRef = client }} />
            <RangePicker
              showTime
              onChange={this.sendMessage}
              format="YYYY年MM月DD日 小时:HH"
            />
            <button onClick={this.sendMessage}></button>
      </div>
    );
  }
}
export default Websocket ;