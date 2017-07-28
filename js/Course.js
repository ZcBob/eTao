/**
 * Created by liuyujing on 2017/7/18.
 */
window.corouselView = window.corouselView||{};

(function () {

    /*
     * 创建轮播图
     * _datas:图片数据的数组
     * 必须{imagePath:"",toUrl:""}的数据格式
     * */
    function Corouse(_superView,_datas,_width,_height) {
        this.width = _width;
        this.height = _height;
        this.datas = _datas;
        this.views = [];
        this.backgroundView = $(_superView);
        this.pageIndex = 0;
        this.timer = null;
    }

    /*
     * 创建单个视图
     * imagePath:图片路径
     * toUrl:要跳转的URL
     * */
    Corouse.prototype.createSingleView = function (imagePath,toUrl) {
        var backgroundImageView = $("<a class='imageView' href='#'></a>");

        backgroundImageView.css({display: "block",width:this.width+"px",height:this.height+"px",background:"url("+imagePath+")","background-position":"50% 50%","background-size":"cover","background-repeat":"no-repeat"});
        return backgroundImageView;
    };

    /*
     * 获得盛放单一视图元素的数组
     * */
    Corouse.prototype.getSingleViews = function () {
        //判断是否传入了图片的数据
        if (this.datas&&this.datas.length!=0){
            if (this.views.length===0){
                for (var i=0;i<this.datas.length;i++){
                    var info = this.datas[i];
                    this.views.push(this.createSingleView(info.imagePath,info.toUrl));
                }
                return this.views;
            }else {
                return this.views;
            }
        }else {
            return [];
        }
    };

    /*
     * 显示第一个初始页面
     * */
    Corouse.prototype.showFirstPage = function (pageNum) {
        if (pageNum<this.datas.length){
            this.backgroundView.append(this.getSingleViews()[pageNum]);
        }else {
            console.log("超过总共的页数了~");
        }
    };

    /*
     * 创建控制上一页 下一页的按钮
     * */
    Corouse.prototype.createControlButton = function () {
        var preButton = $("<div class='preButton'><</div>");
        var nextButton = $("<div class='nextButton'>></div>");
        preButton.css({
            position: "absolute",
            left:"0",
            top:"50%",
            color:"white",
            "text-shadow": "2px 2px 5px #002242",
            "font-size":"30px"
        });
        nextButton.css({
            position: "absolute",
            right:"0",
            top:"50%",
            color:"white",
            "text-shadow": "2px 2px 5px #002242",
            "font-size":"30px"
        });
        this.backgroundView.append(preButton);
        this.backgroundView.append(nextButton);

        var self = this;
        preButton.click(function () {
            self.prePage();
        });
        nextButton.click(function () {
            self.nextPage();
        });
        return this;
    };

    Corouse.prototype.nextPage = function () {
        this.pageIndex++;
        this.pageIndex = this.pageIndex==this.datas.length?0:this.pageIndex;
        this.updataPage();
    };

    Corouse.prototype.prePage = function () {
        this.pageIndex--;
        this.pageIndex = this.pageIndex==-1?this.datas.length-1:this.pageIndex;
        this.updataPage();
    };

    /*
     * 更新切换后的界面
     * */
    Corouse.prototype.updataPage = function () {
        var lastPage = $("#"+this.backgroundView.attr("id")+" .imageView");
//      console.log(lastPage);
        lastPage.remove();
        this.backgroundView.append(this.getSingleViews()[this.pageIndex]);
    };

    /*
     * 开启定时器
     * */
    Corouse.prototype.startTimer = function (delay,callback) {
        if (this.timer){
            clearInterval(this.timer);
        }
        var self = this;
        this.timer = setInterval(function () {
        	if(callback){
        		callback();
        	}
            self.nextPage();
        },delay);
        return this;
    };

    /*
     * 停止定时器
     * */
    Corouse.prototype.stopTimer = function () {
        if (this.timer){
            clearInterval(this.timer);
        }
    };

    /*
     * 创建轮播图界面
     * 返回创建好的整个界面
     * */
    Corouse.prototype.createCarouselView = function () {
        //显示第一个页面
        this.showFirstPage(0);
        //显示添加控制按钮
        // this.createControlButton();
    };

    /*
     * putSuperView:把轮播图添加到父视图
     * superView:父视图
     * */
    Corouse.prototype.putSuperView = function () {
        this.backgroundView.css({position:"relative",overflow:"hidden"});
        this.createCarouselView();
        return this;
    };

    corouselView.Corouse = Corouse;
})();