import bmcStepOne from "../../../images/bmc-step-1.png";
import bmcStepTwo from "../../../images/bmc-step-2.png";
import bmcStepThree from "../../../images/bmc-step-3.png";
import bmcStepFour from "../../../images/bmc-step-4.png";
import bmcStepFive from "../../../images/bmc-step-5.png";
import bmcStepSix from "../../../images/bmc-step-6.png";
import bmcStepSeven from "../../../images/bmc-step-7.png";
import bmcStepEight from "../../../images/bmc-step-8.png";
import bmcStepNine from "../../../images/bmc-step-9.png";

const stepsData = [
  {
    id: 1,
    title: "Le segment Client",
    description:
      "Le segment client regroupe les destinataires de votre offre de produits ou de services. Identifier le segment client est essentiel, car cette action vous permet d'effectuer un ciblage précis de la clientèle. En effet, il est important d'adapter la gestion de la relation client en fonction du profil type de vos cibles. De même, le choix des canaux de distribution doit correspondre aux caractéristiques du segment client identifié.",
    image: bmcStepOne,
  },
  {
    id: 2,
    title: "La proposition de valeur",
    description:
      "Pour que votre offre ait une chance de se positionner sur le marché, elle doit satisfaire un besoin spécifique ou apporter une solution à un problème défini. Elle est indéniablement liée aux clients cibles.",
    image: bmcStepTwo,
  },
  {
    id: 3,
    title: "Les canaux de distribution",
    description:
      "Pour atteindre un maximum de clients, vous devez utiliser des moyens de communication et de distribution efficaces, englobant tous les éléments mis en œuvre pour atteindre les clients et les mettre en contact avec vos produits ou services.",
    image: bmcStepThree,
  },
  {
    id: 4,
    title: "La relation client",
    description:
      "Pour que votre offre ait une chance de se positionner sur le marché, elle doit répondre à un besoin spécifique ou apporter une solution à un problème défini. Elle est indéniablement liée aux clients cibles.",
    image: bmcStepFour,
  },
  {
    id: 5,
    title: "Les flux de revenus",
    description:
      "Cette rubrique fournit toutes les réponses concernant les revenus générés par votre activité, qu'ils soient réguliers ou ponctuels. Son contenu doit au moins répondre à ces questions : ",
    liste: [
      ". Quel est le prix acceptable ?",
      ". Quel est le revenu total des clients?",
      ". Pour quel type de produit ou service les clients sont-ils disposés à payer?",
      ". Quels sont les modes de paiement les plus couramment utilisés par les clients?",
    ],
    image: bmcStepFive,
  },
  {
    id: 6,
    title: "Les ressources clés",
    description:
      "Cette rubrique expose tous les moyens à déployer pour élaborer un produit ou un service répondant aux attentes des clients. Elle doit ainsi présenter :",
    liste: [
      ". les moyens humains",
      ". les moyens financiers",
      ". les moyens matériels(mobilier, locaux, véhicules…)",
      ". les moyens immatériels (labels, compétences, expériences…)",
    ],

    image: bmcStepSix,
  },
  {
    id: 7,
    title: "Les activités clés",
    description:
      "Il est essentiel de mettre en avant les principales activités qui feront fonctionner l’entreprise. Dans le cadre d’un projet de boutique en ligne, par exemple, vos activités clés incluent : la gestion d'un site internet ou d'une application, l’optimisation de votre visibilité et de votre notoriété sur la Toile, et la commercialisation des produits ou services.",
    image: bmcStepSeven,
  },
  {
    id: 8,
    title: "Les partenaires stratégiques",
    description:
      "Vos partenaires occupent une place stratégique dans la concrétisation de votre projet d’entreprise. Ils ne se limitent pas uniquement aux partenaires financiers tels que les investisseurs et les associés. Ils incluent également les fournisseurs, les sous-traitants, les consultants et les experts.",
    image: bmcStepEight,
  },
  {
    id: 9,
    title: "La structure de coûts",
    description:
      "Pour assurer le bon fonctionnement de votre activité et limiter les mauvaises surprises, vous devez faire le point sur les dépenses nécessaires pour faire  fonctionner votre entreprise. Dans ce contexte, vous devez faire la différence  entre les charges fixes (loyer, salaire des employés, prime d’assurance…) et les charges variables (matières premières, commissions, etc.).",
    image: bmcStepNine,
  },
  // Add more steps here
];

export default stepsData;
