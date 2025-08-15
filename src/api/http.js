import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(
    Object.assign({
      // baseURL: baseURL,
      baseURL, // key 와 값이 같으면 생략 가능
    }),
    options,
  );
  return instance;
}

export const canvases = create(
  `${import.meta.env.VITE_API_BASE_URL}/canvases/`,
);
// export const canvases = create(
//   'https://json-server-vercel-ten-sage.vercel.app/canvases',
// );
// export const canvases = create('http://localhost:8000/canvases');
//export const posts = create('http://localhost:8000/posts/');
