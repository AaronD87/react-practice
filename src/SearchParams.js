import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from './useDropdown';
import Results from './Results';

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [pets, setPets] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    })
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={e => setLocation(e.target.value)}
          />
        {/* <label htmlFor="animal">
            animal
            <select
              id="animal"
              value={animal}
              onChange={e => setAnimal(e.target.value)}
              onBlur={e => setAnimal(e.target.value)}
            > 
            <option>All</option>
            {breeds.map(animal => (
              <option key={animal} value={animal}>{animal}</option>
            ))}
            </select>
          </label>
          */}
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
