const editPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const body = document.querySelector("#body").value.trim();
    const id = document.getElementById('post-id');
    const newId = id.getAttribute('value');

    console.log(title);
    console.log(body);
    const response = await fetch(`api/posts/${newId}`, {
        method: 'PUT',
        body: JSON.stringify({
            "title": `${title}`,
            "body": `${body}`,
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

document.querySelector('#editBtn').addEventListener('submit', editPost)
