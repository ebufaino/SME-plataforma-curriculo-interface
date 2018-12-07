const BodyActions = {
  HIDE_LOADING: 'BodyActions.HIDE_LOADING',
  SHOW_LOADING: 'BodyActions.SHOW_LOADING',
  HIDE_MOBILE_MENU: 'BodyActions.HIDE_MOBILE_MENU',
  SHOW_MOBILE_MENU: 'BodyActions.SHOW_MOBILE_MENU',
  HIDE_ALERT: 'BodyActions.HIDE_ALERT',
  SHOW_ALERT: 'BodyActions.SHOW_ALERT',
  
  hideLoading() {
    return { type: BodyActions.HIDE_LOADING };
  },
  showLoading() {
    return { type: BodyActions.SHOW_LOADING };
  },
  hideMobileMenu() {
    return { type: BodyActions.HIDE_MOBILE_MENU };
  },
  showMobileMenu() {
    return { type: BodyActions.SHOW_MOBILE_MENU };
  },
  hideAlert() {
    return { type: BodyActions.HIDE_ALERT };
  },
  showAlert(message) {
    return { message, type: BodyActions.SHOW_ALERT };
  },
};

export default BodyActions;
