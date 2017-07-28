(function(){
	function GoodItem(obj) {
        this.des = obj;
        var space = 20;
        var colume = 5;
        var width = (1200-space*(colume-1))/colume;
        this.item = $("<div class='good-box' data-id='"+obj.goods_id+"'></div>");
        var name = $("<p class='good-name'>"+obj.goods_name+"</p>");
        var other = $("<p><img width='"+width+"px' src='"+obj.goods_thumb
                    +"' alt=''></p><h3 class='goods-price'>￥"+obj.price+"</h3><p class='goods-desc'>"+obj.goods_desc
                    +"</p>");
        this.item.append(name);
        this.item.append(other);
        this.item.css({
            width:width+"px",
            height:"384px",
            border:"2px #ff4411 solid",
            "box-sizing": "border-box",
            float:"left",
            overflow: "hidden",
            position: "relative",
            "margin-left":"13px",
            "margin-top":"13px"
        });
        name.css({
            position: "absolute",
            height: "20px",
            "line-height": "20px",
            display: "none"
        });
        this.item.hover(function () {
            $(this).children().css("display","block");
        },function () {
            $(".good-name").css("display","none");
        });
    }
	GoodItem.prototype.click=function(callback){
		this.item.on("click",this,callback);
		return this;
	}
	function Good(url,parm,superView,action){
		this.loadData(url,parm,superView,action);
		this.goodDetail(url);
	};
	Good.prototype.loadData=function(url,parm,superView,action){
		$.get(url,parm,function(result){
			if(result.code==0){
				this.showGoodsView(result.data,superView,action)
			}
		}.bind(this));
	};
	Good.prototype.showGoodsView=function(Goods,superView,action){
		Goods.forEach(function(data){
		    // console.log(data)
			superView.append(new GoodItem(data).click(action).item);
		});
	};
	//商品详情
    Good.prototype.goodDetail = function (url) {
        $(document).on('click','.good-box',function () {
            var detId=$(this).data("id");
            // console.log(detId);
            $.get(url,{goods_id:detId},function(result){
                // console.log(result.data);
                var obj = '';
                if (result.data.length==2 || result.data.length==1){
                    obj = result.data[0];
                }
                // var detailes=$("<div><p>商品详情</p><img src='"+obj.goods_thumb+"'></div>");
                var details = `
                    <p class="container-header">商品详情</p>
                    <hr/>
                    <div class="container-body"><img class="header-photo" src="${obj.goods_thumb}"></div>
                    <div class="container-head">
                       <p><big>${obj.goods_name}</big></p>
                       <h3>￥${obj.price}</h3>
                       <p>${obj.goods_desc}</p>
                       <div class="header-box"><button class="header-box-one">-</button><input class="header-box-num" type="text" value="1"></input><button class="header-box-two">+</button></div>
                       <div class="body-box"><button>立即购买</button><button class="body-box-join">加入购物车</button><div>
                    </div>
                    <br/><hr/>`;
                $(".goods-container").html(details);
                $(".header-box-one").click(function(){
                	this.nextSibling.value<=1?1:this.nextSibling.value--;
                });
                $(".header-box-two").click(function(){
                	this.previousSibling.value++;
                });
            });
        });
    }
	window.Good=Good;
})();
