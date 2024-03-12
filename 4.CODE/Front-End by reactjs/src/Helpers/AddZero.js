export const addZero = (n, len = 2) => {
    const diff_len = len - String(n).length;
    return diff_len > 0 ? `${"0".repeat(diff_len)}${n}` : String(n);
};