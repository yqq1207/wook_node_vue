
//引入toast
import { Toast } from 'mint-ui'

//手机号正则
function checkMobile(sMobile){
 	if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(sMobile))){ 
	 
	 	return false
	 	
	 } else{
	 	return true
	 }
 }
function toast(text,secondsNum){
	Toast({
	  message: text,
	  duration: secondsNum
	});
}
export default{
	checkMobile:checkMobile,
	toast:toast,
}
