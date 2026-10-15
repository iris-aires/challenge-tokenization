const imageRepository = "https://github.com/iris-aires/nft-images";
const imageRevision = "599bfd8734acc82df5d09f01e3963272c6c9d51b";
const imageBaseUrl = `https://raw.githubusercontent.com/iris-aires/nft-images/${imageRevision}`;

const characters = [
  { file: "01_azure_fox_knight.png", name: "Azure Fox Knight", character: "Fox", role: "Knight" },
  { file: "02_starlight_panda_wizard.png", name: "Starlight Panda Wizard", character: "Panda", role: "Wizard" },
  { file: "03_emerald_crystal_dragon.png", name: "Emerald Crystal Dragon", character: "Dragon", role: "Guardian" },
  { file: "04_crescent_moon_fairy.png", name: "Crescent Moon Fairy", character: "Fairy", role: "Moon Keeper" },
  { file: "05_melody_owl_bard.png", name: "Melody Owl Bard", character: "Owl", role: "Bard" },
  { file: "06_pink_slime_baker.png", name: "Pink Slime Baker", character: "Slime", role: "Baker" },
  { file: "07_tiger_pirate_scout.png", name: "Tiger Pirate Scout", character: "Tiger", role: "Pirate Scout" },
  { file: "08_blossom_deer_alchemist.png", name: "Blossom Deer Alchemist", character: "Deer", role: "Alchemist" },
  { file: "09_forest_corgi_archer.png", name: "Forest Corgi Archer", character: "Corgi", role: "Archer" },
  { file: "10_cosmic_robot_mouse.png", name: "Cosmic Robot Mouse", character: "Robot Mouse", role: "Cosmic Explorer" },
];

const nftsMetadata = characters.map(({ file, name, character, role }) => ({
  name,
  description: `${name}, a collectible fantasy character from the iris-aires NFT image collection.`,
  external_url: `${imageRepository}/blob/${imageRevision}/${file}`,
  image: `${imageBaseUrl}/${file}`,
  attributes: [
    { trait_type: "Collection", value: "Fantasy Characters" },
    { trait_type: "Character", value: character },
    { trait_type: "Role", value: role },
  ],
}));

export type NFTMetaData = (typeof nftsMetadata)[number];

export default nftsMetadata;
