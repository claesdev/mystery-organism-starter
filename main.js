/*
TODO:

  If you’d like to challenge yourself further, you could consider the following:

  * Create a .complementStrand() method to the factory function’s object that returns the complementary DNA strand. The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa. (Check the hint for more details)
  
  * Use the .compareDNA() to find the two most related instances of pAequor.

*/

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const uniqueSpecimenNums = []

// P. aequor factory
const pAequorFactory = (specimenNum, dna) => {
  if (typeof specimenNum !== 'number'
    || typeof dna !== 'object'
    || dna.length !== 15) {
    return undefined;
  }

  while (true) {
    if (uniqueSpecimenNums.includes(specimenNum)) {
      specimenNum++;
    } else {
      break;
    }
  }

  return {
    specimenNum,
    dna,
    mutate() {
      let randomIndex = Math.floor(Math.random() * 15);
      let randomBase = returnRandBase();

      while (dna[randomIndex] === randomBase) {
        randomBase = returnRandBase();
      }

      dna[randomIndex] = randomBase;

      return this.dna;
    },
    compareDNA(anotherQAequor) {
      let hitCounter = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === anotherQAequor.dna[i]) {
          hitCounter++;
        }
      }

      const dnaMatchPercentage = hitCounter / 15;
      return `Specimen #${this.specimenNum} and specimen #${anotherQAequor.specimenNum} have ${Math.round(dnaMatchPercentage * 100)}% DNA in common`;
    },
    willLikelySurvive() {
      let cOrGBasesCounter = 0;
      this.dna.forEach(base => {
        if (base === 'C' || base === 'G') {
          cOrGBasesCounter++;
        }
      });
      if (cOrGBasesCounter / 15 >= .6) {
        return true;
      } else {
        return false;
      }
    }
  }
}

// Created an array with 30 P. aequor objects
const pAequorArray = [];
for (let i = 0; i < 30; i++) {
  pAequorArray.push(pAequorFactory(Math.floor(Math.random() * 1000  ), mockUpStrand()));
}







