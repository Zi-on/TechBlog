const editPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const body = document.querySelector("#body").value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    console.log(title);
    console.log(body);
    const response = await fetch(`api/posts/${id}`, {
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

document.getElementById('#editBtn').addEventListener('submit', editPost)
