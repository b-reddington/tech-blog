// handles the edit page for a post. Specifically listens for a submittal.
const newComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment');

    if (comment) {
        const postId = window.location.pathname.split('/').pop();
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ post_id: postId, comment: comment.value }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.reload();
        }
        else {
            alert('Failed to create comment');
        }

    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComment);
