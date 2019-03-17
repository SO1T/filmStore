module.exports = parse = (str) => {
    return str.trim()
        .split(/\n\n/)
        .map(s => s.split(/\n/))
        .map(k => k.reduce((res, cur) => {
            const match = cur.match(/(.+) *\: *(.+)/);
            // const val = match[2].split(/, ?/)
            return { ...res, [match[1]]: match[2] }
        }, {})).map(film => {
            let year = film['Release Year'];
            delete film['Release Year'];
            film.Release = year;
            return film;
        });
};