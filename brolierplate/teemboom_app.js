function teemboom_app(config){
	
	let boss = new teemboomCommentsClass({
		'config': config,
		'populate': populate, 
		'add_comment': add_comment,
		'add_reply': add_reply,
		'main_profile_id': 'teemboom_send_profile',
		'comment_box_id': 'teemboom_send_text',
		'like_number_class': 'teemboom_engage_like_num',
		'dislike_number_class': 'teemboom_engage_dislike_num'
	})


	function populate(){
		console.log('populate')
		this.main_div.innerHTML = ''

		this.getComments()
	}
	function add_comment(){
		console.log('add_comment')
	}
	function add_reply() {
		console.log('add_reply')
	}



}