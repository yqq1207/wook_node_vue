<template>
	<div id="message"  class="mt40">
		
		<router-link to="/messageContent">{{msg}}</router-link>
		
	</div>
</template>

<script>
	export default{
		name:"message",
		data(){
			return {
				msg:"这是message"
			}
		},
		
	}
</script>

<style>
</style>