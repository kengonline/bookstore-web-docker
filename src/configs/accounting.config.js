import accounting from 'accounting';

accounting.settings = {
    currency: {
        symbol: "฿",   // default currency symbol is '$'
        format: "%s%v", // this controls string output: %s = symbol, %v = value/number
        decimal: ".",  // decimal point separator
        thousand: ",",  // thousands separator
        precision: 2   // decimal places
    },
    number: {
        precision: 2,  // default precision on numbers is 0
        thousand: ",",
        decimal: "."
    }
}

accounting.settings.currency.format = {
    pos: "%s%v",
    neg: "-%s%v",
    zero: "%s%v"
}