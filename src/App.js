import logo from './logo.svg';
import './App.css';
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { Image } from './Image';
import { axiosInstance } from './constants';

async function fetchDataFromAPI(search, perPage, page) {
  const response = await axiosInstance.get('/search/photos', {
    params: {
      query: search,
      per_page: perPage,
      page: page,
    },
  });
  return response.data;
}

function App() {
  const [searchInput, setSearchInput] = useState('dog');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [isBottom, setIsBottom] = useState(false);
  console.log('render');
  const { data, isRefetching, isLoading, error, refetch } = useQuery('myData', () =>
    fetchDataFromAPI(searchInput, perPage, page),
  );
  const images = useMemo(() => data?.results, [data]);
  function handleScroll() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    const isAtBottom = windowHeight + scrollY >= bodyHeight;

    setIsBottom(isAtBottom);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      refetch();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (isBottom) {
      if (perPage > 30) {
        return;
      }

      setPerPage((prev) => prev + 10);
      refetch();
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setIsBottom(false);
    };
  }, [isBottom]);
  return (
    <div className="App">
      <h1>Image</h1>
      <div className="search-input">
        <h3 style={{ display: 'inline' }}>Search here:</h3>
        <input
          style={{ height: '1.6em' }}
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter keyword to search"
        />
      </div>
      {error && <div>Error: {error.message}</div>}
      {!isLoading && (
        <div>
          <h1>Images:</h1>
          {(isLoading || isRefetching) && (
            <>
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading...</div>
              {/* loading............ */}
            </>
          )}
          <div className="images">
            {images.map((item, index) => {
              return <Image src={item.urls.small} key={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
