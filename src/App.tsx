
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DetailsPage } from './components/DetailsPage';
import { StartPage } from './components/StartPage';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage/>}></Route>
        <Route path='/details-form' element={<DetailsPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
