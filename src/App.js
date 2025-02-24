import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./componets/Header";
import React from "react";
import Login from "./componets/Login";
import Blogs from "./componets/Blogs";
import UserBlogs from "./componets/UserBlogs";
import AddBlogs from "./componets/AddBlogs";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import Signup from "./componets/Signup";

function App() {
  return (
    <React.Fragment>
      <main>
        <Routes>
          {/* private Route */}
          <Route
            element={
              <>
                <header>
                  <Header />
                </header>
                <PrivateRoute />
              </>
            }
          >
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/myBlogs" element={<UserBlogs />}></Route>
            <Route path="/blog/add" element={<AddBlogs />} />
          </Route>
          {/* Public Route */}
          <Route
            element={
              <>
                <header>
                  <Header />
                </header>
                <PublicRoute />
              </>
            }
          >
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Route>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
