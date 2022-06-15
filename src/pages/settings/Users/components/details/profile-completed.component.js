import { Box, CircularProgress, Typography } from "@material-ui/core";
import { Check, ErrorOutline, Remove } from "@material-ui/icons";
import { Card, CardBody, CardTitle, Col } from "reactstrap";
// CLASSES
import classes from "../modules/details/profile-completed.module.scss";


const ProfileCompleted = ({ user, color, completed }) => {
  return (
    <Col lg="12" xl="4">
      <Card>
        <CardBody className="d-flex items-center flex-col md:flex-row justify-between lg:justify-around">
          <div>
            <CardTitle>Perfil completado</CardTitle>
            <ul className="lg:ml-3">
              <li style={{ color: "#e4e4e4" }}>
                {user.phone ? <Check htmlColor="#20a2a5" /> : <Remove htmlColor="#afafaf" />} Datos personales
              </li>
              <li style={{ color: "#e4e4e4" }}>
                {user.identityDocumentValidation === "success" ? <Check htmlColor="#20a2a5" /> :
                  user.identityDocumentValidation === "pending" ? <Remove htmlColor="#ffa755" /> :
                    user.identityDocumentValidation === "failed" ? <ErrorOutline htmlColor="#ff4b55" /> :
                      <Remove htmlColor="#afafaf" />} Foto de documento de identidad
              </li>
              <li style={{ color: "#e4e4e4" }}>
                {user.address && user.dateBirth ? <Check htmlColor="#20a2a5" /> : <Remove htmlColor="#afafaf" />} Datos adicionales
              </li>
            </ul>
          </div>
          <div>
            <Box className={`d-block mx-auto mb-2 ${classes.loaderCompleted}`}>
              <Box className={classes.circularProgressCntr}>
                <CircularProgress color="inherit" size={90} thickness={1} value={100} variant="determinate" className={classes.circularProgressBg} />
                <CircularProgress color="inherit" size={90} thickness={2.2} value={completed} variant="determinate" style={{ color }} />
              </Box>
              <Box
                className={classes.labelPercentage}>
                <Typography className={classes.labelTypography}>
                  {completed}%
                </Typography>
              </Box>
            </Box>
            <p className={`text-center text-white ${classes.captionStatusCompleted}`}>
              {!user.phone ? "Debe añadir sus datos personales" :
                user.identityDocumentValidation === "pending" ? "Verificación de identidad en curso" :
                  user.identityDocumentValidation === "failed" ? "Verificación de identidad fallida" :
                    user.identityDocumentValidation === "none" ? "Debe subir la foto del documento de identidad" :
                      !user.address && !user.dateBirth ? "Debe añadir los datos adicionales" : null}
            </p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileCompleted;