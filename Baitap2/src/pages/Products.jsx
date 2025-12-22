import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios'
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
export default function Products() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q")
  const page = searchParams.get('page');
  const handleSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    setSearchParams({
      q: value
    })
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {  
      const value = e.target.value;
      navigate(`/tim-kiem?q=${encodeURIComponent(value)}`);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axiosInstance.get("/products", {
          params: {q: query}
        })
        setPosts(response.data.products)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getPosts()
  }, [query])
  return (
    <div className='ml-[10%] mt-[20px]'>
      <h2 className='text-3xl font-bold'>San pham</h2>
      <input type="search" placeholder='Search...' className='border'onChange={handleSearch} onKeyDown={handleKeyDown}/>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <img src={post.thumbnail}></img>
          <button className='border mt-2 p-1 cursor-pointer hover:bg-red-400' onClick={() => navigate(`/san-pham/${post.id}`)}>Chi tiet</button>
        </div>
      )))}
      <span>Footer</span>
    </div>
  )
}
