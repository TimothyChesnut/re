import React, { useState } from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function AddWeapon(props) {
  // weaponName, barrel, magazine, photo
  const [weaponName, setWeaponName] = useState("");
  const [barrel, setBarrelName] = useState("");
  const [magazine, setMagazine] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [lightLevel, setLightLevel] = useState("");

  const doWork = () => {
    const newWeapon = {
      id: nanoid(),
      weaponName: weaponName,
      barrel: barrel,
      magazine: magazine,
      image: URL.createObjectURL(selectedFile),
      lightLevel: parseInt(lightLevel),
    };
    props.addWeapon(newWeapon);
  };

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="row" id="addWeapon">
      <h3>Add Weapon</h3>
      <div className="col-md-2">
        <label htmlFor="txtWeaponName" className="form-label">
          Weapon Name
        </label>
        <input
          type="text"
          id="txtWeaponName"
          placeholder="Weapon Name"
          className="form-control"
          onChange={(evt) => setWeaponName(evt.currentTarget.value)}
          value={weaponName}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtBarrel" className="form-label">
          Barrel
        </label>
        <input
          type="text"
          id="txtBarrel"
          placeholder="Barrel"
          className="form-control"
          onChange={(evt) => setBarrelName(evt.currentTarget.value)}
          value={barrel}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtMagazine" className="form-label">
          Magazine
        </label>
        <input
          type="text"
          id="txtMagazine"
          placeholder="Magazine"
          className="form-control"
          onChange={(evt) => setMagazine(evt.currentTarget.value)}
          value={magazine}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="fileUpload" className="form-label">
          Weapon Image
        </label>
        <input className="form-control" type="file" name="file" id="fileUpload" onChange={imageUpdate} />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtLightLevel" className="form-label">
          Light Level
        </label>
        <input
          type="number"
          id="txtLightLevel"
          placeholder="1600"
          className="form-control"
          onChange={(evt) => setLightLevel(evt.currentTarget.value)}
          value={lightLevel}
        />
      </div>
      <div className="col-md-2">
        <button type="button" id="btnAdd" className="btn btn-success btn-lg my-4" onClick={doWork}>
          Add <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </div>
    </div>
  );
}

export default AddWeapon;
