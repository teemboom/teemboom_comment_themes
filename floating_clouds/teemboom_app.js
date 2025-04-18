function teemboom_app(config){
	
	let boss = new teemboomCommentsClass({
		'config': config,
		'populate': populate, 
		'add_comment': add_comment,
		'main_profile_id': 'teemboom_send_profile',
		'like_number_class': 'teemboom_engage_like_num',
		'dislike_number_class': 'teemboom_engage_dislike_num'
	})

	/**
	 * populate: Creates the UI and fills it in with all the needed parts.
	 * Returns - None
	 */
	function populate(){
		// When ever this function is called we reset these variables
		this.main_div.innerHTML = ''

		//
		// Comment Metrics display. eg. 34 - Comments
		// metrics_box = document.createElement('div')
		// metrics_box.id = 'teemboom_metrics_box'
		// metrics_box.innerText = '0 - Comments'
		// this.main_div.appendChild(metrics_box)

		// UI Box for inputing comment
		let send_box = document.createElement('div')
		send_box.id = 'teemboom_send_box'

		// User profile circle
		let send_profile = document.createElement('div')
		send_profile.id = 'teemboom_send_profile'
		this.profile_avatar(null, send_profile) 
		send_profile.title = 'Anonymous'
		send_profile.addEventListener('click', (e)=>{this.profile_dropdown()})
		send_box.appendChild(send_profile)

		// Input space for typing comment
		send_text = document.createElement('textarea')
		send_text.id = 'teemboom_send_text'
		send_text.placeholder = 'Leave a comment...'
		send_text.addEventListener('keydown', (e)=>{
			if (e.key == 'Enter' && e.shiftKey == false){
				e.preventDefault()
				this.submit_comment(send_text)
			}
		})
		send_text.setAttribute('data-emoji-picker', "true")
		send_box.appendChild(send_text)

		this.main_div.appendChild(send_box)

		
		//
		// Div that will contain all the comments
		comments_box = document.createElement('div')
		comments_box.id = 'teemboom_comments_box'
		this.main_div.appendChild(comments_box)
		
		//
		// Once the UI is in place, get all the webpage comments and fill it in
		this.getComments()
	}

	/**
	 * add_comment: Responsible for taking a comment data and rendering it to the UI
	 * @param data: Information about the comment in json format
	 * Returns - None
	 */
	function add_comment(data){
		// Main comment div: <class teemboom_comment>
		let comment = document.createElement('div')
		comment.className = 'teemboom_comment'
		comment.id = `${data._id}`

		if (data.pinned){
			let pinned = document.createElement('div')
			pinned.className = 'teemboomPinned'
			pinned.innerHTML = '<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.714 11.864l-11.505-11.563c-0.248-0.249-0.605-0.35-0.948-0.266-0.341 0.083-0.613 0.339-0.717 0.674-0.692 2.228-0.773 4.245-0.244 6.084-0.049 0.034-0.095 0.070-0.138 0.113l-5.347 5.346c-1.725-0.8-3.579-1.233-5.428-1.233-1.175 0-2.327 0.174-3.424 0.515-0.334 0.104-0.59 0.375-0.674 0.714s0.014 0.698 0.261 0.947l6.843 6.887-9.568 9.72-0.832 2.192 2.011-0.777 9.793-9.72 6.932 6.977c0.189 0.192 0.447 0.295 0.709 0.295 0.079 0 0.159-0.010 0.238-0.029 0.341-0.084 0.613-0.34 0.717-0.675 0.905-2.913 0.64-6.042-0.636-8.848l5.459-5.46c0.020-0.020 0.033-0.041 0.051-0.063 0.824 0.236 1.678 0.361 2.564 0.361 1.101 0 2.268-0.158 3.468-0.531 0.334-0.104 0.59-0.375 0.674-0.714s-0.015-0.697-0.262-0.945zM18.849 25.755l-12.587-12.669c3.23-0.377 6.714 0.925 9.236 3.447 2.51 2.509 3.735 5.978 3.351 9.221zM18.757 17.392c-0.526-0.804-1.14-1.568-1.845-2.274-0.702-0.702-1.469-1.321-2.28-1.854l4.504-4.503c0.459 0.799 1.052 1.563 1.782 2.291 0.745 0.745 1.534 1.348 2.363 1.814zM22.332 9.639c-1.923-1.923-2.664-4.067-2.271-6.653l8.966 9.012c-2.583 0.37-4.738-0.403-6.695-2.36z"></path> </g></svg> Pinned'
			comment.appendChild(pinned)
		}
		// User profile circle: <class: teemboom_comment_pfp>
		let pfp = document.createElement('div')
		pfp.className = 'teemboom_comment_pfp'
		if (data.user.profile_pic) this.profile_pic(data.user.profile_pic, pfp)
		else this.profile_avatar(data.user.username, pfp)
		comment.appendChild(pfp)

		// For the other information of the comment, is to the side of the pfp. <class teemboom_comment_main>
		let main = document.createElement('div')
		main.className = 'teemboom_comment_main'

		// Title of the comment, includes the author and time since post. <class teemboom_comment_title>
		let title = document.createElement('div')
		title.className = 'teemboom_comment_title'
		title.innerHTML = `${data.user.username} <i>${data.elasped_time}</i>`
		main.appendChild(title)

		// Content or message of the comment. <class teemboom_comment_body>
		let body = document.createElement('div')
		body.className = 'teemboom_comment_body'
		body.innerText = data.content
		main.appendChild(body)

		comment.appendChild(main)


		// render comment engagement veatures that have been turned on
		let engage = document.createElement('div')
		engage.className = 'teemboom_comment_engage'
		main.appendChild(engage)

		// like button
		if (config.showLikes){
			let like = document.createElement('div')
			like.className = 'teemboom_engage_like'
			like.innerHTML = `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"/> </g></svg>`
			like.addEventListener('click', ()=>{
				this.like_comment(data._id)
			})
			engage.appendChild(like)
			let like_number = document.createElement('p')
			like_number.className = 'teemboom_engage_like_num'
			like_number.innerText = data.likes
			engage.appendChild(like_number)
		}
		// dislike button
		if (config.showDislikes){
			let dislike = document.createElement('div')
			dislike.className = 'teemboom_engage_dislike'
			dislike.innerHTML = `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.556 22.646C12.3525 23.0443 13.3186 22.6649 13.6313 21.8311L16.193 15L20 15C21.6568 15 23 13.6569 23 12L23 4C23 2.34315 21.6568 1 20 1L5.62625 1C4.20523 1 2.97914 1.99698 2.68931 3.38814L1.02265 11.3881C0.634535 13.2511 2.05665 15 3.95959 15H9.11255L8.37409 17.2154C7.7446 19.1039 8.59952 21.1678 10.38 22.058L11.556 22.646ZM14.3203 14.2978L11.9537 20.6088L11.2744 20.2692C10.3842 19.8241 9.95671 18.7921 10.2715 17.8479L11.0099 15.6325C11.4416 14.3374 10.4777 13 9.11256 13H3.95959C3.32527 13 2.85124 12.417 2.98061 11.7961L3.14645 11L6.99998 11C7.55226 11 7.99998 10.5523 7.99998 10C7.99998 9.44772 7.55226 9.00001 6.99998 9.00001L3.56312 9.00001L3.97978 7.00001L6.99998 7.00001C7.55226 7.00001 7.99998 6.55229 7.99998 6.00001C7.99998 5.44772 7.55226 5.00001 6.99998 5.00001L4.39645 5.00001L4.64727 3.79605C4.74388 3.33233 5.15258 3 5.62625 3L16 3L16 13.0093C15.2458 13.0821 14.5903 13.5779 14.3203 14.2978ZM18 13H20C20.5523 13 21 12.5523 21 12L21 4C21 3.44772 20.5523 3 20 3L18 3L18 13Z"/> </g></svg>`
			dislike.addEventListener('click', ()=>{
				this.dislike_comment(data._id)
			})
			engage.appendChild(dislike)
			let dislike_number = document.createElement('p')
			dislike_number.className = 'teemboom_engage_dislike_num'
			dislike_number.innerText = data.dislikes
			engage.appendChild(dislike_number)
		}
		// Replies 
		if (config.showReplies && !data.parent_id){
			// UI for the reply engagement
			let reply = document.createElement('p')
			reply.className = 'teemboom_engage_reply'
			reply.innerHTML = 'Replies &#x25BC;'
			// onclick display the replies of the comment
			reply.addEventListener('click', ()=>{
				if (reply_box.style.display === 'none' || !reply_box.style.display){
					if (comment.querySelectorAll('.teemboom_comment').length < data.replies){
						this.getCommentChildren(data._id)
					}
					reply_box.style.display = 'block'
				}
				else reply_box.style.display = 'none'
			})
			engage.appendChild(reply)
			// REplies metric
			let reply_num = document.createElement('p')
			reply_num.className = 'teemboom_engage_reply_num'
			reply_num.innerHTML = data.replies
			engage.appendChild(reply_num)		

			// UI element containing all the replies for the comment
			let reply_box = document.createElement('div')
			reply_box.className = 'teemboom_replies'
			// UI element for inputing a reply
			let reply_input = document.createElement('textarea')
			reply_input.className = 'teemboom_replies_input'
			reply_input.placeholder = 'Leave a reply'
			// Sending a reply on press enter
			reply_input.addEventListener('keydown', (e)=>{
				if (e.key == 'Enter' && e.shiftKey == false){
					e.preventDefault()
					this.submit_comment(reply_input, data._id)
				}
			})
			reply_box.appendChild(reply_input)
			main.appendChild(reply_box)
		}

		if (data.parent_id){
			let parent = document.getElementById(data.parent_id)
			let repliesBox = parent.querySelector('.teemboom_replies')
			repliesBox.appendChild(comment)
			let commentReplyNumber = parent.querySelector('.teemboom_engage_reply_num')
			commentReplyNumber.innerText = parent.querySelectorAll('.teemboom_comment').length
		}else{
			if (!data.pinned) comments_box.appendChild(comment)
			else comments_box.prepend(comment)
		}
		
		let comment_menu = document.createElement('div')
		comment_menu.className = 'teemboom_comment_menu'
		let tag = document.createElement('p')
		tag.innerHTML = '&#8942;'
		comment_menu.appendChild(tag)
		tag.onclick = ()=>{
			if (comment_menu.querySelector('div')){
				comment_menu.querySelector('div').remove()
				return;
			}
			let report = document.createElement('div')
			report.innerHTML = 'Report &#127988;'
			report.addEventListener('click', ()=>{
				this.report_popup(data._id)
			})
			comment_menu.appendChild(report)
		}
		comment.appendChild(comment_menu)
	}
}