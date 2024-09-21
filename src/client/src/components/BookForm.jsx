//update DB to accept all these points (type, location, status, rating)
import React, { useState } from "react";
import useLibrary from "../hooks/useLibrary";

function BookForm() {
  const {libraryAddBook } = useLibrary(); // Use the hook to access libraryAddBook
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [comments, setComments] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Hardcopy");
  const [location, setLocation] = useState("Google Play Books");
  const [status, setStatus] = useState("Read");
  const [rating, setRating] = useState("1 Star");
  const [customLocation, setCustomLocation] = useState(""); // New state for custom Location
  const defaultImage = "https://via.placeholder.com/128x193.png?text=No+Image";

  console.log("title", title); 
  console.log("type", type); 
  console.log("location", location); 
  console.log("status", status); 
  console.log("rating", rating); 

  //set async/awaut on handleSubmit so fetch is preformed before states are cleared
  const handleSubmit =  async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      authors,
      comments,
      link,
      image: image.trim() !== "" ? image : defaultImage,
      type,
      location: location === "other" ? customLocation :location, // Use customLocation if "other" is selected
      status,
      rating,
    };
    
  await libraryAddBook(newBook);// Await 

    // Reset the form fileds after sent off
    setTitle("");
    setAuthors("");
    setComments("");
    setLink("");
    setImage("");

    setType("");
    setLocation("");
    setStatus("");
    setRating("");
    setCustomLocation("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      }}
    >
      <div>
        <h2>Add A Book</h2>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Authors: </label>
        <input
          type="text"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Comments: </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <label>Link (optional): </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div>
        <label>Image (optional): </label>
        <input
          type="Image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label>Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="hardcopy">Hardcopy</option>
          <option value="ebook">Ebook</option>
          <option value="audiobook">Audiobook</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label>Location:</label>
        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            if (e.target.value !== "other") {
              setCustomLocation(""); //clear custom location if not "other"
            }
          }}
        >
          <option value="googlePlayBooks">Google Play Books</option>
          <option value="kindle">Kindle</option>
          <option value="nook">Nook</option>
          <option value="audible">Audible</option>
          <option value="Libby/OverDrive">Libby/OverDrive</option>
          <option value="other">Other</option>
        </select>
        {location === "other" && (
          <input
            type="text"
            placeholder="Please specify"
            value={customLocation} // Bind customLocation to the input
            onChange={(e) => setCustomLocation(e.target.value)} //Update customType
          />
        )}
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="read">Read</option>
          <option value="unread">Unread</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="oneStar">1 Star</option>
          <option value="twoStar">2 Star</option>
          <option value="threeStar">3 Star</option>
          <option value="fourStar">4 Star</option>
          <option value="fiveStar">5 Star</option>
        </select>
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
