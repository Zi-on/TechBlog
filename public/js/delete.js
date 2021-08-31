

const deletePost = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                post_id: id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('failed to delete post');
        }
    
};

document.querySelector(`.new-post`).addEventListener('click', deletePost);