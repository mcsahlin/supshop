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
  constructor(
    id: string,
    label: string,
    price: string,
    options: string[],
    description: string,
    imgLink: string,
    isPills: boolean
  ) {
    this.id = id;
    this.imgLink = imgLink;
    this.price = price;
    this.label = label;
    this.options = options;
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
export const inventory = [] as Product[];
export const pillOptions = ["60 pcs", "120 pcs"] as string[];
export const powderOptions = [
  "Chocolate",
  "Banana",
  "Caramel",
  "Fizzy pop",
  "Jungle Juice",
  "Tropical",
] as string[];

///the static data should not use random id as the products will be different

export function addSamplePack(): Product[] {
  let lorem: string =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, eaque ducimus? Distinctio doloremque inventore architecto fuga consequuntur et, doloribus nesciunt velit nisi, a blanditiis commodi soluta? Pariatur tenetur eum impedit placeat omnis accusantium magni, fuga reiciendis excepturi natus quam dignissimos autem, velit sit consequatur nam id repellendus consequuntur repellat totam dicta doloremque debitis. Aperiam quidem voluptate veniam temporibus consequatur, accusantium sit dignissimos a? Laborum vel illo nihil quae dignissimos reiciendis maiores autem eveniet eum nesciunt dolores dolore sit sed repellendus voluptas, exercitationem explicabo perspiciatis aut consequatur incidunt delectus ad! Molestiae vitae commodi laborum eos, velit facere dignissimos voluptatem quasi nam nemo accusamus qui odit impedit temporibus nostrum obcaecati exercitationem recusandae tenetur iste placeat! Iusto veniam, nesciunt temporibus fuga praesentium ab voluptatum, explicabo aut recusandae, totam suscipit earum. Quo molestiae animi omnis deleniti neque impedit numquam earum praesentium iusto, vitae dolores maxime, tempore optio quod! Facilis reiciendis excepturi placeat. Odit ipsum ipsam dignissimos sunt vero dolorem minus delectus provident laudantium sed, ab quia ut unde fugit explicabo blanditiis.";
  inventory.push(
    new Product(
      "6e3775f4-60b3-c708-09e9-2b8943d47587",
      "BioTechUSA Tribooster, 60 caps",
      "229",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/BIOTECH843_1.jpg?m=1625179915",
      true
    )
  );
  inventory.push(
    new Product(
      "823730ca-dd32-7a6d-37eb-e013e7d961ae",
      "Sportlab Limitless, 60 caps",
      "399",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SPORTLAB753_1.jpg?m=1654808842",
      true
    )
  );
  inventory.push(
    new Product(
      "9bbac052-b260-d097-033a-ee05a5095930",
      "Sportlab Focus, NOO-PEPT, 90 caps",
      "249",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SPORTLAB7853_1.jpg?m=1654808909",
      true
    )
  );
  inventory.push(
    new Product(
      "872ac8ba-3950-39e6-a87f-abb4b32a547e",
      "Sportlab Androgenic Testo Growth, 120 caps",
      "349",
      powderOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SPORTLAB001_1.jpg?m=1654808783",
      false
    )
  );

  inventory.push(
    new Product(
      "7114bd91-dd97-fffc-21de-7d6ea91f1e29",
      "SOLID Nutrition Collagen, 230 g",
      "149",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/SOLID8593.jpg?m=1669844573",
      true
    )
  );
  inventory.push(
    new Product(
      "b3082711-aea3-5e29-9604-180b2534cd24",
      "Chaos Crew Turkesterone HIGH DOSE - 500 mg, 90 caps",
      "599",
      powderOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/CHAOS7583_1.jpg?m=1656360007",
      false
    )
  );
  inventory.push(
    new Product(
      "2f95e709-1f2c-0ec4-3011-784828b2055a",
      "SOLID Nutrition BLACK LINE Turkesterone - 333 mg, 90 caps",
      "549",
      powderOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SOLID75832_1.jpg?m=1661374360",
      false
    )
  );
  inventory.push(
    new Product(
      "4bc59c15-742a-7414-e26f-1308b0952f5d",
      "Optimum Nutrition Opti-Women, 60 caps",
      "189",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/OPTIMUM003_1.jpg?m=1614199819",
      true
    )
  );
  inventory.push(
    new Product(
      "6db9b2da-64eb-48db-caf7-a2ebc33f04b2",
      "Swedish Supplements Vitamin & Mineral Complex",
      "299",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SSVMC_1.jpg?m=1653342949",
      true
    )
  );
  inventory.push(
    new Product(
      "56606634-b18a-0dfc-e1f8-2029a70c9ed4",
      "Star Nutrition Ultimate Omega-3, 90 caps, 80%",
      "229",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/STAR022_1.jpg?m=1614199775",
      true
    )
  );
  inventory.push(
    new Product(
      "7c8b2ddf-3ed3-17e9-d4c1-00ba75cb83f2",
      "Scitec Nutrition Omega 3, 100 caps",
      "139",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SCITEC0012_1.jpg?m=1657827568",
      true
    )
  );

  inventory.push(
    new Product(
      "c2213b55-516b-0702-87ba-657294783b58",
      "BioTechUSA Tribooster, 60 caps",
      "229",
      pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/BIOTECH843_1.jpg?m=1625179915",
      true
    )
  );
  return inventory;
}

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
