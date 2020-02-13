/* global $ */

function extractInfo($) {
    const description = String(
        $("div#productDescription")
            .text()
            .replace(/\r?\n|\r/g, "")
    )
        .trim()
        .replace(/\t/g, "");
    const title = String($("span#productTitle").text()).trim();

    const price = String(
        $("span.a-color-price")
            .first()
            .text()
            .replace(/\r?\n|\r/g, "")
    ).trim();

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
        title,
        price,
        description,
        itemWeight,
        itemDimensions,
        modelNumber
    };
}

async function parseProductPage($, request) {

    const item = await extractInfo($);

    const keywords = request.userData.keyword.split(' ');
    const title = item.title.toLowerCase();

    let found = true;
    for (const k of keywords) {
      found = title.search(k.toLowerCase());
      if (found === -1) {
        return null;
      }
    }

    return item;
}

module.exports = parseProductPage;
