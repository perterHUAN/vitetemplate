function mapConditionName(condition, conditionsMap) {
    const newCondition = {};
    for (const e in condition) {
        if (e in conditionsMap) {
            newCondition[conditionsMap[e]] = condition[e];
        } else {
            newCondition[e] = condition[e];
        }
    }
    return newCondition;
}

export default mapConditionName;