<template>
	<div class="detail">
		<h2>车辆编号：{{$route.params.id}}</h2>
		<h2>故障信息：{{$route.params.detail}}</h2>
		<mt-checklist
		  title=""
		  v-model="method"
		  :value.sync="method"
		  :options="['更换二维码', '更换轮胎', '更换其他配件']">
		</mt-checklist>
		<mt-button type="primary" @click="repair" size="large">维修完成</mt-button>
		<mt-button type="default" @click="back" size="large">返回</mt-button>
	</div>
</template>

<script >
	export default {
		data(){
			return {
				method:[]
			}
		},
		methods:{
			repair() {
				let id = this.$route.params.id;
				let method = this.method;
				console.log(method)
				fetch(`/api/repair?id=${id}&method=${method}`).then((res)=>{
						return res.json()
				}).then((json)=>{
					console.log(json)
					if(json.message){
						alert(json.message)
					}
				})
			},
			back(){
				this.$router.push({path:"/"});
			}
		}
	}
</script>

<style>
    .mint-button--large{
		width: 90%;
		margin: 10px auto 0 auto;
    }
    .mint-checklist {
    	width: 90%;
    	margin: 10px auto 0 auto;
    	text-align: left;
    }
    .detail h2{
		text-align: left;
		margin: 5px 0;
		font-size: 22px;
		padding: 0 0 0 5%;
    }
    .detail {
    	background:url('../assets/bikebg.jpg') no-repeat top;
    }
</style>