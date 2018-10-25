$(function(){
	$.ajax({
		type:"get",//请求的类型 get
		url:"/user",//请求资源
		success: function(data){
			data.forEach(function(v){
				$('<tr data-id='+ v.id +'><td><input class=" control name" type="text" value=' + v.name + '></td><td><input class="control phone" type="text" value=' + v.phone + '></td><td><input class="del" type="button" value="删除"/></td></tr>').appendTo('table');
				console.log(v.id)
			})
			
		}
	});
	$('.add').on('click', function(){
		$.ajax({
			type:"post",
			url:"/user",
			async:true,
			data: {a: 1},//往服务器发数据
			success: function(data){
				$('<tr data-id='+ data.id +'><td><input class=" control name" type="text" value=""></td><td><input class="control phone" type="text" value=""></td><td><input class="del" type="button" value="删除"/></td></tr>').appendTo('table');
				console.log(data)
			}
		});
	})
	$("tbody").on("click", '.del', function(){
		var tr = $(this).closest('tr');
		$.ajax({
			type:"delete",
			url:"/user",
			async:true,
			data: {id: tr.attr('data-id')},
			success: function(data){
				if(data.state == 'ok'){
					tr.remove();
				}
			}
		});
		
	})
	$('tbody').on('keyup', '.control', function(){
		var tr = $(this).closest('tr');
		var data = {};
		data.id = tr.attr('data-id');
		if( $(this).hasClass('name') ){
			data.name = $(this).val();
		}else if( $(this).hasClass('phone') ){
			data.phone = $(this).val();
		}else{}
		console.log(data)
		$.ajax({
			type: 'put',
			url: '/user',
			data: data,
			success: function(data){
				console.log('data')
			}
		})
	})
})
