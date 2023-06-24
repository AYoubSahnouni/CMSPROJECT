import { Telephone } from "./telephone";

export class User {
  id!:number;
  matricule!:string;
  nom!:string;
  prenom!:string;
  password!:string;
  poste!:string;
  siege!:string;
  number!:number;
  telephone!: Telephone;
}
