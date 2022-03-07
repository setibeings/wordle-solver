import { big_list } from "./word_list.ts";

const exclude_letters = Deno.args[0].toLowerCase();

const exclude_pattern = `(?=[^${exclude_letters}]{5})`;

const include_letters = Deno.args[1].toLowerCase();

let include_pattern = "";

for (let i = 0; i < include_letters.length; i += 2) {
    const number = Number(include_letters[i]);
    const letter_pattern = ".*" + include_letters[i + 1];
    include_pattern += "(?=" + letter_pattern.repeat(number) + ")";
}

const position_pattern = Deno.args[2].toLowerCase();

const my_regex = exclude_pattern + include_pattern + "^" + position_pattern + "$";

console.log(my_regex)

// I can't think of a way to integrate this pattern into the main pattern yet,
// but I'm  Just keeping this in my back pocket to filter for words that
// contain at least some of the  listed letters.
// const my_regex = "(?=(?:.*[dlmprv]){3}))";

const match_list = big_list.filter(s => s.match(my_regex));

for (const match of match_list) {
    console.log(match);
}