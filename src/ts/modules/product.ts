import { createHtml } from "../_functions";
const inventory = [] as Product[];
const pillOptions = ["60 pcs", "120 pcs"] as string[];
const powderOptions = [
  "Chocolate",
  "Banana",
  "Caramel",
  "Fizzy pop",
  "Jungle Juice",
  "Tropical",
] as string[];
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
    label: string,
    price: string,
    options: string[],
    description: string,
    imgLink: string,
    isPills: boolean
  ) {
    this.id = newId();
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

export function addSamplePack() {
  let lorem: string =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, eaque ducimus? Distinctio doloremque inventore architecto fuga consequuntur et, doloribus nesciunt velit nisi, a blanditiis commodi soluta? Pariatur tenetur eum impedit placeat omnis accusantium magni, fuga reiciendis excepturi natus quam dignissimos autem, velit sit consequatur nam id repellendus consequuntur repellat totam dicta doloremque debitis. Aperiam quidem voluptate veniam temporibus consequatur, accusantium sit dignissimos a? Laborum vel illo nihil quae dignissimos reiciendis maiores autem eveniet eum nesciunt dolores dolore sit sed repellendus voluptas, exercitationem explicabo perspiciatis aut consequatur incidunt delectus ad! Molestiae vitae commodi laborum eos, velit facere dignissimos voluptatem quasi nam nemo accusamus qui odit impedit temporibus nostrum obcaecati exercitationem recusandae tenetur iste placeat! Iusto veniam, nesciunt temporibus fuga praesentium ab voluptatum, explicabo aut recusandae, totam suscipit earum. Quo molestiae animi omnis deleniti neque impedit numquam earum praesentium iusto, vitae dolores maxime, tempore optio quod! Facilis reiciendis excepturi placeat. Odit ipsum ipsam dignissimos sunt vero dolorem minus delectus provident laudantium sed, ab quia ut unde fugit explicabo blanditiis. Dolor, odit aliquam exercitationem, eligendi itaque aspernatur laborum repellendus expedita tenetur ducimus, est vel hic! Mollitia nulla dolor accusantium, rerum quam quod, vitae repellendus temporibus nostrum impedit ipsam cum sequi iusto ducimus quia quidem eum omnis voluptatum quo nisi delectus incidunt vel magni. Perferendis suscipit nisi hic harum ratione, cum non eius officiis blanditiis soluta, illum alias officia dolores facilis quis ex, quaerat repudiandae ducimus voluptate mollitia quas laudantium esse dignissimos. Quibusdam, voluptatum ullam aperiam atque veniam dicta earum fugit sunt labore fugiat eaque. Animi atque unde possimus, nam, quam veniam at praesentium obcaecati autem id quos quod harum, doloribus asperiores iste odit labore aut deleniti inventore aperiam exercitationem ducimus assumenda ipsam. Expedita libero ad dolorem quo sed perferendis aut ipsa nulla tempore ducimus quae, amet eum optio asperiores, fugiat cumque aspernatur alias exercitationem officiis id accusantium! Rem consectetur aspernatur perspiciatis asperiores quo, deserunt sunt sint impedit beatae expedita magnam voluptates. Ipsum quae totam odit dolor, esse architecto iure fuga sit! Necessitatibus expedita, fuga tempore nobis vitae, corrupti pariatur doloribus numquam iure nam quos earum veniam? Corrupti aut explicabo sit iste architecto, sunt officia fugiat harum cum ad sed quaerat culpa ullam voluptate tempore praesentium doloremque deserunt? Iusto facere consequuntur nulla ullam minima dolores cumque, ut illum, animi officiis vitae ipsum amet, quis praesentium quia commodi? Sapiente, illum. Blanditiis numquam id dolores nam! Sint incidunt exercitationem ipsam sit. Omnis blanditiis provident corrupti debitis? Id optio sit excepturi provident similique? Id nam illo harum provident tempore eveniet, aperiam ducimus a eaque dolorum reprehenderit porro voluptas dolorem velit, nulla cum expedita repudiandae nobis ratione ad. Quaerat placeat provident est obcaecati, corporis doloremque. Quasi saepe facere itaque commodi nisi laboriosam sapiente quibusdam est, id placeat qui cupiditate sunt ipsum ullam aliquid eveniet! Nobis cum laudantium veritatis eius earum rerum libero quas ratione voluptates, consectetur ex, repellat nihil quae nostrum omnis mollitia optio neque perspiciatis dolor molestiae vel laborum illo asperiores! Fuga quo porro sapiente dolores, molestiae expedita voluptate, veniam, eius quibusdam cumque dolorem inventore doloremque exercitationem!";
  new Product(
    "Apigenin, Caps.",
    "299",
    pillOptions,
    lorem,
    "ApigeninCapsulesSPLASHv2__48047.jpg",
    true
  );
  new Product(
    "L-Glutathione, Tabl.",
    "349",
    pillOptions,
    lorem,
    "L-GlutathioneTabletsSPLASH__07198.jpg",
    true
  );
  new Product(
    "Matrine, Caps.",
    "429",
    pillOptions,
    lorem,
    "MatrineCapsulesSPLASH__85123.jpg",
    true
  );
  new Product(
    "NADH, Powder",
    "350",
    powderOptions,
    lorem,
    "NADHPowderSPLASH__95475.jpg",
    false
  );
  new Product(
    "Reduced L-Glutathione, Powder",
    "250",
    powderOptions,
    lorem,
    "ReducedL-GlutathionePowderSPLASH__99264.jpg",
    false
  );
  new Product(
    "NMN, Powder",
    "750",
    powderOptions,
    lorem,
    "NMNPowderSPLASH__74856.jpg",
    false
  );
  new Product(
    "Nicotinamide Riboside, Caps.",
    "450",
    pillOptions,
    lorem,
    "NicotinamideRibosideCapsulesSPLASH__83474.jpg",
    true
  );
  new Product(
    "Pyridoxal-5-Phosphate, Caps.",
    "750",
    pillOptions,
    lorem,
    "Pyridoxal5PhosphateCapsulesSPLASH__79450.jpg",
    true
  );
  new Product(
    "S-AcetylL-Glutathione, Caps.",
    "229",
    pillOptions,
    lorem,
    "S-AcetylL-GlutathioneCapsulesSPLASH__90722.jpg",
    true
  );
  new Product(
    "Tongkat Ali, Caps.",
    "349",
    pillOptions,
    lorem,
    "TongkatAliCapsulesSPLASH__89306.jpg",
    true
  );
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

//   function getName(item): string {
//     let name : string;
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
//         return name;
//       }
//     });
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
