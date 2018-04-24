'use strict';

/**
 * Возвращает true если слово попадается в заданной головоломке.
 * Каждое слово может быть построено при помощи прохода "змейкой" по таблице вверх, влево, вправо, вниз.
 * Каждый символ может быть использован только один раз ("змейка" не может пересекать себя).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (первая строка)
 *   'REACT'     => true   (начиная с верхней правой R и дальше ↓ ← ← ↓)
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (первая колонка)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {

    let len = searchStr.length;

    let rows = puzzle.length;
    let columns = puzzle[0].length;
    let indicies = [];

    for (let i = 0; i < rows; i++){
        if (typeof puzzle[i] === 'string'){
            puzzle[i] = puzzle[i].split('');
        }
        for (let j = 0; j < columns; j++){
            if (puzzle[i][j] === searchStr[0]){
                indicies.push([[i, j]]);
            }
        }
    }


    let current = 1;

    while (current < len && indicies.length > 0){
        let newIndicies = [];
        indicies.forEach((chain) => {
            let last = chain[chain.length - 1];
            let i = last[0];
            let j = last[1];

            // Check surrounding symbols

            if ((puzzle[i + 1] !== undefined) && (puzzle[i + 1][j] === searchStr[current])){
                let found = false;
                chain.forEach((pair) => {
                    if (pair === [i + 1, j]){
                        found = true;
                    }
                });
                if (!found){
                    let newChain = chain;
                    newChain.push([i + 1, j]);
                    newIndicies.push(newChain);
                }
            }

            if ((i - 1 > 0) && puzzle[i - 1][j] === searchStr[current]){
                let found = false;
                chain.forEach((pair) => {
                    if (pair === [i - 1, j]){
                        found = true;
                    }
                });
                if (!found){
                    let newChain = chain;
                    newChain.push([i - 1, j]);
                    newIndicies.push(newChain);
                }
            }

            if (puzzle[i][j + 1] !== undefined && puzzle[i][j + 1] === searchStr[current]){
                let found = false;
                chain.forEach((pair) => {
                    if (pair === [i, j + 1]){
                        found = true;
                    }
                });
                if (!found){
                    let newChain = chain;
                    newChain.push([i, j + 1]);
                    newIndicies.push(newChain);
                }
            }

            if ((j - 1 > 0) && puzzle[i][j - 1] === searchStr[current]){
                let found = false;
                chain.forEach((pair) => {
                   if (pair === [i, j - 1]){
                       found = true;
                   }
                });
                if (!found){
                    let newChain = chain;
                    newChain.push([i, j - 1]);
                    newIndicies.push(newChain);
                }
            }

        });

        indicies = newIndicies;

        if (indicies.length > 0){
            current++;
        }
    }

    if (current === len){
        return true;
    } else {
        return false;
    }

}


/**
 * Возвращает все перестановки заданной строки.
 * Принимаем, что все символы в заданной строке уникальные.
 * Порядок перестановок не имеет значения.
 *
 * @param {string} chars
 * @return {Iterable.<string>} все возможные строки, построенные из символов заданной строки
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    function permute(chars) {
        let permutations = [];
        if (chars.length === 1) {
            return chars;
        } else if (chars.length === 2) {
            return [chars, chars[1] + chars[0]];
        } else {
            (chars.split('')).forEach((character, index, array) => {
                let sub = [].concat(array);
                sub.splice(index, 1);
                permute(sub.join('')).forEach((permutation) => permutations.push(character + permutation));
            })
        }
        return permutations;
    }

    for (let permutation of permute(chars)){
        yield permutation;
    }

}


/**
 * Возвращает наибольшую прибыль от игры на котировках акций.
 * Цены на акции храняться в массиве в порядке увеличения даты.
 * Прибыль -- это разница между покупкой и продажей.
 * Каждый день вы можете либо купить одну акцию, либо продать любое количество акций, купленных до этого, либо ничего не делать.
 * Таким образом, максимальная прибыль -- это максимальная разница всех пар в последовательности цен на акции.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (купить по 1,2,3,4,5 и затем продать все по 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (ничего не покупать)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (купить по 1,6,5 и затем продать все по 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let profit = 0;
    let index = 0;
    let count = 0;
    while (quotes.length > 0){
        while (quotes[index] !== Math.max.apply(Math, quotes)){
            count += 1;
            profit -= quotes[index];
            index += 1;
        }
        if (quotes[index] === Math.max.apply(Math, quotes)){
            profit += (count * quotes[index]);
            quotes = quotes.slice(count + 1);
            count = 0;
            index = 0;
        }
    }

    return profit;
}


/**
 * Класс, предосатвляющий метод по сокращению url.
 * Реализуйте любой алгоритм, но не храните ссылки в хранилище пар ключ\значение.
 * Укороченные ссылки должны быть как минимум в 1.5 раза короче исходных.
 *
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {
    encode: function(url) {
        let s = url.split('')
            .reduce((pv, cv) => pv + (this.urlAllowedChars.indexOf(cv) < 10 ? '0' : '') + this.urlAllowedChars.indexOf(cv), '');
        let answer = '';
        if (s.length % 4 !== 0) s += '99';
        while (s.length > 0) {
            answer += String.fromCharCode(s.slice(0, 4));
            s = s.slice(4);
        }
        return answer;
    },

    decode: function(code) {
        let answer = '';
        return code.split('')
            .reduce((pv, cv) => pv += this.urlAllowedChars[Math.floor(cv.charCodeAt(0) / 100)] + (cv.charCodeAt(0) % 100 !== 99 ? this.urlAllowedChars[cv.charCodeAt(0) % 100] : ''), '');
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
