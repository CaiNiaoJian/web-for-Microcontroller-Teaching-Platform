document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.querySelector('.comments');
    const commentInput = document.getElementById('comment-input');
    const submitCommentButton = document.getElementById('submit-comment');
    const emojiPicker = document.querySelector('.emoji-picker');

    // 提交评论
    submitCommentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText);
            commentInput.value = '';
        }
    });

    // 添加表情包
    emojiPicker.addEventListener('click', (event) => {
        if (event.target.classList.contains('emoji')) {
            const emoji = event.target.getAttribute('data-emoji');
            commentInput.value += emoji;
        }
    });

    // 添加评论
    function addComment(text) {
        const comment = document.createElement('div');
        comment.className = 'comment';

        const commentHeader = document.createElement('div');
        commentHeader.className = 'comment-header';

        const commentTime = document.createElement('span');
        commentTime.className = 'comment-time';
        commentTime.textContent = new Date().toLocaleString();

        const commentContent = document.createElement('div');
        commentContent.className = 'comment-content';
        commentContent.textContent = text;

        const commentActions = document.createElement('div');
        commentActions.className = 'comment-actions';

        const replyButton = document.createElement('button');
        replyButton.textContent = '回复';
        replyButton.addEventListener('click', () => showReplyForm(comment));

        commentHeader.appendChild(commentTime);
        commentActions.appendChild(replyButton);

        comment.appendChild(commentHeader);
        comment.appendChild(commentContent);
        comment.appendChild(commentActions);

        commentsContainer.appendChild(comment);
    }

    // 显示回复表单
    function showReplyForm(comment) {
        const replyForm = document.createElement('div');
        replyForm.className = 'reply-form';

        const replyInput = document.createElement('textarea');
        replyInput.placeholder = '写下你的回复...';

        const submitReplyButton = document.createElement('button');
        submitReplyButton.textContent = '提交回复';
        submitReplyButton.addEventListener('click', () => {
            const replyText = replyInput.value.trim();
            if (replyText) {
                addReply(comment, replyText);
                replyInput.value = '';
                replyForm.remove();
            }
        });

        replyForm.appendChild(replyInput);
        replyForm.appendChild(submitReplyButton);

        comment.appendChild(replyForm);
    }

    // 添加回复
    function addReply(comment, text) {
        const replies = comment.querySelector('.replies') || createRepliesContainer(comment);

        const reply = document.createElement('div');
        reply.className = 'reply';

        const replyHeader = document.createElement('div');
        replyHeader.className = 'reply-header';

        const replyTime = document.createElement('span');
        replyTime.className = 'reply-time';
        replyTime.textContent = new Date().toLocaleString();

        const replyContent = document.createElement('div');
        replyContent.className = 'reply-content';
        replyContent.textContent = text;

        const replyActions = document.createElement('div');
        replyActions.className = 'reply-actions';

        const replyReplyButton = document.createElement('button');
        replyReplyButton.textContent = '回复';
        replyReplyButton.addEventListener('click', () => showReplyForm(reply));

        replyHeader.appendChild(replyTime);
        replyActions.appendChild(replyReplyButton);

        reply.appendChild(replyHeader);
        reply.appendChild(replyContent);
        reply.appendChild(replyActions);

        replies.appendChild(reply);
    }

    // 创建回复容器
    function createRepliesContainer(comment) {
        const replies = document.createElement('div');
        replies.className = 'replies';
        comment.appendChild(replies);
        return replies;
    }
});