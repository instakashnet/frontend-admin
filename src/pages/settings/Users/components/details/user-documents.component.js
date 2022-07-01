import { Photo } from "@material-ui/icons";
import { Card, CardBody, CardTitle } from "reactstrap";

const UserDocuments = ({ user, openModal }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="text-center">Fotos de documento</CardTitle>
        <div className="flex flex-wrap items-center justify-center mt-4">
          {user?.documentType === "pasaporte" ? (
            <>
              {!user?.identityPhotoFront ? (
                <button className="underline mx-6" onClick={() => openModal("addDocument", user, "identity_photo")}>
                  Agregar foto pasaporte
                </button>
              ) : (
                <div className="flex flex-col items-center mx-6">
                  <a className="flex flex-col items-center justify-center" href={user.identityPhotoFront} target="_blank" rel="noopener noreferrer">
                    <Photo size={35} />
                    <p className="text-muted mb-1">Foto pasaporte</p>
                  </a>
                  <button className="underline" onClick={() => openModal("addDocument", user, "identity_photo")}>
                    Cambiar foto
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {!user?.identityPhotoFront ? (
                <button className="underline mx-6 mb-2" onClick={() => openModal("addDocument", user, "identity_photo")}>
                  Agregar foto frontal
                </button>
              ) : (
                <div className="flex flex-col items-center mx-6 mb-3 sm:mb-0">
                  <a className="flex flex-col items-center justify-center" href={user.identityPhotoFront} target="_blank" rel="noopener noreferrer">
                    <Photo size={35} />
                    <p className="text-muted mb-1">Foto frontal</p>
                  </a>
                  <button className="underline" onClick={() => openModal("addDocument", user, "identity_photo")}>
                    Cambiar foto
                  </button>
                </div>
              )}

              {!user?.identityPhotoBack ? (
                <button className="underline mx-6 mb-2" onClick={() => openModal("addDocument", user, "identity_photo_two")}>
                  Agregar foto trasera
                </button>
              ) : (
                <div className="flex flex-col items-center mx-6 mb-3 sm:mb-0">
                  <a className="flex flex-col items-center justify-center" href={user.identityPhotoBack} target="_blank" rel="noopener noreferrer">
                    <Photo size={35} />
                    <p className="text-muted mb-1">Foto trasera</p>
                  </a>
                  <button className="underline" onClick={() => openModal("addDocument", user, "identity_photo_two")}>
                    Cambiar foto
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default UserDocuments;