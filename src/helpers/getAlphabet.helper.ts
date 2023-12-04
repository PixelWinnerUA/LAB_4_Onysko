import {ALPHABET, ALPHABET_WITH_NUMBERS, ALPHABET_WITH_NUMBERS_AND_SYMBOLS} from "../constants";
import {AlphabetSizes} from "../types";

export const getAlphabet = (number: AlphabetSizes): string => {
    switch (number) {
        case 52:
            return ALPHABET
        case 62:
            return ALPHABET_WITH_NUMBERS
        case 85:
            return ALPHABET_WITH_NUMBERS_AND_SYMBOLS
    }
}