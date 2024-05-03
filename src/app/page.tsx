"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Country {
  country: string;
}

export default function Home() {

  const [countryNames, setCountryNames] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')

  const getCountryName = async () => {
    try {
      const response = await fetch(`https://countriesnow.space/api/v0.1/countries`);
      const data = await response.json();
      const countryNamesArray = data.data
      setCountryNames(countryNamesArray);
    } catch (error) {
      console.error("Error fetching country names:", error);
    }
  };

  useEffect(() => {
    getCountryName()
  }, [])
  
  
 
  return (
    <div className="Home" >
      <select onChange={(e)=>setSelectedCountry(e.target.value)} id="county">
        <option value=''>Select country</option>
        {countryNames.map((county, index) => (
          <option key={index} value={county.country}>
            {county.country}
          </option>
        ))}
      </select>
      <button><Link href={'/country/'+selectedCountry} > Get city </Link></button>

    </div>
  );
};

