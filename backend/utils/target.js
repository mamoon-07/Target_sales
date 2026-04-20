function generateSalesTarget(sale_max, sale_min, sale_cur, sale_his) {
    let w_cur, w_his, w_max;
    let scenario = "";

    // 1. New Product Case
    if (sale_his === 0) {
        w_cur = 0.70;
        w_his = 0.00;
        w_max = 0.30;
        scenario = "NEW PRODUCT: Focusing on recent launch momentum.";
    }

    // 2. Hyper-Growth Case
    else if (sale_cur > (sale_his * 1.5)) {
        w_cur = 0.60;
        w_his = 0.10;
        w_max = 0.30;
        scenario = "HYPER-GROWTH: Trusting current scale over old history.";
    }

    // 3. High Volatility Case
    else if ((sale_max - sale_min) > (sale_cur * 0.6)) {
        w_cur = 0.30;
        w_his = 0.50;
        w_max = 0.20;
        scenario = "HIGH VOLATILITY: Anchoring to history to stabilize target.";
    }

    // 4. Market Recovery Case
    else if (sale_cur < (sale_his * 0.8)) {
        w_cur = 0.80;
        w_his = 0.10;
        w_max = 0.10;
        scenario = "MARKET RECOVERY: Using conservative weights to keep goals reachable.";
    }

    // 5. Stable Case
    else {
        w_cur = 0.50;
        w_his = 0.30;
        w_max = 0.20;
        scenario = "STABLE PERFORMANCE: Balanced standard weights applied.";
    }

    // --- Calculation ---
    let target = (sale_cur * w_cur) + (sale_his * w_his) + (sale_max * w_max);

    // Safety Floor
    let success_floor = (sale_min + sale_cur) / 2;
    let adjustment_note = "";

    if (target < success_floor && sale_his > 0) {
        target = success_floor;
        adjustment_note = "Adjusted to Success Floor";
    } else {
        adjustment_note = "Direct Algorithm Result";
    }

    // --- Conversions ---
    let target_grams = target * 10;
    let target_pkr = target * 100;

    return {
        scenario,
        adjustment_note,
        weights: { w_cur, w_his, w_max },
        target_pieces: Math.round(target),
        target_grams: Math.round(target_grams),
        target_pkr: Math.round(target_pkr)
    };
}

module.exports = generateSalesTarget;
