function format(strg, ...args) {
    return strg
        .split(" ")
        .map(token => {
            if (token.startsWith("{") && token.endsWith("}")) {
                const idx = token.slice(token.indexOf("{") + 1, token.indexOf("}"));
                return args[idx] || token;
            }

            return token;
        })
        .join(" ");
}

console.log(format("ce {0} si frumoasă este această {1}", "însorită", "zi"));