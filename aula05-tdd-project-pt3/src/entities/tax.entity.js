class Tax {
    static get taxesBasedOnAge() {
        return [
            { from: 18, to: 25, tax: 1.1 },
            { from: 26, to: 30, tax: 1.5 },
            { from: 31, to: 100, tax: 1.3 },
        ];
    }
}

module.exports = Tax;