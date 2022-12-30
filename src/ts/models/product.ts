import { createHtml } from "../helpers";
export class Product {
  id: string;
  price: string;
  label: string;
  options: string[]; // If isPowder:
  description: string;
  imgLink: string;
  isPowder: boolean = false;
  isPills: boolean = false;
  readonly pillOptions: string[] = ["60 pcs", "120 pcs"];
  readonly powderOptions = [
    "Chocolate",
    "Banana",
    "Caramel",
    "Fizzy pop",
    "Jungle Juice",
    "Tropical",
  ] as string[];
  constructor(
    label: string,
    price: string,
    // options: [][],
    description: string,
    imgLink: string,
    isPills: boolean
  ) {
    this.id = newId();
    this.imgLink = imgLink;
    this.price = price;
    this.label = label;
    this.options = isPills ? this.pillOptions : this.powderOptions;
    this.description = description;
    this.isPills = isPills;
  }
}
function newId(): string {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1) as string;
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

//  const pillOptions = ] as string[];
// export const powderOptions = [
//   "Chocolate",
//   "Banana",
//   "Caramel",
//   "Fizzy pop",
//   "Jungle Juice",
//   "Tropical",
// ] as string[];

// function samplePack() {
//   let imgList:string[] = [
//     "ApigeninCapsulesSPLASHv2__48047.jpg",
//     "L-GlutathioneTabletsSPLASH__07198.jpg",
//     "MatrineCapsulesSPLASH__85123.jpg",
//     "NADHPowderSPLASH__95475.jpg",
//     "ReducedL-GlutathionePowderSPLASH__99264.jpg",
//     "NMNPowderSPLASH__74856.jpg",
//     "NicotinamideRibosideCapsulesSPLASH__83474.jpg",
//     "Pyridoxal5PhosphateCapsulesSPLASH__79450.jpg",
//     "S-AcetylL-GlutathioneCapsulesSPLASH__90722.jpg",
//     "TongkatAliCapsulesSPLASH__89306.jpg",

//   ];

//   imgList.forEach(index)=>{
//     isPillCheck(index)
//   }
//   function registerItem(){

//     inventory.push(
//       new Product(
//         imgList.map(str)=>{
//           getName(str),
//           "250" || "299" || "590",
//           pillOptions,
//           lorem,
//           str,
//           isPillCheck(str),
//         }))
//       }

//   function getName(item:string):string {
//     let name:string = "";
//     let splits = [] as string[];
//     imgList.forEach(str => {
//       if(item === str){
//         str.slice(str.indexOf("SPLASH",str.length));
//         for(let i = 0; i < str.length; i++){
//           splits = str.split(/A-Ö/);
//           splits.forEach(line=>{
//             name = (name += line + " ");
//           });
//         };
//       }
//     });
//     return name;
//   };
//   function isPillCheck(item):boolean{
//     let key = ["Capsules", "Powder"] as string[];
//     let isPills:boolean = false;
//     imgList.forEach(str=>{
//       if(str === item){
//         if(str.includes(key[0])){
//           isPills = true;
//         };

//       }
//     });
//     return isPills;
//   };

// id
// img
// price
// label
// flavor[]
// details
