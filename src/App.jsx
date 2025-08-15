import { Outlet } from 'react-router';
import Header from './componenets/Header';
import Main from './componenets/Main';
function App() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
