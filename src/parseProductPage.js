/* global $ */

function extractInfo($) {

    const description = String(
        $("div#featurebullets_feature_div")
            .text()
            .replace(/\r?\n|\r/g, "")
    )
        .trim()
        .replace(/\t/g, "");

    const title = String($("span#productTitle").text()).trim();

    const itemWeight = $("tr.size-weight:nth-of-type(1)")
        .text()

    const fd_1 = itemWeight.match(/\d/)
    const idx_1 = itemWeight.indexOf(fd_1)

    const itemDimensions = $("tr.size-weight:nth-of-type(2)")
        .text()
        .replace(/\w{3}/g, "");

    const fd_2 = itemDimensions.match(/\d/)
    const idx_2 = itemDimensions.indexOf(fd_2)

    const modelNumber = $("tr.item-model-number")
        .text()
        .replace(/[A-z]+/g, "");

    return {
        title,
        description,
        itemWeight: itemWeight.slice(idx_1),
        itemDimensions: itemDimensions.slice(idx_2),
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

    item.asin = request.userData.asin;
    item.detailUrl = request.userData.detailUrl;

    return item;
}

module.exports = parseProductPage;
