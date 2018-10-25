$(function(){
	
	var c = [
		{name: "a1", pinyin: 'wang'}, 
		{name: "a5", pinyin: 'wang'},
		{name: 'a4', pinyin: 'wang'},
		{name: 'b1', pinyin: 'bang'},
		{name: 'b2', pinyin: 'bang'},
	]

	function format(arr){
		//将数组分类  将线性数组转换为对象
		var obj = {};
		$.each(arr, function(i, v){
			key = v.pinyin.charAt(0).toUpperCase();
//			var key = v.name.charAt(0);
			if( !obj[key] ){
				obj[key] = [];
				obj[key].push(v);
			}else{
				obj[key].push(v);
			}
		})
		return obj;
	}
	function render(arr){
		$('.contact dl').empty();
		var result = format(arr);
		compositor = Object.keys(result).sort();//sort()根据字符编码顺序对字母进行排序
//		compositor.forEach(function(v, i){
//			$('<dt>'+ v +'</dt>').appendTo('.contact dl');
//			$.each(result[v], function(i, v){
//				$('<dd>'+ v.name +'</dd>').appendTo('.contact dl');
//			})
//		})
		for(var letter in compositor){
			//letter---> 首字母
			$('<dt>'+ compositor[letter] +'</dt>').appendTo('.contact dl');
			$('<div class="letter">'+ compositor[letter] +'</div>').appendTo('#letter-box');
			$.each(result[compositor[letter]], function(i, v){
				$('<dd><a href="tel:'+ v.phone +'"></a>'+ v.name +'</dd>').appendTo('.contact dl');
			})
		}
		$('#letter-box').css('height', $('.letter').height() * compositor.length)
		$('dt').prev().css('border', 'none');
		$.each($('dt'), function(i, v){
			table.push($(this).offset().top);
		})
	}
	var search;
	var table = [];
	var compositor = [];
	console.log(table)
	$.ajax({
		type:"get",
		url:"/user",
		async:true,
		success: function(result){
			//一般只处理数据  开一个全局变量
			search = result;
			render(result);
		}
	});
	$('.search').on('keyup', function(){
		var val = $('.search').val();
		var tmp = [];
		search.forEach(function(v, i){
			//v---> 对象存储的每一条数据
			if( v.name.indexOf(val) !== -1 || v.phone.indexOf(val) !== -1 || v.pinyin.indexOf(val) !== -1){
				tmp.push(v);
			}
			render(tmp);
			console.log(tmp)
		})
		
	});

	$(window).on('scroll', function(){
		var index;
		var top = $(window).scrollTop() + 40;//顶部搜索栏的高度
		
		table.forEach(function(v, i){
			if(top >= v){
				index = i;
				$('#tip').text(compositor[index])
				console.log(top, v)
				$('#tip').css('display', 'block').delay(1000).queue(function(){
					
					$('#tip').css('display', 'none');
					$('#tip').dequeue();
				})
			}
		})
		
	})
	$('#letter-box').on('click', '.letter', function(){
		$(window).scrollTop( table[$(this).index() ] - 40)

	})
	
})
