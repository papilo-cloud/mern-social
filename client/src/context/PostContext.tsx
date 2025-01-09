import { createContext, useContext, useState } from "react";


interface ContextProps {
    posts: Post[];
    addPost: (val: Post) => void;
    removePosts: (val: Post) => void;
    setPosts: any
}

type Post = {
    comments: [],
    likes: [],
    postedBy: {
      name: string,
      photo: string,
    },
    created: number,
    text: string,
    photo: string,
    _id: string
  }
const Context = createContext({} as ContextProps )

export const usePost = () => {
    return useContext(Context)
}

export const PostContextProvider = ({children}) => {
    const [posts, setPosts] = useState<Post[]>([])

    const addPost = (post: Post) => {        
        return setPosts([...posts, post])
    }
    const removePosts = (post: Post) => {
        const updatedPost = [...posts]
        const index = updatedPost.indexOf(post)
        updatedPost.splice(index, 1)
        setPosts(updatedPost)
    }
    return(
        <Context.Provider value={{
            posts,
            setPosts,
            addPost,
            removePosts
        }}>
            {children}
        </Context.Provider>
    )
}