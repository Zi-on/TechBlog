const commentPost = async (event) => {
    event.preventDefault();
    const text = document.querySelector('input[name="comment-text"]').value;
    const post_id = event.target.getAttribute('post-id');

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({
            "text": text,
            "post_id": post_id,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    document.location.reload();

}

document.querySelector('.new-project-form').addEventListener('submit', commentPost)