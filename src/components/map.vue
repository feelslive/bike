<template>
  <div class="map" id="container">
    
  </div>
</template>

<script>
import bikelogo from "../assets/bike.jpg"
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  methods:{
    addMarker:function(map, point,data){  // 创建图标对象   
      var myIcon = new BMap.Icon(bikelogo, new BMap.Size(46, 50), {        
         anchor: new BMap.Size(10, 25),  
       });
       var _this = this;      
      // 创建标注对象并添加到地图   
       var marker = new BMap.Marker(point, {icon: myIcon});    
       map.addOverlay(marker);
       marker.addEventListener("click",function(){
        console.log("点击了")
        _this.$router.push({name:"detail",params:data})
       })    
    }    
  },
  mounted() {
    // 创建地图实例
    var map = new BMap.Map("container"); 
    // 创建点坐标 
    var point = new BMap.Point(116.404, 39.915);    
    /*定位*/
    var _this = this;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //alert('您的位置：'+r.point.lng+','+r.point.lat);
        var point = new BMap.Point(r.point.lng, r.point.lat); 
      }
      else {
        alert('failed'+this.getStatus());
      }
      // 初始化地图，设置中心点坐标和地图级别 
      map.centerAndZoom(point, 15); 

          //取数据

      fetch(`/api/broken-bikes?lat=${r.point.lat}&lng=${r.point.lng}`).then((res)=>{
            return res.json();
      }).then((json)=>{
        for(let i=0;i<json.length;i++){
          let point = new BMap.Point(json[i].lng,json[i].lat);
          _this.addMarker(map,point,json[i])
        }
      })
       //_this.addMarker(map,point)
    },{enableHighAccuracy: true})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #container{
    height: 100%;
  }
  .BMap_Marker div{
    border-radius: 50%;
  }
  .BMap_Marker img {
    width: 100%;
  }
</style>
