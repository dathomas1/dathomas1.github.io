/*
// HELPER FUNCTIONS
*/
function sample_one(arr) {
  let array_length = arr.length;
  if (array_length === 0) {
    throw new Error('No array provided!');
  };
  let index = Math.random() * array_length | 0;
  return arr[index];
};

// From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle_mutation(arr) {
  let current_index = arr.length;

  while (current_index != 0) {
    let random_index = Math.floor(Math.random() * current_index);
    current_index--;
    let temp = arr[current_index];
    arr[current_index] = arr[random_index];
    arr[random_index] = temp;
  }
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function compareNumbers(a, b) {
  return a - b;
};

function integer_lookup(data, value) {
  let keys = Object.keys(data);
  let sorted_keys = keys.sort(compareNumbers);
  for (let key of sorted_keys) {
    if (key >= value) {
      return data[key];
    }
  }
  return null;
};

function num_or_zero(num) {
  const num_value = Number(num);
  return isNaN(num_value) ? 0 : num_value;
};

function add(accumulator, num) {
  return num_or_zero(accumulator) + num_or_zero(num);
};

function sum_array(arr) {
  return arr.reduce(add, 0);
};

function concat_array_to_integer(arr) {
  return Number(arr.join(''));
};

function convert_array_to_dicestring(arr) {
  return arr.join('-');
};

function roll_d6_die() {
  return getRandomIntInclusive(1, 6);
};

function roll_multiple_d6_array(num_of_dice) {
  if (num_of_dice < 1) {
    throw new Error('Number of Dice must be greater than 1!');
  };
  let result_array = [];
  for (let i = 0; i < num_of_dice; i++) {
    result_array.push(roll_d6_die());
  };
  return result_array;
};

function sorted_array(arr) {
  return arr.sort(compareNumbers);
};

function sorted_dicestring(arr) {
  return convert_array_to_dicestring(sorted_array(arr));
};

function roll_2d6_sorted() {
  return sorted_dicestring(roll_multiple_d6_array(2));
};

/// TODO Move this somewhere else
function quality_text_to_key(str, semi_character = SEMI_CHAR, semi_key_prefix = SEMI_PREFIX) {
  let quality_string = str.trim();
  if (quality_string.slice(-1) === semi_character) {
    return semi_key_prefix + quality_string.slice(0, -1).toUpperCase();
  }
  return quality_string.toUpperCase();
}