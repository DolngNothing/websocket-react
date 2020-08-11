import  React,{Component} from 'react';
import BMap from 'BMap'
import './App.css'

 class AddressUi extends Component{ 
    constructor(props){
        super(props);
        this.state={};
    }

    initialize() {  
        console.log("!1111111111")
        var mp = new BMap.Map('map');  
        mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);  
    }  

    componentDidMount(){
        
        var map = new BMap.Map("address"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom();
        
        var options = {
            onSearchComplete: function(results){
                // 判断状态是否正确
                if (local.getStatus() == 0){
                    var s = [];
                    for (var i = 0; i < results.getCurrentNumPois(); i ++){
                        console.log(results.getPoi(i))
                        s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                    }
                }
            }
        };
        var local = new BMap.LocalSearch(map, options);
        local.search("公园");
    }

    render() {
        return(
            <div className="address" id="address" style={{width:1000,height:1000}}></div>
        )
    }
    
}
export default AddressUi