angular.module("myApp",["ngRoute"])
	//修改一下

	//第二次又来修改

	//第三次的修改
	.config(["$routeProvider","$locationProvider",function ($routeProvider,$locationProvider) {
		$routeProvider.when("/home",{
			templateUrl:"home.html",
			controller:"homeController",
			resolve:{
				//该对象的所有方法和属性都可以注入到控制器中
				//该对象属性对应的值 必须是服务名
				//函数中的参数必须是服务名
				xxx:"callBoy",
				getDataFromJson:function(GetData){
					return GetData
				}
			},
			//如果值为true，每次查询参数发生改变都会引起路由的变化
			//如果值为false，查询参数发生变化不会引起路由变化
			reloadOnSearch: false
		});

		//添加hash前缀
		$locationProvider.hashPrefix("!");

		$routeProvider.when("/user/:name/:password",{
			templateUrl:"user.html",
			controller:"userController",
			//redirect 重定向
			//重新指向，会触发路由重新指向一个新的地址
			//redirectTo:"/user/a/b"
			redirectTo: function(a,b,c){
				//参数1:代表一个对象，对象里面的属性都是路由参数
				//参数2：路由的路径
				//参数3：查询串对象
				console.log(a);
				console.log(b);
				console.log(c);
				return "http://www.baidu.com";
			}
		})
		$routeProvider.otherwise("/home");
	}])
	.controller("myController",function($scope){
		$scope.name = "zhangsan";
	})
	.controller("homeController",function($scope,$location,xxx,getDataFromJson){
		$scope.name = "lisi";
		$scope.userAction = function(){
//			$location.path("/user");
			console.log("开始跳转");
			$location.search("miama=111");
			// $location.path("/user/张三/123456");
		}
		
		
		console.log(xxx);
		
		var num = Math.floor(Math.random()*101);
		$scope.queryFn= function(){
			$location.search("num=" + num);	
		};
		
		
//		getDataFromJson.success(function(res){
//			console.log(res);
//		});
		console.log(getDataFromJson.data);
	}).controller("userController",function ($scope,$location) {
		$scope.fan = function(){
			$location.path("/home");
		}
		
	})
	.factory('callBoy',function(){
		return "aaaaaaaa";
	})
	.factory("GetData",function($http){
		return $http({
			method:"get",
			url:"wy.json"
		});
	});