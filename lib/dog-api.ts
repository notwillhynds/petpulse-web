/* Small list of breeds available on the App */
const breeds = [
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'French Bulldog',
  'Bulldog',
  'Basset Bleu de Gascogne',
  'Beagle',
  'Rottweiler',
  'Border Collie',
  'Pyrenean Mountain Dog',
];

const healthTips = {
  'Labrador Retriever': {
    '1': 'Watch for hip and elbow dysplasia: signs include limping, stiffness, or difficulty standing up.',
    '2': 'Obesity is very common; maintain ideal weight through diet and exercise to prevent joint issues and diabetes.',
    '3': 'Exercise-induced collapse can occur; monitor during intense activity and provide rest periods.',
    '4': 'Regular vet screenings for cancer, as Labs have higher risk.',
    '5': 'Tip: Use joint supplements and provide orthopedic bedding for large breed support.',
  },
  'German Shepherd': {
    '1': 'Hip and elbow dysplasia common - look for limping or reluctance to move.',
    '2': 'Degenerative myelopathy: early sign is hind leg weakness and incoordination.',
    '3': 'High risk of bloat (GDV); feed smaller meals and avoid exercise after eating.',
    '4': 'Prone to allergies and skin issues; watch for excessive scratching or hot spots.',
    '5': 'Tip: Regular physical therapy and weight management to support joints.',
  },
  'Golden Retriever': {
    '1': 'High cancer risk (e.g., lymphoma, hemangiosarcoma) - monitor for lumps, weight loss, lethargy.',
    '2': 'Hip and elbow dysplasia - signs include lameness and pain.',
    '3': 'Ear infections common due to floppy ears; check and clean regularly.',
    '4': 'Skin conditions and allergies; watch for itching and hot spots.',
    '5': 'Tip: Annual health screenings and maintain healthy weight.',
  },
  'French Bulldog': {
    '1': 'Brachycephalic airway syndrome: watch for noisy breathing, overheating, exercise intolerance.',
    '2': 'Skin fold dermatitis: clean skin folds daily to prevent infections.',
    '3': 'Spinal issues like IVDD - monitor for back pain or paralysis signs.',
    '4': 'Eye problems common; watch for redness, discharge or squinting.',
    '5': 'Tip: Avoid heat and strenuous exercise; use cooling vests in warm weather.',
  },
  Bulldog: {
    '1': 'Brachycephalic syndrome: signs include snoring, labored breathing, heat intolerance.',
    '2': 'Skin infections in folds; daily cleaning essential.',
    '3': 'Hip dysplasia and joint problems common in this heavy breed.',
    '4': 'Watch for cherry eye or other eye issues.',
    '5': 'Tip: Keep weight in check as obesity worsens breathing problems.',
  },
  Poodle: {
    '1': "Prone to Addison's disease and Cushing's; watch for lethargy, increased thirst/urination.",
    '2': 'Dental disease common; brush teeth regularly.',
    '3': 'Epilepsy risk; monitor for seizures.',
    '4': 'Eye issues like progressive retinal atrophy.',
    '5': 'Tip: Regular grooming prevents skin issues and mats.',
  },
  Beagle: {
    '1': 'Obesity prone; control portions and provide exercise.',
    '2': 'Epilepsy: watch for seizure activity.',
    '3': 'Hypothyroidism signs: weight gain, hair loss, lethargy.',
    '4': 'Intervertebral disc disease risk due to long back.',
    '5': 'Tip: Regular ear cleaning due to floppy ears and infection risk.',
  },
  Rottweiler: {
    '1': 'Hip and elbow dysplasia very common - early screening important.',
    '2': 'Osteosarcoma (bone cancer) risk; monitor for lameness or swelling.',
    '3': 'Heart conditions like aortic stenosis.',
    '4': 'Prone to bloat; feed appropriately.',
    '5': 'Tip: Maintain lean muscle through proper diet and exercise.',
  },
  'Border Collie': {
    '1': 'Hip dysplasia and elbow issues; watch for lameness.',
    '2': 'Epilepsy common; observe for seizures.',
    '3': 'Collie eye anomaly - regular eye exams.',
    '4': 'High energy; mental stimulation needed to prevent anxiety/behavior issues.',
    '5': 'Tip: Provide lots of exercise and herding activities for mental health.',
  },
  'Yorkshire Terrier': {
    '1': 'Patellar luxation: signs include skipping or holding up leg.',
    '2': 'Tracheal collapse: honking cough, especially when excited.',
    '3': 'Dental problems very common; regular dental care critical.',
    '4': 'Portosystemic shunt (liver issue); watch for neurological signs.',
    '5': 'Tip: Avoid jumping from high places to protect knees and back.',
  },
};

/* Helper shuffle for 6 random indices */
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/* Return 6 random breeds */
export function getRandDogBreeds() {
  return shuffle(breeds).slice(0, 3);
}

export interface HealthTip {
  breed:
    | 'Labrador Retriever'
    | 'German Shepherd'
    | 'Golden Retriever'
    | 'French Bulldog'
    | 'Bulldog'
    | 'Poodle'
    | 'Beagle'
    | 'Rottweiler'
    | 'Border Collie'
    | 'Yorkshire Terrier';
  tip: 1 | 2 | 3 | 4 | 5;
}

const TIP_KEYS = ['1', '2', '3', '4', '5'] as const;

export function getRandDogHealthTip(breed: string) {
  const breedTips = healthTips[breed as keyof typeof healthTips];
  if (!breedTips) {
    return 'Consult your veterinarian for breed-specific health guidance.';
  }
  const rand = Math.floor(Math.random() * 5);
  return breedTips[TIP_KEYS[rand]];
}

/* Get breed data from The Dog API */
export async function getDogBreed(breed: string) {
  const data = await fetch(
    `https://api.thedogapi.com/v1/breeds/search?q=${encodeURIComponent(breed)}`,
    {
      next: { revalidate: 3600 },
      headers: {
        'x-api-key': process.env.THE_DOG_API_KEY as string,
      },
    }
  );
  const breedData = await data.json();
  return breedData[0];
}
