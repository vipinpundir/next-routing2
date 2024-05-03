import React from 'react';

interface Country {
  country: string;
  cities: string[];
}

interface City {
  cities: string[];
}
const getCountryName = async () => {
  try {
    const response = await fetch(`https://countriesnow.space/api/v0.1/countries`);
    const data = await response.json();
    const countryNamesArray = data.data
    return countryNamesArray
  } catch (error) {
    console.error("Error fetching country names:", error);
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  const cname = params.slug;
  const countryData = await getCountryName();
  const filteredCountryData = countryData.find((country: Country) => country.country.toLowerCase() === cname.toLowerCase());

  let citiesList = null;

  if (filteredCountryData && filteredCountryData.cities) {
    const slicedCities = filteredCountryData.cities.slice(0, 5);
    citiesList = slicedCities.map((city: String, index: number) => (
      <li key={index}>{city}</li>
    ));
  }

  return (
    <div >
      <h1>Country: {cname}</h1>
      <ul>
        {citiesList}
      </ul>
    </div>
  );
}
