import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get('boardId');

monday.setApiVersion("2023-10");

interface ColumnValue {
  id: string;
  text: string;
}

export interface Item {
  id: string;
  name: string;
  column_values: ColumnValue[];
}

export interface Country {
  name: string;
  region: string;
  capital: string;
  population: string;
  code: string;
}


const countryService = {
  formatCountriesObject: (countriesInformations: Item[]) => {

    const formattedCountries: Country[] = countriesInformations.map((country) => ({
      name: country.name,
      region: country.column_values.find(cv => cv.id === "region")?.text || "-",
      capital: country.column_values.find(cv => cv.id === "capital")?.text || "-",
      population: country.column_values.find(cv => cv.id === "numbers")?.text || '0',
      code: country.column_values.find(cv => cv.id === "iso2")?.text || "-",
    }));

    return formattedCountries;
  },

  getCountriesByName: async (countryName: string) => {
    try {
      const searchCountryName = countryName ?? '';

      const response = await monday.api(`
        query {
          boards(ids: ${boardId}) {
            id
            name
            items_page(limit: 500, query_params: {
              rules: [{column_id: "name", compare_value: ["${searchCountryName}"], operator:contains_terms}]
            }) {
              items {
                id 
                name
                column_values(ids: ["region", "capital", "numbers","iso2"]) {
                  id
                  text
                }
              }
            }
          }
        }
      `);

      const countriesInformations: Item[] = response.data.boards[0].items_page.items;
      
      const formattedCountries = countryService.formatCountriesObject(countriesInformations);

      return formattedCountries;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      throw error;
    }
  },

  getAllCountries: async () => {
    try {

      const response = await monday.api(`
        query {
          boards(ids: ${boardId}) {
            id
            name
            items_page(limit: 500, query_params:  {order_by:[{column_id:"name"}]}) {
              items {
                id 
                name
                column_values(ids: ["region", "capital", "numbers","iso2"]) {
                  id
                  text
                }
              }
            }
          }
        }
      `);

      const countriesInformations: Item[] = response.data.boards[0].items_page.items;
      
      const formattedCountries = countryService.formatCountriesObject(countriesInformations);

      return formattedCountries;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      throw error;
    }
  }
};

export default countryService;
