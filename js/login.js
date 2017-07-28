//为了防止其他的插件与jquery重名 可以通过noConflict找到jquery对象重新更改jquery的符号
var $=jQuery.noConflict();
(function(){
	function Login(success){
		this.showLogin(success);
	};
	Login.prototype.showLogin=function(success){
		var loginContainer=$("<div class='loginContainer'></div>");
		var closeButton=$("<p>关闭</p>");
		var usernameInput=$("<p><input type='text' placeholder='用户名'></p>");
		var posswordInput=$("<p><input type='password' placeholder='密码'></p>");
		var loginButton=$("<p><button>登录</button></p>");
		loginContainer.append(closeButton);
		loginContainer.append(usernameInput);
		loginContainer.append(posswordInput);
		loginContainer.append(loginButton);
		$(document.body).append(loginContainer);
		loginContainer.css({
			width:"400px",
			height:"300px",
			"background-color":"skyblue",
			border:"5px solid pink",
			position:"absolute",
			top:"50%",
			left:"50%",
//			"margin-top":"-150px",
//			"margin-left":"-200px"
			"box-sizing":"border-box",
			 margin:"-150px -200px"
		});
		closeButton.css({
			float:"right",
			color:"white",
			padding:"5px"
		});
		closeButton.click(function(){
			loginContainer.slideUp(500,"swing",function(){
				loginContainer.remove();
			});
		});
		var inputCSS={
			padding:"20px 0",
			width:"300px",
			margin:"0 auto",
			"text-align":"center"
		};
		usernameInput.css(inputCSS);
		posswordInput.css(inputCSS);
		loginButton.css(inputCSS);
		loginButton.click(function(){
			$.post(PRODUCT_HOST+LOGIN,{status:"login",username:usernameInput.children().val(),password:posswordInput.children().val()},function(data){
					console.log(data);
					//登录成功
					if(data.code==0){
						loginContainer.slideUp(500,function(){
							loginContainer.remove();
							//执行外面传入方法
							success(data.data);
						});
					}else{
						alert(data.Message);
					};
			});
		});
	};
	window.Login=Login;
})();
