/* Small list of breeds available on the App */
const breeds = [
  'American Shorthair',
  'Nebelung',
  'Siamese',
  'Persian',
  'Maine Coon',
  'Ragdoll',
  'Bengal',
  'Aegean',
  'British Shorthair',
  'Scottish Fold',
];

/* Helper shuffle for 6 random indices */
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/* Return 6 random breeds */
export function getRandCatBreeds() {
  return shuffle(breeds).slice(0, 3);
}

const healthTips = {
  'American Shorthair': {
    '1': 'Obesity is common; measure meals and encourage play to protect joints.',
    '2': 'Hypertrophic cardiomyopathy occurs in some lines; listen for heart murmurs at checkups.',
    '3': 'Dental disease is frequent; brush teeth or use vet-approved dental diets.',
    '4': 'Polycystic kidney disease is seen in some pedigrees; monitor kidney values with age.',
    '5': 'Tip: Annual blood pressure screening helps catch hypertension early.',
  },
  Nebelung: {
    '1': 'Shy cats may hide stress; keep routines calm and provide vertical escape spaces.',
    '2': 'Long coat needs regular grooming to reduce hairballs and matting.',
    '3': 'Urinary issues can follow stress; ensure fresh water and clean litter.',
    '4': 'Like Russian Blue relatives, watch for heart disease with regular exams.',
    '5': 'Tip: Slow introductions to new pets reduce anxiety-related illness.',
  },
  Siamese: {
    '1': 'Asthma and respiratory signs warrant prompt vet attention in this breed.',
    '2': 'Dental resorption is relatively common; schedule oral exams.',
    '3': 'Amyloidosis has been reported; watch appetite, weight, and liver enzymes.',
    '4': 'Highly social; isolation can trigger stress-related cystitis or overgrooming.',
    '5': 'Tip: Interactive play daily supports healthy weight and mental health.',
  },
  Persian: {
    '1': 'Brachycephalic airway issues; avoid heat stress and watch for noisy breathing.',
    '2': 'Polycystic kidney disease is prevalent; screen kidneys as recommended by your vet.',
    '3': 'Eye tearing and corneal risk; clean face folds and check eyes often.',
    '4': 'Matting and skin infection without daily grooming.',
    '5': 'Tip: Use wide, shallow bowls to reduce face bumping while eating.',
  },
  'Maine Coon': {
    '1': 'Hypertrophic cardiomyopathy screening is important in breeding lines.',
    '2': 'Hip dysplasia occurs; watch gait and jumping as cats age.',
    '3': 'Spinal muscular atrophy is tested in some programs; know your cat’s status.',
    '4': 'Large frame benefits from joint-friendly perches and weight control.',
    '5': 'Tip: Slow growth diets for kittens may support orthopedic health—ask your vet.',
  },
  Ragdoll: {
    '1': 'HCM occurs in the breed; combine auscultation with imaging per vet advice.',
    '2': 'Urinary stones/struvite crystals—feed appropriate diet and encourage hydration.',
    '3': 'Obesity from low activity; portion control and play.',
    '4': 'Dental care matters; schedule cleanings when advised.',
    '5': 'Tip: Multiple water sources (fountains) can increase fluid intake.',
  },
  Bengal: {
    '1': 'PRA and PK deficiency are known in lines; use responsible breeder testing.',
    '2': 'High energy needs enrichment; boredom can lead to destructive stress.',
    '3': 'Diarrhea from dietary change—transition foods slowly.',
    '4': 'Hypertrophic cardiomyopathy; include cardiac evaluation in wellness plans.',
    '5': 'Tip: Puzzle feeders channel hunting drive and support lean weight.',
  },
  Sphynx: {
    '1': 'Skin oil buildup; regular bathing prevents acne and infections.',
    '2': 'Heat loss; keep warm indoors and limit cold exposure.',
    '3': 'Sunburn risk in strong sun; window UV can affect bare skin.',
    '4': 'Hypertrophic cardiomyopathy; discuss screening with your veterinarian.',
    '5': 'Tip: Sweat and wax can affect ears—gentle cleaning as your vet directs.',
  },
  'British Shorthair': {
    '1': 'Obesity-prone; strict portions and measured feeding.',
    '2': 'HCM appears in the breed; regular cardiac checks are worthwhile.',
    '3': 'Dense coat needs weekly brushing to limit hairballs.',
    '4': 'Polycystic kidney disease in some lines; ask about screening.',
    '5': 'Tip: Vertical scratching posts protect joints compared with jumping from heights.',
  },
  'Scottish Fold': {
    '1': 'Osteochondrodysplasia affects cartilage; avoid breeding Fold-to-Fold per welfare guidance.',
    '2': 'Arthritis and joint pain; keep weight lean and provide soft bedding.',
    '3': 'Ear infections; check folded ears for redness or odor.',
    '4': 'Heart disease can occur; include cardiac auscultation in visits.',
    '5': 'Tip: Ramps or steps to favorite spots reduce repetitive jumping strain.',
  },
} as const;

export interface CatHealthTip {
  breed: keyof typeof healthTips;
  tip: 1 | 2 | 3 | 4 | 5;
}

const TIP_KEYS = ['1', '2', '3', '4', '5'] as const;

export function getRandCatHealthTip(breed: string) {
  const breedTips = healthTips[breed as keyof typeof healthTips];
  if (!breedTips) {
    return 'Consult your veterinarian for breed-specific health guidance.';
  }
  const rand = Math.floor(Math.random() * 5);
  return breedTips[TIP_KEYS[rand]];
}

/* Get breed data from The Cat API */
export async function getCatBreed(breed: string) {
  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds/search?q=${encodeURIComponent(breed)}`,
    {
      cache: 'force-cache',
      headers: { 'x-api-key': process.env.THE_CAT_API_KEY as string },
    }
  );
  const breedData = await res.json();
  const data = breedData[0];
  if (!data) return null;

  if (data.reference_image_id && !data.image?.url) {
    const imgRes = await fetch(
      `https://api.thecatapi.com/v1/images/${data.reference_image_id}`,
      {
        cache: 'force-cache',
        headers: { 'x-api-key': process.env.THE_CAT_API_KEY as string },
      }
    );
    data.image = await imgRes.json();
  }

  return data;
}
