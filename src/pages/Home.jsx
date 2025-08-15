import { useState } from 'react';
import CanvasList from '../componenets/CanvasList';
import SearchBar from '../componenets/SearchBar';
import ViewToggle from '../componenets/ViewToggle';
import CategoryFilter from '../componenets/CategoryFilter';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import Button from '../componenets/Button';
// import { useApiRequest } from '../hooks/useApiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
function Home() {
  const queryClient = useQueryClient();
  // const [searchText, setSearchText] = useState();
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });
  const handleFilter = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };
  const [isGridView, setIsGridView] = useState(true);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  //1] 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () => {
      console.log('fetching');
      return getCanvases({
        title_like: filter.searchText,
        category: filter.category,
      });
    },
    // initialData: [],
    staleTime: 1000 * 60 * 5, //5분동안 데이터 신선상태fresh
    refetchOnWindowFocus: false,
  });

  //2]등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  //3]삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  //API call
  // const { isLoading, error, execute: fetchData } = useApiRequest(getCanvases);
  // const { isLoading: isLoadingCreate, execute: createNewCanvas } =
  //   useApiRequest(createCanvas);
  // async function fetchData(params) {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     await new Promise(resolver => setTimeout(resolver, 1000));
  //     const response = await getCanvases(params);
  //     setData(response.data);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   fetchData(
  //     { title_like: searchText },
  //     {
  //       onSuccess: response => setData(response.data),
  //     },
  //   );
  // }, [searchText, fetchData]);

  // const filteredData = data.filter(item =>
  //   item.title.toLowerCase().includes(searchText.toLowerCase()),
  // );
  async function handleDeleteItem(id) {
    deleteCanvasMutation(id);

    // if (confirm('delte? really?') == false) {
    //   return;
    // }
    // //delete
    // try {
    //   await deleteCanvas(id);
    //   fetchData({ title_like: searchText });
    // } catch (err) {
    //   alert(err.message);
    // }
  }
  async function handleCreateCanvas() {
    createNewCanvas();
    // createNewCanvas(null, {
    //   onSuccess: () => {
    //     fetchData(
    //       { title_like: searchText },
    //       {
    //         onSuccess: response => setData(response.data),
    //       },
    //     );
    //   },
    //   onError: err => alert(err.message),
    // });
    // try {
    //   setIsLoadingCreate(true);
    //   await new Promise(resolver => setTimeout(resolver, 1000));
    //   await createCanvas();
    //   fetchData({ title_like: searchText });
    // } catch (err) {
    //   alert(err.message);
    // } finally {
    //   setIsLoadingCreate(false);
    // }
  }
  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={val => handleFilter('category', val)}
          />
        </div>
        <ViewToggle setIsGridView={setIsGridView} isGridView={isGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button loading={isLoadingCreate} onClick={handleCreateCanvas}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={filter.searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
