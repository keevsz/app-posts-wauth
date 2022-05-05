import logo from "./logo.svg"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import HomePage from "./Pages/HomePage"
import ChatPage from "./Pages/ChatPage"
import ContentPage from "./Pages/ContentPage"
import PostPage from "./Pages/PostsPage"
import { ProfilePage } from "./Pages/ProfilePage"
import NotFound from "./Components/miscellaneous/NotFound"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<ContentPage />}>
          <Route path="/home/posts" element={<PostPage />} />
          <Route path="/home/chats" element={<ChatPage />} />
          <Route path="/home/profile/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
