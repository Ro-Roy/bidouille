function replace(str) {
    return str.replace(
        /\b(\d{2})\/(\d{2})\/(\d{4})\b/g,
        (_, mm, dd, yyyy) => `${yyyy}-${mm}-${dd}`,
    );
}

module.exports = { replace };
