import { FC, useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Modal, ModalContent, ModalFooterButtons, Divider, Toast } from "monday-ui-react-core";
import countryService, { Country } from "../services/countryServices";
import { Weather, weatherInformations } from "../services/weatherInformations";

interface Props {
  search: string
}

const NullComponent = () => {
  return ''
}

const TableComponent: FC<Props> = ({ search }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState('');
  const [noData, setNoData] = useState('visible');
  const [modalData, setModalData] = useState({})

  const fetchAllData = async () => {
    try {
      setLoading(true)

      const data = await countryService.getAllCountries();
      setCountries(data);

    } catch (error) {

      console.error("Erro ao buscar todos os países:", error);
      setCountries([])

    } finally {

      setLoading(false)

    }
  };

  const fetchDataWithSearch = async (search: string) => {
    try {
      setLoading(true)

      const data = await countryService.getCountriesByName(search);
      console.log(data)
      setCountries(data)


    } catch (error) {
      
      console.error(`Erro ao buscar países por nome "${search}":`, error);
      setCountries([])

    } finally {

      setLoading(false)
      
    } 
  };

  const fetchWeather = async (countryName: string) => {
    try {
      const response: Weather = await weatherInformations.getInformationsByCountry(countryName)
      const data = await response.data

      if(response.code === 500){
        setShowToast(true)
        setMsgToast("An internal error occurred, please try again later")

        setTimeout(() => {
          setShowToast(false)
          setMsgToast('')
        }, 4000)

        return 
      }

      if(data.msg){
        setShowToast(true)
        setMsgToast(data.msg)

        setTimeout(() => {
          setShowToast(false)
          setMsgToast('')
        }, 4000)
      }else {
        setModalData(data)
        openModal()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetWeather = async (countryName: string) => {
    await fetchWeather(countryName)
  }

  const openModal = () => {
    setShow(true);
  };

  const closeModal = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    if (search.trim().length > 1) {
      fetchDataWithSearch(search);
    } else {
      fetchAllData();
    }
  }, [search]);

  return (
    <div style={{marginTop: '2rem'}}>
      <Table
        dataState={{isLoading: loading, isError: false}}
        columns={[
          {
            id: 'name',
            loadingStateType: 'medium-text',
            title: 'Country'
          },
          {
            id: 'code',
            loadingStateType: 'medium-text',
            title: 'Code',
            width: 150,
          },
          {
            id: 'region',
            loadingStateType: 'long-text',
            title: 'Region'
          },
          {
            id: 'capital',
            loadingStateType: 'long-text',
            title: 'Capital'
          },
          {
            id: 'population',
            loadingStateType: 'long-text',
            title: 'Population'
          },
        ]}
        emptyState={<NullComponent />}
        errorState={<NullComponent />}
      >
        <TableHeader>
          <TableHeaderCell title="Country" />
          <TableHeaderCell title="Code" />
          <TableHeaderCell title="Region" />
          <TableHeaderCell title="Capital" />
          <TableHeaderCell title="Population" />
        </TableHeader>
       <TableBody>
        {
          countries.length > 0 ? countries.map((country) => (
            <div key={country.code} onClick={() => {handleGetWeather(country.name)}} style={{ cursor: 'pointer' }}>
              <TableRow>
                <TableCell>
                  {country.name}
                </TableCell>
                <TableCell>
                  {country.code}
                </TableCell>
                <TableCell>
                  {country.region}
                </TableCell>
                <TableCell>
                  {country.capital}
                </TableCell>
                <TableCell>
                  {Number(country.population).toLocaleString('en-US')}
                </TableCell>
              </TableRow>
            </div>
          )) : 
          ( 
            <h3 style={{ fontFamily: 'sans-serif', textAlign: 'center'}}>Country Not Found</h3>
          )
        }
         
       </TableBody>
     </Table>
      <Modal
        id="story-book-modal"
        onClose={closeModal}
        title={` `}
        show={show}
        width={"500px"}
      >
        <ModalContent>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{margin: '0.5rem auto'}}>
              {`${modalData.name}`}
            </h1>
            <span>
              {modalData.coordenates}
            </span>
            <Divider />
            <div style={{ width: '100%' ,display: 'flex', justifyContent: 'space-evenly'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src={`https://${modalData.icon}`} style={{width: '64px'}}/>
                {modalData.text}
              </div>

              <div>
                <h2>{modalData.celsius} ºC</h2>
                <h2>{modalData.fahrenheit} ºF</h2>
              </div>
            </div>
          
            <h2>{new Date(modalData.time).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '')}</h2>
          </div>
        </ModalContent>
      </Modal>

      <Toast
      className="monday-storybook-toast_wrapper"
      open={showToast}
    >
      {msgToast}
    </Toast>
    </div>
  )
}

export default TableComponent;
