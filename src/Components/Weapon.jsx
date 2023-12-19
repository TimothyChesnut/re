import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import "./Weapon.css";
import { first } from "lodash";

function Weapon(props) {
  const [weaponName, setWeaponName] = useState("");
  const [barrel, setBarrelName] = useState("");
  const [magazine, setMagazine] = useState("");
  const [lightLevel, setLightLevel] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setWeaponName(props.weapon.weaponName);
    setBarrelName(props.weapon.barrel);
    setMagazine(props.weapon.magazine);
    setLightLevel(props.weapon.lightLevel);
  }, []);

  const saveWeapon = () => {
    setEditMode(false);

    const updatedWeapon = {
      weaponName: weaponName,
      barrel: barrel,
      magazine: magazine,
      lightLevel: lightLevel,
      id: props.weapon.id,
      image: props.weapon.image,
    };
    props.updateWeapon(updatedWeapon);
  };

  return (
    <div className="card my-2">
      <img src={props.weapon.image} alt="Our Weapons" className="card-img-top mx-auto" />
      {!editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">{props.weapon.weaponName}</li>
          <li className="list-group-item text-center">{props.weapon.barrel}</li>
          <li className="list-group-item text-center">{props.weapon.magazine}</li>
          <li className="list-group-item text-center">{props.weapon.lightLevel}</li>
          <button type="button" className="btn btn-danger" onClick={() => props.removeWeapon(props.weapon)}>
            Delete Weapon <FontAwesomeIcon icon={faWarning} />
          </button>
          <button type="button" className="btn btn-warning" onClick={() => setEditMode(true)}>
            Edit Weapon <FontAwesomeIcon icon={faMagicWandSparkles} />
          </button>
        </ul>
      )}
      {editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={weaponName}
              onChange={(evt) => setWeaponName(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={barrel}
              onChange={(evt) => setBarrelName(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={magazine}
              onChange={(evt) => setMagazine(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="number"
              className="form-control"
              value={lightLevel}
              onChange={(evt) => setLightLevel(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group item">
            <button id="btnSave" className="btn btn-secondary" onClick={saveWeapon}>
              Save Weapon
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Weapon;
