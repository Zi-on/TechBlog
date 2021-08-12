const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('input[name="post-body"]').value;
    // const name = document.querySelector('#name').value.trim();

    
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                "title": title,
                "body": body
            }),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('failed to create post')
        }
    
};

document.querySelector('.new-project-form').addEventListener('submit', newPost);