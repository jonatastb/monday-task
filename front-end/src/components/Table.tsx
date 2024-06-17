import React, { FC, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "monday-ui-react-core";
import countryService, { Country } from "../services/countryServices";


interface Props {
  search: string
}

const NullComponent = () => {
  return ''
}

const TableComponent: FC<Props> = ({ search }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

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
      setCountries(data)


    } catch (error) {
      
      console.error(`Erro ao buscar países por nome "${search}":`, error);
      setCountries([])

    } finally {

      setLoading(false)
      
    } 
  };

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
          countries.map((country) => (
            <TableRow key={country.code}>
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
          ))
        }
       </TableBody>
     </Table>
    </div>
     )
}

export default TableComponent;
