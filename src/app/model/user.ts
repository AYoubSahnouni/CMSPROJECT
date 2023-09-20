import { Abonnement } from "./abonnement";
import { Telephone } from "./telephone";

export class User {
  id!:number;
  matricule!:string;
  nom!:string;
  prenom!:string;
  password!:string;
  poste!:string;
  affectation!:string;
  number!:number;
  telephone!: Telephone;
  abonnement!: Abonnement;

}
