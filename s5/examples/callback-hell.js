function step1(init, callback) {
    const result = init + 1;
    callback(result);
}

function step2(init, callback) {
    const result = init + 2;
    callback(result);
}

function step3(init, callback) {
    const result = init + 3;
    callback(result);
}

function step4(init, callback) {
    const result = init + 4;
    callback(result);
}

function step5(init, callback) {
    const result = init + 5;
    callback(result);
}

function step6(init, callback) {
    const result = init + 6;
    callback(result);
}

function step7(init, callback) {
    const result = init + 7;
    callback(result);
}

function step8(init, callback) {
    const result = init + 8;
    callback(result);
}

function step9(init, callback) {
    const result = init + 9;
    callback(result);
}

function step10(init, callback) {
    const result = init + 10;
    callback(result);
}

function step11(init, callback) {
    const result = init + 11;
    callback(result);
}

function step12(init, callback) {
    const result = init + 12;
    callback(result);
}

function step13(init, callback) {
    const result = init + 13;
    callback(result);
}

function step14(init, callback) {
    const result = init + 14;
    callback(result);
}

function step15(init, callback) {
    const result = init + 15;
    callback(result);
}

function step16(init, callback) {
    const result = init + 16;
    callback(result);
}

function step17(init, callback) {
    const result = init + 17;
    callback(result);
}

function step18(init, callback) {
    const result = init + 18;
    callback(result);
}

function step19(init, callback) {
    const result = init + 19;
    callback(result);
}

function step20(init, callback) {
    const result = init + 20;
    callback(result);
}

function performOperations() {
    step1(0, (result1) => {
        step2(result1, (result2) => {
            step3(result2, (result3) => {
                step4(result3, (result4) => {
                    step5(result4, (result5) => {
                        step6(result5, (result6) => {
                            step7(result6, (result7) => {
                                step8(result7, (result8) => {
                                    step9(result8, (result9) => {
                                        step10(result9, (result10) => {
                                            step11(result10, (result11) => {
                                                step12(result11, (result12) => {
                                                    step13(result12, (result13) => {
                                                        step14(result13, (result14) => {
                                                            step15(result14, (result15) => {
                                                                step16(result15, (result16) => {
                                                                    step17(result16, (result17) => {
                                                                        step18(result17, (result18) => {
                                                                            step19(result18, (result19) => {
                                                                                step20(result19, (result20) => {
                                                                                    console.log(`Final result: ${result20}`);
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

performOperations();
