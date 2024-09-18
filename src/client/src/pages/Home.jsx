import React from "react";
import GoogleBookSearch from "../components/GoogleBookSearch";

//implimenet a sign up/sign in page 

function Home() {

  return (
    <div>
      <h1> Welcome to Book Tracker's Home Page </h1>
      <GoogleBookSearch />
    </div>
  );
}

export default Home;