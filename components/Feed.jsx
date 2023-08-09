'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [allposts, setAllPosts] = useState([])
  const [postResult, setPostResult] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()

      setAllPosts(data)
      setPostResult(data)
    }

    fetchPosts()
  }, [])

  const filterPrompt = (text) => {
    const regex = new RegExp(text, 'i')
    return allposts.filter(
      (p) =>
        regex.test(p.creator.username) ||
        regex.test(p.tag) ||
        regex.test(p.prompt)
    )
  }

  const handleSearchChange = (e) => {
    const newPost = filterPrompt(e.target.value)
    setSearchText(e.target.value)

    const search = () => {
      setTimeout(() => {
        setPostResult(newPost)
      }, 500)
    }

    search()
  }

  const handleTagClick = (tag) => {
    const withTagPosts = allposts.filter((p) => p.tag === tag)

    setSearchText(tag)
    setPostResult(withTagPosts)
  }
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={postResult} handleTagClick={handleTagClick} />
    </section>
  )
}

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default Feed
