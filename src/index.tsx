import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import reportWebVitals from './reportWebVitals';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Post from './components/Post';
import Layout from './components/Layout';
import UserProfile from './components/user/UserProfile';
import PageNotFound from './components/PageNotFound';
import CreatePost from './components/admin/CreatePost';
import EditPost from './components/admin/EditPost';
import DeletePost from './components/admin/DeletePost';

import { SearchContextProvider } from './context/SearchContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { UserContextProvider } from './context/UserContext';
import RequireAuth from './components/RequireAuth';

const routing = (
  <React.StrictMode>
    <Router>
      <ThemeContextProvider>
        <UserContextProvider>
          <SearchContextProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/posts/:slug" element={<Post />} />
                <Route
                  path="/account"
                  element={
                    <RequireAuth>
                      <UserProfile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/posts/admin"
                  element={
                    <RequireAuth>
                      <Admin />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/posts/admin/create"
                  element={
                    <RequireAuth>
                      <CreatePost />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/posts/admin/edit/:id"
                  element={
                    <RequireAuth>
                      <EditPost />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/posts/admin/delete/:id"
                  element={
                    <RequireAuth>
                      <DeletePost />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Layout>
          </SearchContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </Router>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
