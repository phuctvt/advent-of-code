export function indexOf(
    value: string,
    searchTerms: string[]
): { index: number; searchTerm: string } {
    let searchTerm = '';
    let index = -1;

    for (const st of searchTerms) {
        const i = value.indexOf(st);
        if (i >= 0 && (index === -1 || i < index)) {
            index = i;
            searchTerm = st;
        }
    }

    return { index, searchTerm };
}

export function lastIndexOf(
    value: string,
    searchTerms: string[]
): { index: number; searchTerm: string } {
    let searchTerm = '';
    let index = -1;

    for (const st of searchTerms) {
        const i = value.lastIndexOf(st);
        if (i >= 0 && (index === -1 || i > index)) {
            index = i;
            searchTerm = st;
        }
    }

    return { index, searchTerm };
}
