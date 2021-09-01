const editPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('input[name="post-body"]').value;
    const id = event.target.getAttribute('post-id');

    console.log("hello");
    console.log(body, title, id);
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            "title": title,
            "body": body,
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('failed to edit post');
    }
}

document.querySelector('.new-project-form').addEventListener('submit', editPost)
