// add type (hardcopy, audio, ebook), location (amazon, google books), status (read, unread)
import React, { useState } from "react";

function BookForm({ addBook }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [comments, setComments] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState ("");

  const defaultImage = "https://via.placeholder.com/128x193.png?text=No+Image";

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ title, authors, comments, link, image: image.trim() !=="" ? image : defaultImage,  });
    // Reset the form fileds after sent off
    setTitle("");
    setAuthors("");
    setComments("");
    setLink("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    }}
    >
      <div>
        <h2>Add A Book</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Authors:</label>
        <input
          type="text"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <label>Link (optional):</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div>
        <label>Image (optional):</label>
        <input
          type="Image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
