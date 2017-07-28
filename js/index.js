function init(){
	$(".header-top-login").click(function(){
		new Login(function(user){
			$(".header-top-menu ul li:first-child").html("<a href='#'>"+user.username+"</a>");	
		});
	});
//导航
 new Navigater().createView(PRODUCT_HOST+PRODUCT_TYPE,$(".main-nav-container"),function(event){
 	 console.log(event);
 });
 //轮播
new corouselView.Corouse("#left-course",[{imagePath:"img/header/hot1.jpg"},{imagePath:"img/header/hot2.jpg"}],200,400).putSuperView().createControlButton().startTimer(2*1000);
new corouselView.Corouse("#center-course",[{imagePath:"img/header/photomax1.jpg"},{imagePath:"img/header/photomax2.jpg"}],800,400).putSuperView().startTimer(3000,function(){
	var r=parseInt(Math.random()*256);
	var g=parseInt(Math.random()*256);
	var b=parseInt(Math.random()*256);
	$(".main-course").css("background-color","rgb("+r+","+g+","+b+")");
});
	
new corouselView.Corouse("#right-course",[{imagePath:"img/header/hot2.jpg"},{imagePath:"img/header/hot1.jpg"}],200,400).putSuperView().createControlButton().startTimer(2*1000);
//商品列表
new Good(PRODUCT_HOST+GOODS,null,$(".goods-container"),function(event){
	console.log(event.data);
});
}

init();