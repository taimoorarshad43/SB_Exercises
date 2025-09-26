const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
d.bark()  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
s.bleet() //"BAAAAaaaa"


// Write an ES2015 Version
const createAnimal = (species, verb, noise) => ({
  species,
  [verb]() {
    return noise;
  }
});

