
import { ChakraProvider } from '@chakra-ui/react';
import { validateHeaderValue } from 'http';
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DetailsPage } from './components/DetailsPage';
import { StartPage } from './components/StartPage';
import { BasicData } from './models/BasicData';
import { ExtendedData } from './models/ExtendedData';
import { UsageIntent } from './models/UsageIntent';

interface DataContext {
  basicData: BasicData;
  basicDataModifier: (value: BasicData) => void;
  extendedData: ExtendedData;
  extendedDataModifier: (value: ExtendedData) => void;
  
}

export const DataContext = createContext<DataContext>({
  basicData: {
    registrationNumber: "",
    isRegistrationNumberValid: false,
    peselNumber: "",
    isPeselNumberValid: false,
    privacyPolicyConsent: false,
    name:"",
    lastName:"",
  },
  basicDataModifier: (value: BasicData) => {

  },
  extendedData: { 
    insuranceStartDate: new Date(), 
    usageIntent:UsageIntent.Private },
  extendedDataModifier: (value: ExtendedData) => { }
  
})

function App() {

  const [basicData, setBasicData] = useState<BasicData>({
    registrationNumber: "",
    isRegistrationNumberValid: false,
    peselNumber: "",
    isPeselNumberValid: false,
    privacyPolicyConsent: false,
    name: "",
    lastName:"",
  });

  const [extendedData, setExtandedData] = useState<ExtendedData>(
    { insuranceStartDate: new Date(), 
      usageIntent:UsageIntent.Private }
  );

  const extendedDataModifier = (value: ExtendedData) => {
    setExtandedData(value)
  }

  const basicDataModifier = (value: BasicData) => {
    setBasicData(value)
  }

  return (
    <DataContext.Provider value={{
      basicData: basicData,
      basicDataModifier: basicDataModifier,
      extendedData: extendedData,
      extendedDataModifier: extendedDataModifier
    }}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StartPage />}></Route>
            <Route path='/details-form' element={<DetailsPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </DataContext.Provider>
  );
}

export default App;
