// The web version has no store and no purchases: everything is always unlocked. This keeps the same
// interface as the store apps' RevenueCat module, so the rest of the app runs unchanged.
export const isNative = false;
export const platform = 'web';
export const ready = Promise.resolve();
export const init = () => Promise.resolve();
export const setUILocale = () => {};
export const hasAllAccess = () => true;
export const currentPlan = () => null;
export const hasRedundantSubscription = () => false;
export const isTrickUnlocked = () => true;
export const onChange = () => () => {};
export const presentPaywall = async () => 'unavailable';
export const paywallProblem = async () => '';
export const presentCustomerCenter = async () => false;
export const restore = async () => true;
export const showCancelSheet = async () => false;
export const managementUrl = async () => null;
