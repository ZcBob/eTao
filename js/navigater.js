var $=jQuery.noConflict();
(function(){
	//现在导航上面的每一个按钮
	function NavigaterItem(obj){
		var obj=obj||{};
		this.name=obj.cat_name;
		this.id=obj.cat_id;
		this.item=$("<li>"+this.name+"</li>");
	}
	//itemclick—>NavigaterItem 上面的itemclick
	NavigaterItem.prototype.itemclick=function(callback){
		//click—>是 this.item调用的 是jquery对象里面的click
		this.item.on("click",this,callback);
		return this;
	};
	new NavigaterItem().itemclick(function(){
		
	});
	function Navigater(){
		
	};
	//点击导航按钮的时候 需要知道点击按钮的商品类型
	Navigater.prototype.createView=function(url,superView,callback){
		$.get(url,function(result){
			console.log(result);
			if(result.code==0){
				result.data.forEach(function(obj){
					//创建导航列表
					superView.append(new NavigaterItem(obj).itemclick(callback).item);
				});
			}
		});
		return this;
	};
	window.Navigater=Navigater;
})();
