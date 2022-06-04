import React from "react";
// ASSETS
import EmptyBuildingIcon from "../../../../../assets/images/profile-empty.svg";
import FullBuildingIcon from "../../../../../assets/images/profile-full.svg";
// CLASSES
import classes from "../modules/details/company-actions.module.scss";
import sharedClasses from "../modules/details/user-details.module.scss";

const CompanyActions = ({ company, openModal, deleteProfile }) => {
  const icon = company ? FullBuildingIcon : EmptyBuildingIcon;

  return (
    <div className="mb-3">
      <figure className="m-0 text-center">
        <img src={icon} alt="Ícono" className="mx-auto" />
        <figcaption className={`my-2 ${company ? classes.companyName : sharedClasses.textMuted}`}>{company?.razonSocial || "Vacío"}</figcaption>
      </figure>
      {company && (
        <div className="text-center">
          <button className={`mr-3 ${sharedClasses.editBtn}`} onClick={() => openModal("editProfile", company)}>
            <i className="bx bxs-edit-alt"></i> <span className="underline">Editar</span>
          </button>
          <button className="text-danger underline" onClick={() => deleteProfile(company.id)}>Eliminar</button>
        </div>
      )}
    </div>
  );
}

export default CompanyActions;