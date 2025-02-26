function teemboom_app(config){
	
	let boss = new teemboomCommentsClass({
		'config': config,
		'populate': populate, 
		'add_comment': add_comment,
		'main_profile_id': 'teemboomMainProfilePic',
		'like_number_class': 'teemboomCommentLikeNumber',
		'dislike_number_class': 'teemboom_engage_dislike_num'
	})


	function populate(){
		this.main_div.innerHTML = ''

		let writeCommentBox = document.createElement('div')
		writeCommentBox.id = "teemboomWriteComment"

		let mainProfilePic = document.createElement('div')
		mainProfilePic.id = 'teemboomMainProfilePic'
		this.profile_avatar(null, mainProfilePic)
		mainProfilePic.addEventListener('click', ()=>{this.profile_dropdown()})
		writeCommentBox.appendChild(mainProfilePic)

		let commentInput = document.createElement('textarea')
		commentInput.id = 'teemboomCommentInput'
		commentInput.placeholder = 'Leave a comment...'
		commentInput.addEventListener('keydown', (e)=>{
			if (e.key == 'Enter' && e.shiftKey == false){
				e.preventDefault()
				this.submit_comment(commentInput)
			}
		})
		writeCommentBox.appendChild(commentInput)
		let sendButton = document.createElement('button')
		sendButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
		sendButton.addEventListener('click', (e)=>{
			this.submit_comment(commentInput)
		})
		writeCommentBox.appendChild(sendButton)

		this.main_div.appendChild(writeCommentBox)

		// Div that will contain all the comments
		let commentsBox = document.createElement('div')
		commentsBox.id = 'teemboomCommentsBox'
		this.main_div.appendChild(commentsBox)

		this.getComments()
	} 



	function add_comment(data){
		let comment = document.createElement('div')
		comment.className = 'teemboomComment'
		comment.id = data._id
		console.log(data)
		if (data.pinned){
			let pinned = document.createElement('div')
			pinned.className = 'teemboomPinned'
			pinned.innerHTML = '<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.714 11.864l-11.505-11.563c-0.248-0.249-0.605-0.35-0.948-0.266-0.341 0.083-0.613 0.339-0.717 0.674-0.692 2.228-0.773 4.245-0.244 6.084-0.049 0.034-0.095 0.070-0.138 0.113l-5.347 5.346c-1.725-0.8-3.579-1.233-5.428-1.233-1.175 0-2.327 0.174-3.424 0.515-0.334 0.104-0.59 0.375-0.674 0.714s0.014 0.698 0.261 0.947l6.843 6.887-9.568 9.72-0.832 2.192 2.011-0.777 9.793-9.72 6.932 6.977c0.189 0.192 0.447 0.295 0.709 0.295 0.079 0 0.159-0.010 0.238-0.029 0.341-0.084 0.613-0.34 0.717-0.675 0.905-2.913 0.64-6.042-0.636-8.848l5.459-5.46c0.020-0.020 0.033-0.041 0.051-0.063 0.824 0.236 1.678 0.361 2.564 0.361 1.101 0 2.268-0.158 3.468-0.531 0.334-0.104 0.59-0.375 0.674-0.714s-0.015-0.697-0.262-0.945zM18.849 25.755l-12.587-12.669c3.23-0.377 6.714 0.925 9.236 3.447 2.51 2.509 3.735 5.978 3.351 9.221zM18.757 17.392c-0.526-0.804-1.14-1.568-1.845-2.274-0.702-0.702-1.469-1.321-2.28-1.854l4.504-4.503c0.459 0.799 1.052 1.563 1.782 2.291 0.745 0.745 1.534 1.348 2.363 1.814zM22.332 9.639c-1.923-1.923-2.664-4.067-2.271-6.653l8.966 9.012c-2.583 0.37-4.738-0.403-6.695-2.36z"></path> </g></svg> Pinned'
			comment.appendChild(pinned)
		}

		let commentMeta = document.createElement('div')
		commentMeta.className = 'teemboomCommentMeta'

		let commentProfilePic = document.createElement('div')
		commentProfilePic.className = 'teemboomcommentProfilePic'
		if (data.user.profile_pic) this.profile_pic(data.user.profile_pic, commentProfilePic)
		else this.profile_avatar(data.user.username, commentProfilePic)
		commentMeta.appendChild(commentProfilePic)

		let commentTitle = document.createElement('div')
		commentTitle.className = 'teemboomCommentTitle'
		let commentAuthor = document.createElement('p')
		commentAuthor.innerText = data.user.username
		let commentTime = document.createElement('span')
		commentTime.innerText = data.elasped_time
		commentTitle.appendChild(commentAuthor)
		commentTitle.appendChild(commentTime)

		commentMeta.appendChild(commentTitle)

		if (config.showLikes){
			let commentLike = document.createElement('div')
			commentLike.className = 'teemboomCommentLike'
			commentLike.innerHTML = '<svg width="64px" height="64px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#000000"></path> </g></svg>'
			let commentLikeNumber = document.createElement('p')
			commentLikeNumber.className = 'teemboomCommentLikeNumber'
			commentLikeNumber.innerText = data.likes
			commentLike.appendChild(commentLikeNumber)
			commentLike.addEventListener('click', ()=>{
				this.like_comment(data._id)
			})
			commentMeta.appendChild(commentLike)
		}

		comment.appendChild(commentMeta)

		let commentText = document.createElement('div')
		commentText.className = 'teemboomcommentText'
		commentText.innerText = data.content
		comment.appendChild(commentText)

		if (data.parent_id){
			let parent = document.getElementById(data.parent_id)
			let repliesBox = parent.querySelector('.teemboomReplies')
			repliesBox.appendChild(comment)
			let commentReplyNumber = parent.querySelector('.teemboomReplyNumber')
			commentReplyNumber.innerText = parent.querySelectorAll('.teemboomComment').length
		}else{
			if (!data.pinned) document.getElementById('teemboomCommentsBox').appendChild(comment)
			else document.getElementById('teemboomCommentsBox').prepend(comment)
		}

		
		// Don't show replies if it is a nested comment
		if (config.showReplies && !data.parent_id){ 
			let commentEngage = document.createElement('div')
			commentEngage.className = 'teemboomCommentEngage'
			let commentReplyButton = document.createElement('div')
			commentReplyButton.className = 'teemboomReplyButton'
			commentReplyButton.innerHTML = '<p>Reply</p><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
			let commentReplyNumber = document.createElement('span')
			commentReplyNumber.className = 'teemboomReplyNumber'
			commentReplyNumber.innerText = data.replies
			commentReplyButton.appendChild(commentReplyNumber)
			commentReplyButton.addEventListener('click', ()=>{
				if (replyBox.style.display === 'none' || !replyBox.style.display){
					if (comment.querySelectorAll('.teemboomComment').length < data.replies){
						this.getCommentChildren(data._id)
					}
					replyBox.style.display = 'block'
				}
				else replyBox.style.display = 'none'
			})
			commentEngage.appendChild(commentReplyButton)
			comment.appendChild(commentEngage)

			let replyBox = document.createElement('div')
			replyBox.className = 'teemboomReplies'
			let replyInput = document.createElement('div')
			replyInput.className = 'teemboomRepliesInput'
			let replyBoxInput = document.createElement('textarea')
			replyBoxInput.placeholder = 'Leave a reply...'
			replyBoxInput.addEventListener('keydown', (e)=>{
				if (e.key == 'Enter' && e.shiftKey == false){
					e.preventDefault()
					this.submit_comment(replyBoxInput, data._id)
				}
			})
			replyInput.appendChild(replyBoxInput)
			let sendButtonReply = document.createElement('button')
			sendButtonReply.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
			sendButtonReply.addEventListener('click', (e)=>{
				this.submit_comment(replyBoxInput, data._id)
			})
			replyInput.appendChild(sendButtonReply)
			replyBox.appendChild(replyInput)
			comment.appendChild(replyBox)

		}
	}

}

