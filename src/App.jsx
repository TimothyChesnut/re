import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import _ from "lodash";
import "./App.css";
import AddWeapon from "./Components/AddWeapon";
import Weapon from "./Components/Weapon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  // Declaring all hooks
  const [allWeapons, setAllWeapons] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [keywords, setKeywords] = useState("");
  const [lightLevel, setLightLevel] = useState("");

  // Allows data to appear on page load
  useEffect(() => {
    if (localStorage) {
      const weaponsLocalStorage = JSON.parse(localStorage.getItem("weapon"));

      if (weaponsLocalStorage) {
        saveWeapons(weaponsLocalStorage);
      } else {
        saveWeapons(weapons);
      }
    }
  }, []);

  // Loading data and making it appear
  const saveWeapons = (weapons) => {
    setAllWeapons(weapons);
    setSearchResults(weapons);

    if (localStorage) {
      localStorage.setItem("weapon", JSON.stringify(weapons));
      console.log("saved to local storage");
    }
  };

  // Array methods for adding entities of data
  const addWeapon = (newWeapon) => {
    const updatedWeapons = [...allWeapons, newWeapon];
    saveWeapons(updatedWeapons);
  };

  // Beginning of additive search function
  const searchWeapons = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(" ");
    }

    if (lightLevel) {
      keywordsArray.push(lightLevel.toString());
    }

    if (keywordsArray.length > 0) {
      const searchResults = allWeapons.filter((weapon) => {
        for (const word of keywordsArray) {
          if (
            weapon.weaponName.toLowerCase().includes(word) ||
            weapon.barrel.toLowerCase().includes(word) ||
            weapon.magazine.toLowerCase().includes(word) ||
            weapon.lightLevel === parseInt(word)
          ) {
            return true;
          }
        }
        return false;
      });
      // Allows the search function to work by making no specific search default results
      setSearchResults(searchResults);
    } else {
      setSearchResults(allWeapons);
    }
  };

  // Function for removing entities of data
  const removeWeapon = (weaponToDelete) => {
    // console.table(weaponToDelete);
    const updatedWeaponsArray = allWeapons.filter((weapon) => weapon.id !== weaponToDelete.id);
    saveWeapons(updatedWeaponsArray);
  };

  const updateWeapon = (updatedWeapon) => {
    // console.table(updatedWeapon);
    const updatedWeaponsArray = allWeapons.map((weapon) =>
      weapon.id === updatedWeapon.id ? { ...weapon, ...updatedWeapon } : weapon
    );
    saveWeapons(updatedWeaponsArray);
  };

  // Dummy data
  const weapons = [
    {
      id: nanoid(),
      weaponName: "Albruna-D",
      barrel: "Fluted Barrel",
      magazine: "Steady Rounds",
      image: "images/albruna-d.jpg",
      lightLevel: 1730,
    },
    {
      id: nanoid(),
      weaponName: "Borrowed Time",
      barrel: "Smallbore",
      magazine: "Tactical Magazine",
      image: "images/borrowed-time.jpg",
      lightLevel: 1710,
    },
    {
      id: nanoid(),
      weaponName: "Breakneck",
      barrel: "Extended Barrel",
      magazine: "Extended Magazine",
      image: "images/breakneck.jpg",
      lightLevel: 1810,
    },
    {
      id: nanoid(),
      weaponName: "Dead Weight",
      barrel: "Smoothbore",
      magazine: "Assault Mag",
      image: "images/dead-weight.jpg",
      lightLevel: 1700,
    },
    {
      id: nanoid(),
      weaponName: "Laser Painter",
      barrel: "Polygonal Rifling",
      magazine: "Liquid Coils",
      image: "images/laser-painter.jpg",
      lightLevel: 1770,
    },
    {
      id: nanoid(),
      weaponName: "Qua Xaphan V",
      barrel: "Chambered Compensator",
      magazine: "Flared Magwell",
      image: "images/qua-xaphan-v.jpg",
      lightLevel: 1770,
    },
    {
      id: nanoid(),
      weaponName: "Trinary System",
      barrel: "Corkscrew Rifling",
      magazine: "Accelerated Coils",
      image: "images/trinary-system.jpg",
      lightLevel: 1730,
    },
    {
      id: nanoid(),
      weaponName: "Trust",
      barrel: "Hammer-Forged Rifling",
      magazine: "Accurized Rounds",
      image: "images/trust.jpg",
      lightLevel: 1800,
    },
    {
      id: nanoid(),
      weaponName: "Servant Leader",
      barrel: "Full Bore",
      magazine: "Light Mag",
      image: "images/servant-leader.jpg",
      lightLevel: 1760,
    },
    {
      id: nanoid(),
      weaponName: "Yesteryear",
      barrel: "Arrowhead Brake",
      magazine: "Ricochet Rounds",
      image: "images/yesteryear.jpg",
      lightLevel: 1800,
    },
  ];

  // HTML for showing each entity of data and their remove buttons
  return (
    
    <div className="container my-5">
      <div className="row mt-4" id="searchWeapons">
        <h3>Search Weapons</h3>
        <div className="col-md-5">
          <label htmlFor="txtKeywords">Search by Weapon Name, Magazine, or Barrel</label>
          <input
            type="text"
            className="form-control"
            placeholder="Malfeasance"
            id="txtKeywords"
            onChange={(evt) => setKeywords(evt.currentTarget.value)}
            value={keywords}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="lightLevel">Search by Light Level</label>
          <select value={lightLevel} onChange={(evt) => setLightLevel(evt.currentTarget.value)} className="form-select">
            <option value="">None Specified</option>
            {_(allWeapons)
              .map((weapon) => weapon.lightLevel)
              .sort()
              .uniq()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              .value()}
          </select>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-primary my-4" onClick={searchWeapons}>
            Search <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="row" id="allWeapons">
        <h3>Current Weapons</h3>
        {searchResults &&
          searchResults.map((weapon) => (
            <div className="col-md-4" key={weapon.id}>
              <Weapon weapon={weapon} removeWeapon={removeWeapon} updateWeapon={updateWeapon} />
            </div>
          ))}
      </div>

      {/* {!allWeapons && (
        <button type="button" className="btn btn-lg btn-success" onClick={() => saveWeapons(weapons)}>
          Save Weapons
        </button>
      )} */}
      {/* HTML for add weapon inputs, buttons, and search input and buttons */}
      <AddWeapon addWeapon={addWeapon} />
    </div>
  );
}

export default App;
