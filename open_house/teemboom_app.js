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

		// Div that will contain all the comments
		let commentsBox = document.createElement('div')
		commentsBox.id = 'teemboomCommentsBox'
		this.main_div.appendChild(commentsBox)


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

		this.getComments()
		setTimeout(() => {
			commentsBox.scrollTo({
				top: commentsBox.scrollHeight,
				behavior: "smooth"
			});
		}, 1000);
	} 



	function add_comment(data){
		let comment = document.createElement('div')
		comment.className = 'teemboomComment'
		comment.id = data._id

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
		commentAuthor.appendChild(commentTime)

		commentMeta.appendChild(commentTitle)


		comment.appendChild(commentMeta)

		let commentText = document.createElement('div')
		commentText.className = 'teemboomcommentText'
		commentText.innerText = data.content
		comment.appendChild(commentText)

		let commentsBox = document.getElementById('teemboomCommentsBox')
		commentsBox.appendChild(comment)
		let isAtBottom = commentsBox.scrollHeight - commentsBox.scrollTop - 300 <= commentsBox.clientHeight;
		if (isAtBottom) {
			commentsBox.scrollTo({
				top: commentsBox.scrollHeight,
				behavior: "smooth"
			});
		}
	
	}

}

