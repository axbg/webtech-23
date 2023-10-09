const format = (s, ...format) => {
    let modified = s;

    for (let i = 0; i < format.length; i++) {
        if (modified.indexOf("{" + i + "}") !== -1) {
            modified = modified.replace("{" + i + "}", format[i]);
        }
    }

    return modified;
}

console.log(format("ce {0} si frumoasă este această {1}", "însorită", "zi"));