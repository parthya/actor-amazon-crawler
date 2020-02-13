/* global $ */

function extractInfo($) {
    const description = String(
        $("div#productDescription")
            .text()
            .replace(/\r?\n|\r/g, "")
    )
        .trim()
        .replace(/\t/g, "");

    const itemWeight = $("tr.size-weight")
        .first()
        .text()
        .replace(/\w{3}/g, "");
    const itemDimensions = $("tr.size-weight:nth-of-type(2)")
        .text()
        .replace(/\w{3}/g, "");

    const modelNumber = $("tr.item-model-number")
        .text()
        .replace(/[A-z]+/g, "");

    return {
        description,
        itemWeight,
        itemDimensions,
        modelNumber
    };
}

async function parseProductPage($, request) {

    const item = await extractInfo($);
    return item;
}

module.exports = parseProductPage;
