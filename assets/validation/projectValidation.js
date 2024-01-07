import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  profileImage: Yup.mixed().test(
    "fileSize",
    "File size is too large",
    (value) => {
      if (!value) return true;
      return value.size <= 1000000;
    }
  ),
  couleurPrincipal: Yup.string().required("Couleur principale is required"),
  couleurSecondaire: Yup.string().required("Couleur secondaire is required"),
  couleurMenu: Yup.string().required("Couleur de menu is required"),
  name: Yup.string().required("Nom du projet is required"),
  slogan: Yup.string().required("Slogan is required"),
  adressSiegeSocial: Yup.string().required("Siége social is required"),
  siret: Yup.number().required("Siret is required"),
  codePostal: Yup.number().required("Siret is required"),
});

export default projectSchema;
